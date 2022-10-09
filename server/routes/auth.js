const express = require('express');
const router = express.Router(); 
const crypto = require('crypto');

const User = require('../models/user'); 

/* 회원가입 페이지 */
router.get('/api/user/signup', (req, res) => {
    res.json(data);
  }); 

/* 비밀번호 암호화 함수 */
const salt = crypto.randomBytes(64).toString('base64'); 
const createHashedPassword = (password) => {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('base64');
};
/* 비밀번호 확인 함수 */
const verifyPassword = (password, salt, userPassword) => {
  const hashed = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('base64');

  if (hashed == userPassword) return true; 
  return false; 
}

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

/* 로그인 기능 */
router.post('/login', async(req, res) => {
  const { id, password } = req.body; 
  User.findOne({id: id})
  .then(data => {
    if (verifyPassword( password, salt, data.password)) {
      return res.send({isLogin: true});
    } else {
      return res.send({isLogin: false});
    }
  })
});

module.exports = router;
