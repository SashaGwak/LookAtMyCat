import './css/Main.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Singup() {
  const replace = useNavigate();
  const send = () => {
    let form = document.getElementById("userdata");
    axios({
      method: "post", 
      url: "/api/user/signup", 
      data : {
        id : form.id.value, 
        email : form.email.value, 
        password : form.password.value, 
      }
    })
    .then(result => {
      if (result.data.isCreate == true) {
        replace("/user/login"); 
      }
    })
    .catch(err => console.log(err));
  }
  return (
    <div className='main-container'>
      <div className='form'>
        <h1>회원 가입</h1>
        <form id='userdata'>
          <div className="form-contol">
            <label htmlFor='id'>😻 아이디 : </label>
            <input type="text" name="id" placeholder="아이디"></input>
          </div>
          <div className="form-contol">
            <label htmlFor='name'>😻 이메일 : </label>
            <input type="email" name='email' placeholder="이메일"></input>
          </div>
          <div className="form-contol">
            <label htmlFor='name'>😻 비밀번호 : </label>
            <input type="password" name='password' placeholder="비밀번호"></input>
          </div>
          <div className="form-contol">
            <label htmlFor='name'>😻 비밀번호 확인 : </label>
            <input type="password" name='confirmPassword' placeholder="비밀번호 재확인"></input>
          </div>
          <button type='button' onClick={ send }>회원 가입</button>
        </form>
      </div>
    </div>
  )
}
export default Singup;