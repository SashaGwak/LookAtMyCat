import axios from 'axios';
import {useEffect, useState} from 'react';

function Main () {
  // 정보 받아오기
  useEffect(() => {
    axios({
      method:'get', 
      url:'/api'
    })
    .then(result => {
      console.log(result.data); // {isCheck: true}
    })
  }, []);
  return (
    <>
      <h1>여기는 메인</h1>
    </>
  )
}

export default Main; 