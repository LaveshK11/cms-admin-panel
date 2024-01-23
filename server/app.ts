import express, { Application } from 'express';
import dotenv from 'dotenv';
import routes from './src/routes/api';
import cors from 'cors'
import bodyParser from 'body-parser';
import multer from 'multer';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8080;
const upload = multer();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));
app.use(upload.none())
app.use('/', routes);



app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
