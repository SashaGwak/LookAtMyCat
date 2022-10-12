const express = require('express');
const router = express.Router();

/* 로그인 확인 미들웨어 */
function checkSession (req, res, next) {
  if (req.session.user_id != null || req.user !=null) next(); 
  else if (!req.user) {
    res.redirect('/');
  }
}

/* 메인페이지 */
router.get('/', checkSession, (req, res) => {
  res.send({isCheck:true}); 
}); 
  
module.exports = router;
