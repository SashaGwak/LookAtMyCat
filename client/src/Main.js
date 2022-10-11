import axios from 'axios';
import {useEffect, useState} from 'react';

function Main () {
  const [user, setUser] = useState('');
  // 정보 받아오기
  useEffect(() => {
    axios({
      method:'get', 
      url:'/api'
    })
    .then(result => {
      console.log(result.data);
      setUser(result.data);
    })
  }, []);
  return (
    <>
      <h1>여기는 메인</h1>
      {/* <h2>{user}</h2> */}
    </>
  )
}

export default Main; 