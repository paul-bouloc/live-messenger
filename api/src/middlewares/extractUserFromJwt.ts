import AuthService from "@/services/authService"
import UserService from "@/services/userService"

const extractUserFromJwt = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return next();
    }

    const userId = AuthService.verifyJwtToken(token);

    if (!userId) {
      return next();
    }

    const { password, ...user } = await UserService.getUserById(userId);

    if (!user) {
      return next();
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .clearCookie("jwt")
      .status(401)
      .json({
        name: error.name,
        message: error.message,
        code: 401,
      });
  }
}

export default extractUserFromJwt;