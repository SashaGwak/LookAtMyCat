import './css/card.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
 
function Detail() {
  const [ data, setData ] = useState([]);

  // 정보 받아오기
  useEffect(() => {
    console.log('시작');
    axios({
      method:'get', 
      url:'/api/cat/:id'
    })
    .then(result => {
      console.log('메롱'); 
      // setData([...result.data]);
    })
  }, []);

  return (
    <div className='detail-container'>
      <h1>메롱</h1>
    </div>
  )
}

export default Detail;