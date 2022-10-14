const express = require('express');
const router = express.Router(); 

const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const User = require('../models/user'); 

/* passport */
const passport = require('passport'); 
require('./passport');

/* 패스포트 로그인 기능 */
router.get('/google/login', 
  // 프로파일과 이메일 정보를 받는다.
  passport.authenticate('google', { scope: ['email', 'profile']}), 
)
router.get('/google/callback', 
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000', 
    failureRedirect: 'http://localhost:3000/api/user/login', // 로그인 실패시
  })
)

/* 회원가입 페이지 */
router.get('/signup', (req, res) => {
    res.json(data);
  }); 

/* 메일 전송 기능 */
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sasha.gwak@gmail.com', 
    pass: process.env.EMAIL_PASS,
  }, 
  tls: {
    rejectUnauthorized: false
  }
})

/* 회원가입 기능 */
router.post('/signup', async (req, res) => {
    const { id , password, email} = req.body;
    // 비밀번호 암호화 
    const HashedPassword = await bcrypt.hash(password, 12)
    const user = new User({
      id: id, 
      email: email, 
      password: HashedPassword,
      emailToken : crypto.randomBytes(64).toString('hex'), 
      isVerified: false, 
    }); 
    await user.save(err => {console.log(err)});
    // 인증 메일 세팅 
    let mailOptions = {
      from : ' "Verify your email" <sasha.gwak@gmail.com>', 
      to : user.email, 
      subject: 'LookAtMyCat 이메일 확인 메일', 
      html: `<h2> ${user.id}! 우리의 웹 사이트에 가입해주셔서 감사합니다!</h2>
            <h4>하단의 인증 링크를 눌러 이메일이 맞는 지 인증해주세요~! 그 후 로그인이 승인됩니다!</h4>
            <a href="http://localhost:8000/user/verify-email?token=${user.emailToken}">이메일 인증 진행</a>
      `
    }
    // 메일 송부 
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('메일 전송 완료!');
      }
    })
    return res.send({isCreate: true});
}); 


/* 로그인 기능 */
router.post('/login', async(req, res) => {
  const { id, password } = req.body; 
  User.findOne({id: id})
  .then(data => { 
    // 비밀번호 비교
    bcrypt.compare(password, data.password)
    .then(doMatch => {
      if (doMatch) { 
        // session 생성
        req.session.user_id = id;
        return res.send({isLogin: true});
      } else {
        return res.send({isLogin: false});
      }
    })
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