const express = require('express');
const router = express.Router();

/* 메인페이지 */
router.get('/', (req, res) => {
    res.send('Hello world!');
  }); 
  
module.exports = router;
