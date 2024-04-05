import MessageService from "@/services/messageService";


export const getRoomMessages = async (req, res) => {
  const messages = await MessageService.getRoomMessages(req.params.roomId);
  return res.status(200).json({message:"Conversations récupérées",messages});
}