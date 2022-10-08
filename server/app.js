const express = require('express');
const app = express(); 

/* bodyParser */
const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

/* cors */
var cors = require('cors');
app.use(cors())

const data = {
  'id' : 'sihaha', 
  'email' : 'test@test.com'
};

/* DB */ 
const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://poemha:Mini1028!@clustertest.bwpwhd8.mongodb.net/Cat';
const User = require('./models/user');

app.get('/', (req, res) => {
  res.send('Hello world!');
}); 

app.get('/api/user/signup', (req, res) => {
  res.json(data);
}); 

app.post('/api/user/signup', async (req, res) => {
  const { id , password, email} = req.body;
  const user = new User({
    id: id, 
    email: email, 
    password: password
  }); 
  await user.save(err => {console.log(err)});
  console.log(id, email, password);
  return res.send('Success');
}); 

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