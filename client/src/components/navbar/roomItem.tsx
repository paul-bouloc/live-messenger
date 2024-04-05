import { useAuth } from '@/hooks/useAuth';
import { Room } from '@/models/room'
import UserAvatar from '../userAvatar';
import { Link } from 'react-router-dom';

type Props = {
  readonly room: Room
}

export default function RoomItem({room}: Props) {

  const {user:currentUser} = useAuth();
  const otherUser = room.users.find(user => user.id !== currentUser?.id);

  return (
    <Link to={`room/${room.id}`} className='flex items-center gap-2 p-2 transition-all cursor-pointer hover:bg-slate-100 rounded-xl'>
      <UserAvatar name={otherUser?.name}/>
      <div className='flex flex-col overflow-hidden gap-0.5'>
        <h2 className='text-lg leading-[18px] truncate'>
          {otherUser?.name ?? 'Inconnu'}
        </h2>
        <span className='text-sm leading-4 truncate text-slate-400'>
          {
            room.messages.length ?
            room.messages[room.messages.length - 1].content
            : 'Aucun message'
          }
        </span>
      </div>
    </Link>
  )
}