const frisby = require('frisby');

beforeAll(function () {
  frisby.addExpectHandler('hasCorrectProperties', function (response) {
    let json = JSON.parse(response.body);

    expect(json.name).toEqual(expect.any(String));
    expect(json.email).toEqual(expect.any(String));
    expect(json.contactCard).toEqual(expect.any(Object));
  });
});

it('should return a 200', function () {
  return frisby.get('http://localhost:5432/_hcms/api/custom-build')
    .expect('status', 200);
});

it('should return the proper data shape', function () {
  return frisby.get('http://localhost:5432/_hcms/api/custom-build')
    .expect('hasCorrectProperties');
});

afterAll(function () {
  frisby.removeExpectHandler('hasCorrectProperties');
});
