const express = require('express');
const app = express(); 

/* bodyParser */
const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

/* env */
require('dotenv').config(); 

/* DB */ 
const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://poemha:Mini1028!@clustertest.bwpwhd8.mongodb.net/Cat';

/* routes */
const authRouter = require('./routes/auth');
const feedRouter = require('./routes/feed');

app.use('/api', feedRouter); 
app.use('/api/user', authRouter);

mongoose.connect(MONGODB_URI)
  .then(result => {
    app.listen(8000, () => {
      console.log('Server start!');
    });
  })
  .catch(err => console.log(err)); 

// app.listen(8000, () => {
//   console.log('Server start!');
// });