import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'
import { useContext, useEffect, useRef } from 'react'
import { ChatContext } from './ChatContext'

interface ChatInputProps {
  isDisabled?: boolean
}

export default function ChatInput({ isDisabled }: ChatInputProps) {
  const { addMessage, handleInputChange, isLoading, message } =
    useContext(ChatContext)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const MAX_LINES = 10
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10)
      const maxHeight = lineHeight * MAX_LINES
      textarea.style.height = 'auto'
      const newHeight = Math.min(textarea.scrollHeight, maxHeight)
      textarea.style.height = `${newHeight}px`
    }
  }, [message])

  return (
    <div className="fixed bottom-0 left-0 w-full">
      <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex flex-col w-full flex-grow p-4">
            <div className="relative flex items-center">
              <Textarea
                rows={1}
                autoFocus
                ref={textareaRef}
                maxLength={2000}
                onChange={handleInputChange}
                value={message}
                onInput={() => {
                  const textarea = textareaRef.current
                  if (textarea) {
                    const lineHeight = parseInt(
                      getComputedStyle(textarea).lineHeight,
                      10
                    )
                    const maxHeight = lineHeight * MAX_LINES
                    textarea.style.height = 'auto'
                    const newHeight = Math.min(textarea.scrollHeight, maxHeight)
                    textarea.style.height = `${newHeight}px`
                  }
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    addMessage()
                    textareaRef.current?.focus()
                  }
                }}
                placeholder="Escribí tu pregunta..."
                className="resize-none p-3 text-base scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                style={{
                  paddingRight: '60px',
                  paddingTop: '16px',
                  overflowY: 'auto',
                }}
              />

              <Button
                disabled={isLoading || isDisabled}
                className="absolute bottom-1.8 right-[8px]"
                aria-label="send message"
                onClick={() => {
                  addMessage()
                  textareaRef.current?.focus()
                }}
                type="submit"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
