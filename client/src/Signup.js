import './css/Main.scss';

function Singup() {
  return (
    <div className='main-container'>
      <div className='form'>
        <h1>회원 가입</h1>
        <form>
          <div className="form-contol">
            <label for='id'>😻 아이디 : </label>
            <input type="text" name='id' placeholder="아이디"></input>
          </div>
          <div className="form-contol">
            <label for='name'>😻 이메일 : </label>
            <input type="email" name='email' placeholder="이메일"></input>
          </div>
          <div className="form-contol">
            <label for='name'>😻 비밀번호 : </label>
            <input type="password" name='password' placeholder="비밀번호"></input>
          </div>
          <div className="form-contol">
            <label for='name'>😻 비밀번호 확인 : </label>
            <input type="password" name='confirmPassword' placeholder="비밀번호 재확인"></input>
          </div>
          <button>회원 가입</button>
        </form>
      </div>
    </div>
  )
}
export default Singup;