const express = require('express');
const router = express.Router(); 
const crypto = require('crypto');

const User = require('../models/user'); 

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

/* passport */
const passport = require('passport'); 
require('./passport');

/* 구글 패스포트 페이지 */
router.get('/google', (req, res) => {
  res.send('<a href="/api/user/google/login">Authenticate with Google</a>');
});

/* 패스포트 로그인 기능 */
router.get('/google/login', 
  passport.authenticate('google', { scope: ['email', 'profile']})
)

router.get('/google/callback', 
  passport.authenticate('google', {
    successRedirect: 'protected', 
    failureRedirect: 'google/failure'
  })
)

router.get('/google/protected', isLoggedIn, (req, res) => {
  res.send('Hello!');
});

router.get('google/failure', isLoggedIn, (req, res) => {
  res.send('something worng...!')
});

/* 회원가입 페이지 */
router.get('/signup', (req, res) => {
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


// /* google passport */
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// module.exports = () => {
//   passport.use(
//     new GoogleStrategy(
//       {
//         id : process.env.GOOGLE_ID, // 구글 로그인 REST API 키 
//         clientSecret: process.env.GoogleStrategy, 
//         callback: 'api/user/google', // 구글 로그인 Redirect URI 경로
//       }, 
//       async (accessTocke, refreshToken, profile, done) => {
//         console.log('google profie: ', profile);
//         try {
//           const exUser = await User.findOne({
//             // 구글 플랫폼에서 로그인 했고 & snsId필드에 구글 아이디가 일치할경우
//             where: {snsId: profile.id, provider: 'google'}, 
//           }); 
//           // 이미 가입된 구글 프로필이면 성공
//           if (exUser){
//             done(null, exUser); // 로그인 인증 완료
//           } else {
//             // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
//             const newUser = await User.create({
//               email: profile?.email[0].value,
//               nick: profile.displayName,
//               snsId: profile.id,
//               provider: 'google',
//             });
//             done(null, newUser); // 회원가입하고 로그인 인증 완료
//           }
//         } catch (error) {
//           console.error(error);
//           done(error)
//         }
//       }, 
//     ), 
//   );
// };

// /* 구글 로그인 */
// router.get('user/google', passport.authenticate('google', { scope: ['profile', 'email']})); 

// router.get(
//   'user/google/callback', 
//   passport.authenticate('google', {failureRedirect: '/'}), // passport 로그인 전략에 의해 strategy로 가서 구글 계정 정보와 DB를 비교해서 회원가입 시키거나 로그인 하도록 함 
//   (req, res) => {
//     res.redirect('/');
//   }
// )

// module.exports = () => { 
//    passport.serializeUser((user, done) => {
//       done(null, user.id);
//    });
//    passport.deserializeUser((id, done) => {
//       User.findOne({ where: { id } })
//         .then(user => {
//           console.log(user);
//           done(null, user)

//         })
//          .catch(err => done(err));
//    }); 
//    local();
//    google(); // 구글 전략 등록
// };


module.exports = router;
