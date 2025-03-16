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

router.post("/", authMiddleware, async (req, res) => {
    //router.post("/", async (req, res) => {
    const userId = await req.cookies?.auth?.user?._id;
    const data = req.body;

    try {
        const item = await clssService.create(data, userId);
        //const item = await itemService.create(data);

        res.status(201).json(item).end();
    } catch (error) {
        if (error.message.includes("validation")) {
            res.status(400)
                .json({ message: createErrorMsg(error) })
                .end();
        } else if (error.message === "Missing or invalid data!") {
            res.status(400)
                .json({ message: createErrorMsg(error) })
                .end();
        } else {
            res.status(500)
                .json({ message: createErrorMsg(error) })
                .end();
        }
    }
});

export default router;
