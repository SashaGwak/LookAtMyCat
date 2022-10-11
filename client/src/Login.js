import './css/Main.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Login() {
  const replace = useNavigate(); 
  // local 로그인 부분 
  const send = () => {
    let form = document.getElementById('userdata'); 
    axios({
      method: 'post', 
      url : '/api/user/login', 
      data : {
        id : form.id.value, 
        password : form.password.value, 
      }
    })
    .then(result => {
      if (result.data.isLogin == true) {
        replace('/'); 
      } else {
        alert('아이디와 비밀번호를 확인해주세요');
      }
    })
    .catch(err => console.log(err));
  }
  return (
    <div className='main-container'>
      <div className='form'>
        <h1>로그인</h1>
        <form id='userdata'>
          <div className="form-contol">
          <label htmlFor='id'>😻 아이디 : </label>
          <input type="text" name='id' placeholder="아이디"></input>
          </div>
          <div className="form-contol">
            <label htmlFor='name'>😻 비밀번호 : </label>
            <input type="password" name='password' placeholder="비밀번호"></input>
          </div>
          <button type='button' onClick={ send }>로그인</button><br />
        </form>
        {/* Google Passport부분 */}
        <form action='/api/user/google/login' method='GET'>
          <button>구글 로그인</button>
        </form>
      </div>
    </div>
  )
}

export default Login;