const express = require('express');
const router = express.Router();

const Cat = require('../models/cat');

/* 게시글 사진 업로드 multer */
const multer = require('multer');
const path = require('path');
const { castObject } = require('../models/cat');
const cat = require('../models/cat');
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    }, 
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}_${file.originalname}`);
    }, 
  }), 
  limits: {fileSize: 5*1024*1024 }
})

/* 로그인 확인 미들웨어 */
function checkSession (req, res, next) {
  if (req.session.user_id != null && req.session.user_id != '') next(); 
  else {
    res.redirect('/api/user/login');
  }
}

/* 메인페이지 */
router.get('/', (req, res) => {
  // passport id 처리
  if (req.user) {
    req.session.user_id = req.user.id;
  };
  // 최신 게시물 정보 부터 받아오기
  Cat.find().sort({ _id: -1})
  .then(result => {
    res.send(result);
  })
  .catch(err => console.log(err));
}); 

/* 이미지 업로드 기능 */
let filedata = {};
router.post('/upload', upload.single('file'), (req, res) => {
  filedata = {...req.file};
  console.log(req.file);
});

/* 게시글 등록 기능 */
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  const cat = new Cat({
    writer : req.session.user_id, 
    title : title, 
    description : description, 
    imageUrl : filedata.filename, 
  }); 
  await cat.save(err => console.log(err));
  return res.send('게시글 등록 완료!');
});
  
/* 게시글 세부내용 페이지 */
router.get('/cat/:id', (req, res) => {
  const id = req.params.id;
  Cat.findOne({ _id: id })
  .then(result => {
    console.log(result);
    return res.send({result});
  })
  .catch(err => console.log(err));
})

module.exports = router;
