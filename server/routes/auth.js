const express = require('express');
const router = express.Router(); 
const crypto = require('crypto');

const User = require('../models/user'); 

/* 회원가입 페이지 */
router.get('/api/user/signup', (req, res) => {
    res.json(data);
  }); 

/* 비밀번호 암호화 함수 */
const createHashedPassword = (password) => {
    const salt = crypto.randomBytes(64).toString('base64'); 
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('base64');
};

/* 회원가입 기능 */
router.post('/signup', async (req, res) => {
    const { id , password, email} = req.body;
    // 비밀번호 암호화 
    const HashedPassword = createHashedPassword(password);
    const user = new User({
      id: id, 
      email: email, 
      password: HashedPassword,
    }); 
    await user.save(err => {console.log(err)});
    return res.send({isCreate: true});
}); 

module.exports = router;
