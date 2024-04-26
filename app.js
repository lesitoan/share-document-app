const express = require('express');
require('dotenv').config();
const docsRouter = require('./routes/docsRoute');

const app = express();

app.use('/', docsRouter);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})