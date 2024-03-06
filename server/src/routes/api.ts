import express, { Request, Response, NextFunction } from 'express';
import index from "./api/index"
const router = express.Router();

// router.use(validate)

router.use('/api/v1', index)

router.use('/api/v1/test', (req: Request, res: Response) => {
  res.send("wokring")
})




export default router;