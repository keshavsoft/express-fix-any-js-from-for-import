import express from 'express';

import { router as routerFromv4 } from './v4/routes.js';
import { router as routerFromv3 } from './v3/routes.js';
import { router as routerFromv1 } from "./v1/routes.js";
import { router as routerFromv2 } from "./v2/routes.js";

const router = express.Router()

router.use("/v1", routerFromv1);;

export { router };