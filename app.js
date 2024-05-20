const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const expressLayout = require('express-ejs-layouts');
const routes = require('./routes/mainRoute');

const app = express();
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(expressLayout);
app.set('layout', 'index');


app.use('/documents', routes.docsRoute);
app.use('/user', routes.userRoute);
app.use('/', routes.homeRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});