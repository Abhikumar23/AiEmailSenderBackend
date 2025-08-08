const express = require('express');
const app =express();
const cors = require('cors');

const Routes = require('./routes/emailRoutes');

require('dotenv').config();

const corsOptions = {
  origin: 'https://ai-email-sender.vercel.app',
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

const PORT = 5000;

app.use("/api/email", Routes);

app.listen(PORT, ()=>{
    console.log(`app is running on ${PORT}`)
});