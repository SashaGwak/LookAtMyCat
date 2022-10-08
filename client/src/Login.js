import './css/Main.css';

function Login() {
  return (
    <div className='main-container'>
      <div className='form'>
        <h1>로그인</h1>
        <form>
          <div className="form-contol">
          <label htmlFor='id'>😻 아이디 : </label>
          <input type="text" name='id' placeholder="아이디"></input>
          </div>
          <div className="form-contol">
            <label htmlFor='name'>😻 이메일 : </label>
            <input type="email" name='email' placeholder="이메일"></input>
          </div>
          <div className="form-contol">
            <label htmlFor='name'>😻 비밀번호 : </label>
            <input type="password" name='password' placeholder="비밀번호"></input>
          </div>
          <button>로그인</button>
        </form>
      </div>
    </div>
  )
}

export default Login;