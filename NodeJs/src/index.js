const express = require('express');
const cors = require('cors');
const route = require('./route/index');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const app = express();

app.use(
  cors({
    origin: 'https://zing-mp3-clone-smoky.vercel.app',
    withCredentials: true,
  }),
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
const database = require('./database/index');
database.connect();

route(app);

app.post('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to ZingMp3 API',
  });
});

app.listen(3000, () => {
  console.log(`Example app listening on port 3000! by USER : ${process.env.USERNAME}`);
});
