const frisby = require('frisby');

describe('hello-world', () => {
  beforeAll(() => {
    frisby.addExpectHandler('bodyToBeHelloWorld', (response) => {
      expect(response.body).toEqual('Hello World');
    });
  });

  it('should return a 200', () => {
    return frisby.get('http://localhost:5432/_hcms/api/hello-world')
      .expect('status', 200);
  });

  it('should return the Hello World body', () => {
    return frisby.get('http://localhost:5432/_hcms/api/hello-world')
      .expect('bodyToBeHelloWorld');
  });

  afterAll(() => {
    frisby.removeExpectHandler('bodyToBeHelloWorld');
  });
});
