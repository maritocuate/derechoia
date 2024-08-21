'use client'
import { ChatContextProvider } from './ChatContext'
import ChatInput from './ChatInput'

const ChatWrapper = () => {
  return (
    <ChatContextProvider fileId={'1'}>
      <ChatInput />
    </ChatContextProvider>
  )
}

export default ChatWrapper
