import { User } from "../models/User.js";
import { JwtToken } from "../utils/Jwt.js";

export const auth = async (req, res, next) => {
  try {
    const { fiverrChakrauiBlogCookie } = req.cookies;
    const verifyToken = await JwtToken.verify(fiverrChakrauiBlogCookie);
    const { id } = verifyToken;
    if (!id) {
      return res.status(404).json({
        success: false,
        message: "Invalid Token",
      });
    }
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
