import { Message } from "./message";
import { User } from "./user";

export type Room = {
	id: string;
	createdAt: Date;
	usersIds: string[];
	users: User[];
	messages: Message[];
};
