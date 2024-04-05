import { User } from "@/models/user";
import UserAvatar from "../userAvatar";

type Props = {
	readonly user: Partial<User>;
};

export default function RoomHeader({ user }: Props) {
	return (
		<div className='flex items-center w-full h-[99px] gap-4 px-4 border-b shrink-0'>
			<UserAvatar className='w-16 h-16' name={user.name} />

			<div className='flex flex-col gap-0.5'>
				<div className='text-2xl font-bold leading-5'>{user?.name}</div>
			</div>
		</div>
	);
}
