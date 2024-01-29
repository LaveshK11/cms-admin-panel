import express, { Application, Response } from 'express';
import dotenv from 'dotenv';
import routes from './src/routes/api';
import cors from 'cors'
import bodyParser from 'body-parser';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));
app.use((req, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/', routes);



app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
