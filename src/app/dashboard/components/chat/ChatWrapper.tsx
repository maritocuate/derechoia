'use client'
import { ChatContextProvider } from './ChatContext'
import ChatInput from './ChatInput'
import Messages from './Messages'

const ChatWrapper = () => {
  return (
    <ChatContextProvider fileId={'1'}>
      <Messages fileId={'1'} />
      <ChatInput />
    </ChatContextProvider>
  )
}

export default ChatWrapper
