import roomService from "@/services/roomService";

export const getUserRooms = async (req, res) => {
  const rooms = await roomService.getUserRoomsById(req.user.id);
  return res.status(200).json({message:"Conversations récupérées",rooms});
}

export const getRoom = async (req, res) => {
  const room = await roomService.getRoomById(req.params.roomId);
  return res.status(200).json({message:"Conversation récupérée",room});
}