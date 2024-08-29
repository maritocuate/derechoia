'use client'
import { ChatContextProvider } from './ChatContext'
import ChatInput from './ChatInput'
import Messages from './Messages'

interface ChatWrapperProps {
  userId: string
}

const ChatWrapper = ({ userId }: ChatWrapperProps) => {
  return (
    <ChatContextProvider userId={userId}>
      <Messages userId={userId} />
      <ChatInput />
    </ChatContextProvider>
  )
}

export default ChatWrapper
