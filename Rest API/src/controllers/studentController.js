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

router.get("/:studentId", async (req, res) => {
    const studentId = req.params.studentId;

    try {
        const student = await studentService.getById(studentId);

        if (student !== null) {
            res.status(200).json(student).end();
        } else {
            res.status(404)
                .json({ message: "There is no item with this id." })
                .end();
        }
    } catch (error) {
        res.status(500).json({ message: createErrorMsg(error) });
    }
});

export default router;
