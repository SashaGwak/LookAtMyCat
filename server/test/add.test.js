// add.test.js
const add = require('./add');

// test('테스트 설명 문자열', fn(수행할 테스트 코드) {
// });
test ('더하기 테스트', () => {
	expect(add(2, 5)).toBe(7);
  // expect(테스트하고자 하는 코드나 결과를 인수로 전달).toBe(결과값)
  // not.toBe(A) 사용하여 결과값이 A가 아닌지를 확인할 수도 있음
});