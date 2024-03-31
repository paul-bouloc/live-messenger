import AuthService from "@/services/authService"
import UserService from "@/services/userService"

const extractUserFromJwt = async (req, res, next) => {
  try {

    const token = req.signedCookies.jwt
    if(token){
      const userId = AuthService.verifyJwtToken(token)
      console.log(userId)
      if(userId){
        const {password, ...user} = await UserService.getUserById(userId)
        if(user){
          req.user = user
        }
      }
    }
    return next()
    
  } catch (error) {
    throw new Error(error)
  }
}

export default extractUserFromJwt;