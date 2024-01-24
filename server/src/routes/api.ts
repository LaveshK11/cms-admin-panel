import express, { Request, Response, NextFunction } from 'express';
import index from "./api/index"
import { validate } from '../middleware/validToken';
const router = express.Router();

// router.use(validate)

router.use('/api/v1', index)

router.use('/api/v1/test', (req: Request, res: Response) => {
  res.send("wokring")
})


router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500);
  res.json(err);
});


export default router;