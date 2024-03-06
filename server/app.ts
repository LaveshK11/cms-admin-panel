import express, { Application } from 'express';
import dotenv from 'dotenv';
import routes from './src/routes/api';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser"
import morgan from 'morgan';
import { redisConnect } from './src/db/redis/redisConnect';
import { validate } from './src/middleware/validateToken';
import { errorHandler } from "./src/middleware/errorHandle"
import {validatePermission} from "./src/middleware/validatePermission"
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cookieParser())
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Origin', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version', 'X-Response-Time', 'X-PINGOTHER', 'X-CSRF-Token', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
};

redisConnect()

app.use(morgan('tiny'));
app.use(cors(corsOptions));
app.use(validate)
app.use(validatePermission)
app.use('/', routes);
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
