import express, { Request, Response } from 'express';
import { VerifyAccessToken } from '../../../../controller/tokenCotroller/verifyTokenController';

const router = express.Router();

router.post('/verify-accessToken', VerifyAccessToken)


export default router;