const express = require('express');
const router = express.Router();

const User = require('../models/user'); 

/* 회원가입 페이지 */
router.get('/api/user/signup', (req, res) => {
    res.json(data);
  }); 

/* 회원가입 기능 */
router.post('/signup', async (req, res) => {
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

module.exports = router;
