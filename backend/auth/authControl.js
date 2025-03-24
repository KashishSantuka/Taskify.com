import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret_key = process.env.SECRET_KEY;

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
  console.log(token)
    if (!token) {
      console.log("No token found in cookies");
      // localStorage.removeItem("userId")
      return res.status(401).json({
        success: false,
        message: "Access denied, no token provided",
        // error: error.message,
      });
    }

    const decoded = jwt.verify(token, secret_key);
    console.log("TokenVerfify Decoded", decoded)
    req.userId = decoded.id;
    // localStorage.setItem("userId", req.userId )
    console.log("Token requested", req.userId);
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Invalid Token",
      error: error.message,
    });
  }
};
