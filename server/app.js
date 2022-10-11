const express = require('express');
const app = express(); 
const passport = require('passport');

/* session */
const session = require('express-session');
app.use(session({ secret: 'secretcats' }));
app.use(passport.initialize()); 
app.use(passport.session());

/* bodyParser */
const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

/* JWT */
const jwt = require('jsonwebtoken');
let jwtObj = {};
jwtObj.secret = process.env.jwtSecret 
const secretObj = jwtObj; // 비밀키 

/* 로그인 확인 미들웨어 */
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

/* env */
require('dotenv').config(); 

/* DB */ 
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI

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