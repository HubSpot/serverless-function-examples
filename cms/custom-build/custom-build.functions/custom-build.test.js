const frisby = require('frisby');

beforeAll(() => {
  frisby.addExpectHandler('hasCorrectProperties', (response) => {
    let json = JSON.parse(response.body);

    expect(json.name).toEqual(expect.any(String));
    expect(json.email).toEqual(expect.any(String));
    expect(json.contactCard).toEqual(expect.any(Object));
  });
});

it('should return a 200', () => {
  return frisby.get('http://localhost:5432/_hcms/api/custom-build')
    .expect('status', 200);
});

it('should return the proper data shape', () => {
  return frisby.get('http://localhost:5432/_hcms/api/custom-build')
    .expect('hasCorrectProperties');
});

afterAll(() => {
  frisby.removeExpectHandler('hasCorrectProperties');
});
