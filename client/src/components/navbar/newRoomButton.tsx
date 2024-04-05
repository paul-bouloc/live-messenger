import { Loader2, MessageSquarePlus } from "lucide-react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { socket } from "@/socket";
import { useState } from "react";
import { SocketResponse } from "@/models/socketResponse";
import { toast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

const newRoomFormSchema = z
	.object({
		email: z.string().email("Veuillez saisir un email valide"),
	})
	.required();

export default function NewRoomButton() {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
	const navigate = useNavigate();

	const newRoomForm = useForm<z.infer<typeof newRoomFormSchema>>({
		resolver: zodResolver(newRoomFormSchema),
		defaultValues: {
			email: "",
		},
	});
  const [isFormPending, setIsFormPending] = useState(false);

	function onSubmit(values: z.infer<typeof newRoomFormSchema>) {
    setIsFormPending(true);
		socket.emit("room:new", values.email, (res:SocketResponse) => {
			setIsFormPending(false);
			handleDialogOpening(false);
			toast({
				title: res.success ? "✅ Succès" : "⛔ Erreur",
				description: res.message,
			})
			if(res.data?.id) navigate(`/room/${res.data.id}`)
		})
    
	}

  function handleDialogOpening(open: boolean) {
    setIsDialogOpen(open);
    newRoomForm.reset();
  }

	return (
		<Dialog onOpenChange={handleDialogOpening} open={isDialogOpen}>
			<DialogTrigger className='w-full' asChild>
				<Button className='w-full gap-2'>
					Nouveau
					<MessageSquarePlus size={20} />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Démarer une nouvelle conversation</DialogTitle>
					<DialogDescription>
						Veuillez saisir l'email de la personne avec qui vous souhaitez
						discuter
					</DialogDescription>
				</DialogHeader>
					<Form {...newRoomForm}>
						<form
							onSubmit={newRoomForm.handleSubmit(onSubmit)}>
							<FormField
								control={newRoomForm.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder='jeandupont@mail.com'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex justify-end w-full mt-8">
                <Button type='submit' disabled={isFormPending}>
                  {isFormPending && <Loader2 className="mr-2 animate-spin"/>}
                  Démarer une conversation
                </Button>
              </div>
						</form>
					</Form>
			</DialogContent>
		</Dialog>
	);
}
