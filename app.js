const express = require('express');
const bodyParser = require('body-parser');
const todo = require('./routes/todo.route'); // Imports routes for the products
const port = 3000;
const app = express();
const mongoose = require('mongoose');
const db_url = 'mongodb://olezhuk:pas123@ds111455.mlab.com:11455/mangoosedb';

process.env.MONGO_URL = db_url;
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('CONNECTED');
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    if (req.headers.authorization !== 'Bearer eagle') {
        res.status(403).send('Authorization failed!');
        console.log('Authorization failed');
    } else {
        console.log('Authorization passed!');
        next();
    }
});
app.use('/todos', todo);
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});