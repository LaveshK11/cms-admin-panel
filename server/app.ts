import express, { Application } from 'express';
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

app.use('/', routes);



app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
