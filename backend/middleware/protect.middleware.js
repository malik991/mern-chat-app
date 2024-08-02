import jwt from "jsonwebtoken";

import { userModel } from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: no token provided" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ error: "unauthorized - invalid token" });
    }
    const user = await userModel
      .findById(decodedToken.userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    req.user = user;

    next();
  } catch (error) {
    console.log("error in protect middleware: ", error);
    return res.status(500).json({ error: "internal server error" });
  }
};
export default protectRoute;
