import express from "express";
import {
  getUser,
  getLibrary,
  getFavourite,
  addRemoveItem,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* Read */
router.get("/:id", verifyToken, getUser); //use the id to query the user information
router.get("/:id/library", verifyToken, getLibrary);
router.get("/:id/favourite/:paperId", verifyToken, getFavourite);

/* Update */
router.patch("/:id/library/:paperId", verifyToken, addRemoveItem);

export default router;
