import './css/Main.css';
import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; 
import uploadFile from './fileAPI';

function Feed() {
  const [image, SetImage] = useState('');
  const upload = async(e) => {
    e.preventDefault();
    const formData = new FormData(); 
    formData.append('file', e.target.file.files[0]);
    await uploadFile(formData);
  };

  // const replace = useNavigate();
  return (
    <div className='main-container' >
      {/* 이미지 부분 */}
      <form encType='multipart/form-data' onSubmit={ upload }>
        <input type='file' name='file' />
        <button type='sumbit'>업로드</button>
      </form>
      {/* 게시글 관련 부분  */}
      <form id='feedata'>
        <div className="form-contol">
          <label htmlFor='title'>😻 제목 : </label>
          <input type="text" name='title' placeholder="제목"></input>
        </div>
        <div className="form-contol">
          <label htmlFor='name'>😻 내용 : </label>
          <textarea type="text" name='description' placeholder="내용"></textarea>
        </div>
          <input type="hidden" name='imageUrl' value={ image }></input>
        <button type='button'>등록</button><br />
      </form>
    </div>
  )
}

export default Feed;