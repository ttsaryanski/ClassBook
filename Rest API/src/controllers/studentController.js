import { Router } from "express";

import studentService from "../services/studentService.js";

import { createErrorMsg } from "../utils/errorUtil.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", async (req, res) => {
    const query = req.query;

    try {
        const students = await studentService.getAll(query);

        res.status(200).json(students).end();
    } catch (error) {
        res.status(500)
            .json({ message: createErrorMsg(error) })
            .end();
    }
});

export default router;
