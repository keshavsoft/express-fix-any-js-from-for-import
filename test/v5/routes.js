import express from 'express';

import { router as routerFromv4 } from './v4/routes.js';
import { router as routerFromv3 } from './v3/routes.js';
import { router as routerFromv1 } from "./v1/routes.js";
import { router as routerFromv2 } from "./v2/routes.js";

const router = express.Router();

router.use('/v5', routerFromv5);
router.use('/v4', routerFromv4);
router.use('/v1', routerFromv1);
router.use('/v2', routerFromv2);
router.use('/v1', routerFromv1);
router.use('/v3', routerFromv3);
router.use('/v5', routerFromv5);
router.use('/v5', routerFromv5);
import { router as routerFromv5 } from './v5/routes.js';








export { router };