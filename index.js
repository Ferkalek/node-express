const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();

// get data after send form (add product)
app.use(express.urlencoded({
    extended: true
}));

// import routes
const homeRoute = require('./routs/home');
const productsRoute = require('./routs/products');
const addRoute = require('./routs/add');
const cardRoute = require('./routs/card');

// START настройка handlebars
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
// END настройка handlebars

// doing folder public like static 
app.use(express.static(path.join(__dirname, 'public')));

// use rout
app.use('/', homeRoute);
app.use('/products', productsRoute);
app.use('/add-product', addRoute);
app.use('/card', cardRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server was run on port ${PORT}`);
});