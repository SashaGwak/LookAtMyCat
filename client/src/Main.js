import axios from 'axios';
import {useEffect, useState} from 'react';
import Card from './Card';

function Main () {
  const [ feeds, setFeeds ] = useState([]);
  // 정보 받아오기
  useEffect(() => {
    axios({
      method:'get', 
      url:'/api'
    })
    .then(result => {
      console.log(result.data); 
      setFeeds([...result.data]);
    })
  }, []);
  return (
    <>
      <h1>🐈 Cat saves the world! 🐈‍⬛</h1>
      {feeds.map((element) => (
        <Card key={element._id} title={element.title} writer={element.writer} description={element.description} />
      ))}
    </>
  )
}

export default Main; 