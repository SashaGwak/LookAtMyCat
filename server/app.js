const express = require('express');
const app = express(); 

/* bodyParser */
const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json())

/* cors */
var cors = require('cors');
app.use(cors())

const data = {
  'id' : 'sihaha', 
  'email' : 'test@test.com'
};

/* DB */ 
const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://poemha:<password>!@clustertest.bwpwhd8.mongodb.net/Cat';

app.get('/', (req, res) => {
  res.send('Hello world!');
}); 

app.get('/api/user/login', (req, res) => {
  res.json(data);
}); 

app.post('/api/user/login', (req, res) => {
  const { id , password, email} = req.body;
  console.log(id, email, password);
  res.send('Success');
}); 

// mongoose.connect(MONGODB_URI)
//   .then(result => {
//     app.listen(8000, () => {
//       console.log('Server start!');
//     });
//   })
//   .catch(err => console.log(err)); 

app.listen(8000, () => {
  console.log('Server start!');
});