const express = require('express');
const router = express.Router();

/* 로그인 확인 미들웨어 */
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

/* 메인페이지 */
router.get('/', isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}`);
  }); 
  
module.exports = router;
