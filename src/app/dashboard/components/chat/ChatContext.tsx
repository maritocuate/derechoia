import { ReactNode, createContext, useRef, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useMutation } from '@tanstack/react-query'
import { trpc } from '@/app/_trpc/client'
import { INFINITE_QUERY_LIMIT } from '@/config/infinite-query'

interface ChatContextProps {
  addMessage: () => void
  message: string
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  isLoading: boolean
}

export const ChatContext = createContext<ChatContextProps>({
  addMessage: () => {},
  message: '',
  handleInputChange: () => {},
  isLoading: false,
})

interface Props {
  userId: string
  children: ReactNode
}

export const ChatContextProvider = ({ userId, children }: Props) => {
  const [message, setMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const utils = trpc.useContext()
  const backupMessage = useRef('')

  const { mutate: sendMessage } = useMutation({
    // 1. Send message
    mutationFn: async ({ message }: { message: string }) => {
      const url = '/api/message'
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          userId,
          message,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      return response.body
    },

    // 2. Clean UI before sending new message
    onMutate: async ({ message }) => {
      backupMessage.current = message
      setMessage('')

      // step 1
      await utils.getUserMessages.cancel()
      // step 2
      const previousMessages = utils.getUserMessages.getInfiniteData()
      // step 3
      utils.getUserMessages.setInfiniteData(
        { userId, limit: INFINITE_QUERY_LIMIT },
        old => {
          if (!old) {
            return {
              pages: [],
              pageParams: [],
            }
          }

          let newPages = [...old.pages]

          let latestPage = newPages[0]!

          latestPage.messages = [
            {
              createdAt: new Date().toISOString(),
              id: crypto.randomUUID(),
              text: message,
              isUserMessage: true,
            },
            ...latestPage.messages,
          ]

          newPages[0] = latestPage

          return {
            ...old,
            pages: newPages,
          }
        }
      )

      setIsLoading(true)

      return {
        previousMessages:
          previousMessages?.pages.flatMap(page => page.messages) ?? [],
      }
    },

    // 3. Handle response
    onSuccess: async stream => {
      setIsLoading(false)

      if (!stream) {
        return toast({
          title: 'There was a problem sending this message',
          description: 'Please refresh this page and try again',
          variant: 'destructive',
        })
      }

      const reader = stream.getReader()
      const decoder = new TextDecoder()
      let done = false

      // accumulated response
      let accResponse = ''

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunkValue = decoder.decode(value)

        accResponse += chunkValue

        // append chunk to the actual message
        utils.getUserMessages.setInfiniteData(
          { userId, limit: INFINITE_QUERY_LIMIT },
          old => {
            if (!old) return { pages: [], pageParams: [] }

            let isAiResponseCreated = old.pages.some(page =>
              page.messages.some(message => message.id === 'ai-response')
            )

            let updatedPages = old.pages.map(page => {
              if (page === old.pages[0]) {
                let updatedMessages

                if (!isAiResponseCreated) {
                  updatedMessages = [
                    {
                      createdAt: new Date().toISOString(),
                      id: 'ai-response',
                      text: accResponse,
                      isUserMessage: false,
                    },
                    ...page.messages,
                  ]
                } else {
                  updatedMessages = page.messages.map(message => {
                    if (message.id === 'ai-response') {
                      return {
                        ...message,
                        text: accResponse,
                      }
                    }
                    return message
                  })
                }

                return {
                  ...page,
                  messages: updatedMessages,
                }
              }

              return page
            })

            return { ...old, pages: updatedPages }
          }
        )
      }
    },

    // 4. Handle errors
    onError: (_, __, context) => {
      setMessage(backupMessage.current)
      utils.getUserMessages.setData(
        { userId },
        { messages: context?.previousMessages ?? [] }
      )
    },
    // 5. Always refetch after error or success
    onSettled: async () => {
      setIsLoading(false)

      await utils.getUserMessages.invalidate({ userId })
    },
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value)
  }

  const addMessage = () => message && sendMessage({ message })

  return (
    <ChatContext.Provider
      value={{
        addMessage,
        message,
        handleInputChange,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
