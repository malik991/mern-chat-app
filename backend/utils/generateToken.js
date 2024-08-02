import jwt from "jsonwebtoken";

function generateTokenAndSetToCookie(userId, res) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent cros-site scripting attach
    sameSite: "strict", // prevent from cross-site forgery attack
    secure: process.env.NODE_ENV !== "development",
  });
}

export default generateTokenAndSetToCookie;
