import { Router } from "express";

import clssService from "../services/clssService.js";

import { createErrorMsg } from "../utils/errorUtil.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", async (req, res) => {
    const query = req.query;

    try {
        const classes = await clssService.getAll(query);

        res.status(200).json(classes).end();
    } catch (error) {
        res.status(500)
            .json({ message: createErrorMsg(error) })
            .end();
    }
});

export default router;
