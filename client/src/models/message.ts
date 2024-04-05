import { Room } from "./room";
import { User } from "./user";

export type Message = {
	id: string;
	createdAt: Date;
	content: string;
	userId: string;
	user: User;
	roomId: string;
	room?: Room;
};
