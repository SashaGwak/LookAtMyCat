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
      if (result.data.isCreate === true) {
        replace("/user/login"); 
      }
    })
    .catch(err => console.log(err));
  }
  return (
    <div className='main-container'>
      <div className='form'>
        <h1>νμ κ°μ</h1>
        <form id='userdata'>
          <div className="form-contol">
            <label htmlFor='id'>π» μμ΄λ : </label>
            <input type="text" name="id" placeholder="μμ΄λ"></input>
          </div>
          <div className="form-contol">
            <label htmlFor='name'>π» μ΄λ©μΌ : </label>
            <input type="email" name='email' placeholder="μ΄λ©μΌ"></input>
          </div>
          <div className="form-contol">
            <label htmlFor='name'>π» λΉλ°λ²νΈ : </label>
            <input type="password" name='password' placeholder="λΉλ°λ²νΈ"></input>
          </div>
          <div className="form-contol">
            <label htmlFor='name'>π» λΉλ°λ²νΈ νμΈ : </label>
            <input type="password" name='confirmPassword' placeholder="λΉλ°λ²νΈ μ¬νμΈ"></input>
          </div>
          <button type='button' onClick={ send }>νμ κ°μ</button>
        </form>
      </div>
    </div>
  )
}
export default Singup;