import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const isAuthenticated = async (req, res, next) => {

  try {
     const token = req.cookies.token;
     console.log("Cookies received:", req.cookies); // added later for info.
  if (!token) {
      return res.status(401).json({ 
          message: " User not authenticated.",
          success: false
     });
   }
    const decode = await  jwt.verify(token, process.env.SECRET_KEY); 
    if(!decode){
      return res.status(401).json({
        message: "Invalid token.",
        success: false
      });
    }
     req.id = decode.userId;
     //req.id = decode.id;

     next();
  } catch (error) {
    console.log(error);
  }
};

export default isAuthenticated;
