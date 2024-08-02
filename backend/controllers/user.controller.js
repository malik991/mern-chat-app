import { userModel } from "../models/user.model.js";

export const getUserForSideBar = async (req, res) => {
  try {
    const loggedInuserId = req.user._id;
    const filterUsers = await userModel
      .find({ _id: { $ne: loggedInuserId } })
      .select("-password"); // except logged in user
    return res.status(201).json(filterUsers);
  } catch (error) {
    console.log("error in get user for side bar endpoint: ", error);
    return res.status(500).json({ error: "internal server error" });
  }
};
