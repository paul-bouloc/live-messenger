import roomService from "@/services/roomService";

export const getUserRooms = async (req, res) => {
  const rooms = await roomService.getUserRoomsById(req.user.id);
  return res.status(200).json({message:"Conversations récupérées",rooms});
}