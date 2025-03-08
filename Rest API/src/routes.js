import { Router } from "express";

import directorController from "./controllers/directorController.js";
import authController from "./controllers/authController.js";
import itemControler from "./controllers/itemController.js";

const routes = Router();

routes.use("/director", directorController);
routes.use("/auth", authController);
routes.use("/item", itemControler);

export default routes;
