import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetToCookie from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "password should match with confirm password!" });
    }
    const userExist = await userModel.findOne({
      username: username.toLowerCase(),
    });
    if (userExist) {
      return res.status(401).json({ error: "user already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarBoy = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const avatarGirl = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const newUser = new userModel({
      fullName,
      username,
      password: hashPassword,
      gender,
      profilePic: gender === "male" ? avatarBoy : avatarGirl,
    });
    if (newUser) {
      // generate token
      generateTokenAndSetToCookie(newUser._id, res);
      await newUser.save();
      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(401).json({ error: "invalid user data" });
    }
  } catch (error) {
    console.log("error in signup endpoint: ", error);
    return res.status(500).json({ error: "internal server error" });
  }
}
export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const userExist = await userModel.findOne({ username });
    if (!userExist) {
      return res.status(401).json({ error: "invalid user name" });
    }
    const decodedPassword = await bcrypt.compare(
      password,
      userExist?.password || ""
    );
    if (!decodedPassword) {
      return res.status(401).json({ error: "invalid password" });
    }
    generateTokenAndSetToCookie(userExist._id, res);
    return res.status(201).json({
      _id: userExist._id,
      fullName: userExist.fullName,
      username: userExist.username,
      profilePic: userExist.profilePic,
    });
  } catch (error) {
    console.log("error in login endpoint: ", error);
    return res.status(500).json({ error: "internal server error" });
  }
}
export function logout(_, res) {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    return res.status(201).json({ message: "logout successfully" });
  } catch (error) {
    console.log("error in logout endpoint: ", error);
    return res.status(500).json({ error: "internal server error" });
  }
}
