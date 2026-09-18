import express from "express";

import {
    createNews,
    getAllNews,
    getSingleNews,
    updateNews,
    deleteNews
} from "../controllers/newsController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router= express.Router();

router.get("/",getAllNews);
router.get("/:id",getSingleNews);

router.post("/",authMiddleware,createNews);
router.post("/:id",authMiddleware,updateNews);
router.delete("/:id",authMiddleware,deleteNews);

export default router;