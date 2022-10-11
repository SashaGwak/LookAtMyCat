const express = require('express');
const router = express.Router(); 
// const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const User = require('../models/user'); 

/* passport */
const passport = require('passport'); 
require('./passport');

/* 패스포트 로그인 기능 */
router.get('/google/login', 
  // 프로파일과 이메일 정보를 받는다.
  passport.authenticate('google', { scope: ['email', 'profile']}) 
)

/* 패스포트 로그인 후 라우터 */
router.get('/google/callback', 
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/', 
    failureRedirect: 'http://localhost:3000/api/user/login', // 로그인 실패시
  })
)

/* 회원가입 페이지 */
router.get('/signup', (req, res) => {
    res.json(data);
  }); 

/* 비밀번호 암호화 함수 */
// const salt = crypto.randomBytes(64).toString('base64'); 
// const createHashedPassword = (password) => {
//   return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('base64');
// };

/* 비밀번호 확인 함수 */
// const verifyPassword = (password, salt, userPassword) => {
//   console.log('입력값', password); 
//   const hashed = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('base64');
//   console.log('암호화값', hashed);
//   console.log('디비값', userPassword);

//   if (hashed == userPassword) return true; 
//   return false; 
// }

/* 회원가입 기능 */
router.post('/signup', async (req, res) => {
    const { id , password, email} = req.body;
    // 비밀번호 암호화 
    const HashedPassword = await bcrypt.hash(password, 12)
    // const HashedPassword = createHashedPassword(password);
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
    bcrypt.compare(password, data.password)
    .then(doMatch => {
      if (doMatch) {
        return res.send({isLogin: true});
      } else {
        return res.send({isLogin: false});
      }
    })
    // if (verifyPassword(password, salt, data.password)) {
    //   req.session.displayName = data.name; 
    //   return res.send({isLogin: true});
    // } else {
    //   return res.send({isLogin: false});
    // }
  })
  .catch(err => {
    console.log(err);
    return res.send({isLogin: false});
  })
});

/* 로그아웃 기능 */
router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

module.exports = router;