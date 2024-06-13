const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser')
const routes = require('./routes/index');
const globalError = require('./controllers/errorController');

const app = express();
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use(expressLayout);
app.set('layout', 'index');


app.use('/api/v1/docs', routes.docsRoutes);
app.use('/api/v1/users', routes.userRoutes);
app.use('/', routes.viewRoutes);

// 404 not found
app.use('*', (req, res) => {
    return res.render('pages/notFound404');
})

app.use(globalError);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});