const express = require('express');
const app = express(); 
const passport = require('passport');

/* 정적 파일 */
app.use(express.static('uploads'));

/* session */
const session = require('express-session');
app.use(session({ secret: 'secretcats' }));
app.use(passport.initialize()); 
app.use(passport.session());

/* bodyParser */
const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

/* env */
require('dotenv').config(); 

/* DB */ 
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI

/* routes */
const authRouter = require('./routes/auth');
const feedRouter = require('./routes/feed');

app.use('/api/user', authRouter);
app.use('/api', feedRouter); 

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