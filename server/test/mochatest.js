const expect = require('chai').expect;  // chai expect 불러오기

// mocha 문법
// 테스트코드 시작 it('테스트를 설명하는 문자열', fn )
// 이론상으로는 아무 문자열을 써도 되지만 문장을 쓰는게 보편적
it('should add numbers correctly', function() {
    const num1 = 2; 
    const num2 = 3;
    // 성공 조건을 정의하기 위하여 chai 써야함 
    expect(num1 + num2).to.equal(5); 
    // expect(테스트하고자 하는 코드나 결과를 인수로 전달).to.equal(결과값)
})

it('should not give a result of 6', function() {
    const num1 = 3; 
    const num2 = 3;
    expect(num1 + num2).not.to.equal(6); 
})