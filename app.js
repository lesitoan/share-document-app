const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const docsRouter = require('./routes/docsRoute');

const app = express();
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use('/', docsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});