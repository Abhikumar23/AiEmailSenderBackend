const express = require('express');
const app =express();
const cors = require('cors');

const Routes = require('./routes/emailRoutes');

require('dotenv').config();

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

const PORT = 5000;

app.use("/api/email", Routes);

app.listen(PORT, ()=>{
    console.log(`app is running on ${PORT}`)
});