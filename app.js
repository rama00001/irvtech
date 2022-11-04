import express from 'express';
const app = express()
const port = 3000
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cors from 'cors';


dotenv.config()
import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/irtech").then(() => {
  console.log('Connected to the database ')
})
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors())
app.use(express.json());

const allowedOrigins = ['http://localhost:3000'];

const corsOptions = {
  origin: allowedOrigins
};

app.use(cors(corsOptions))

app.get('/', (req, res) => {
  res.status(200).send('Hello from the other side!')
})

app.get('/test', (req, res) => {
  console.log('api hit')
  res.status(200).send('Hello from the other side!')
})

import user from './routes/user.js';
app.use(user);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})