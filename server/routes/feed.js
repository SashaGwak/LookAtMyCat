const express = require('express');
const router = express.Router();

const Cat = require('../models/cat');

/* 로그인 확인 미들웨어 */
function checkSession (req, res, next) {
  if (req.session.user_id != null && req.session.user_id != '') next(); 
  else {
    res.redirect('/api/user/login');
  }
}

/* 메인페이지 */
router.get('/', checkSession, (req, res) => {
  res.send({isCheck:true}); 
}); 

/* 게시글 등록 기능 */
router.post('/', async (req, res) => {
  const { writer, title, description, imageUrl } = req.body;
  const cat = new Cat({
    writer : writer, 
    title : title, 
    description : description, 
    imageUrl : imageUrl, 
  }); 
  await cat.save(err => console.log(err));
  return res.send({isCreate: true});
});
  

module.exports = router;
