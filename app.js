const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// set headers to allow CORS request
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// connect to mongoose
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(process.env.DATABASE_URL, options);
mongo.then(() => {
    console.log('connected to mongoose');
}, error => {
    console.log(error, 'error');
});

app.get('/', (req, res) => res.send('Welcome to Traxie Core'));

// TODO: Validate JWT - Auth

app.listen(process.env.PORT);
console.log(`Listening on port: ${process.env.PORT}, wait for the development server to be up...`);

// set routes
const routes = require('./controllers/routes');
app.use('/api', routes);
