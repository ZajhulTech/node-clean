// src/routes/demoRoutes.ts
import { Router } from 'express';
import { demoController } from '../controllers/demoController';

const router = Router();

const path = '/items';

router.get(path, (req, res) => demoController.getItems(req, res));
router.post(path, (req, res) => demoController.createItem(req, res));

export default router;
