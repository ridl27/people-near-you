const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('xxxxx', { useNewUrlParser: true }); 
mongoose.Promise = global.Promise;

app.use(express.static('./public')); 

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next){ 
    console.log(err); 
    res.status(422).send({error: err.message}); 
});

// listen for requests
app.listen(process.env.PORT || 4000, function(){
    console.log('now listening for requests');
});