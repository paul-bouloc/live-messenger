import { Message } from '@/models/message'
import { useEffect, useRef } from 'react'

type Props = {
  readonly messages: Message[]
}

export default function MessageList({messages}: Props) {

  const messageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messageRef.current?.lastElementChild?.scrollIntoView()
  },[messages])

  return (
    <div className='flex flex-col w-full h-full overflow-y-auto bg-slate-100 scroll-smooth will-change-scroll' ref={messageRef}>
      { messages.map((message: Message) => (
        <div key={message.id} className='flex flex-col gap-2 p-4'>
          <div className='flex items-center gap-2'>
            <div className='text-xs font-semibold text-slate-400'>{message.user.name}</div>
            <div className='text-xs font-semibold text-slate-400'>{new Date(message.createdAt).toLocaleString()}</div>
          </div>
          <div className='p-2 bg-white rounded-xl shadow-gray-300'>
            {message.content}
          </div>
        </div>
      ))}
    </div>
  )
}