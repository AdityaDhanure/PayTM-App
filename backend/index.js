const express = require('express');
const cors = require('cors');  // to connect both frontend & backend
const bodyParser = require("body-parser");

const app = express();

app.use(cors({
    origin: 'https://pay-tm-app.vercel.app',  // frontend url
    credentials: true  // to allow cookies to be sent from frontend to backend
}));
app.use(bodyParser.json());  // body-parser

const mainRouter = require('./routes/index.js');

app.use('/api/v1', mainRouter);





app.listen(4000, (err) => {
    if (err) console.log(err);
    console.log('Server started.... on port 4000');
})