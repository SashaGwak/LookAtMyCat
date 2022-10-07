const express = require('express');
const app = express(); 

/* DB */ 
const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://poemha:<password>!@clustertest.bwpwhd8.mongodb.net/Cat';

app.get('/', function(req, res) {
  res.send('Hello world!');
}); 

mongoose.connect(MONGODB_URI)
  .then(result => {
    app.listen(8000, () => {
      console.log('Server start!');
    });
  })
  .catch(err => console.log(err)); 