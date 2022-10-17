import './css/card.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
 
function Detail() {
  const [ feed, setFeed ] = useState([]);
  const { id } = useParams();
  console.log(id);

  // 정보 받아오기
  useEffect(() => {
    console.log('시작');
    axios({
      method:'get', 
      url:`/api/cat/` + id,
    })
    .then(result => {
      console.log('__result', result);
      var originalData= JSON.parse(JSON.stringify(result.data.result));
      setFeed([originalData]);
    })
  }, []);

  return (
    <div className='detail-container'>
      {feed.map((value, key) => (
        <div>
          <img src={`http://localhost:8000/${value.imageUrl}`} alt={value.title}/>
          <h1>{value.title}</h1>
          <p>{value.description}</p><br/>
          <p>-{value.writer}-</p>
          <button>후원하기</button>
        </div>
      ))}
    </div>
  )
}

export default Detail;