import { Router } from "express";
import {
  loginUser,
  LogoutUser,
  registerUser,
} from "../controller/userControl.js";
import { verifyToken } from "../auth/authControl.js";
import {
  deleteProject,
  getProject,
  postProject,
} from "../controller/projectController.js";

const router = Router();

router.get("/project/get", verifyToken, getProject);
router.get("/checkauth", verifyToken, (req, res) => {
  res
    .status(200)
    .json({ authenticated: true, message: "User is authenticated" });
});
router.get("/logout", LogoutUser);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/project/post", verifyToken, postProject);
router.delete("/project/delete", verifyToken, deleteProject);

export default router;
