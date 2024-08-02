import express from "express";
import protectRoute from "../middleware/protect.middleware.js";
import { getUserForSideBar } from "../controllers/user.controller.js";

const route = express.Router();

route.get("/", protectRoute, getUserForSideBar);

export default route;
