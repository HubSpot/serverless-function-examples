const frisby = require('frisby');

describe('boilerplate.functions', () => {
  beforeAll(() => {
    frisby.addExpectHandler('hasCorrectProperties', ({ json }) => {
      const { total, offset, limit, results, cacheKey, searchTerm, page } = json.response;

      expect(total).toEqual(expect.any(Number));
      expect(offset).toEqual(expect.any(Number));
      expect(limit).toEqual(expect.any(Number));
      expect(results).toEqual(expect.any(Array));
      expect(cacheKey).toEqual(expect.any(String));
      expect(searchTerm).toEqual(expect.any(String));
      expect(page).toEqual(expect.any(Number));
    });
  });

  it('should return a 200', () => {
    return frisby.get('http://localhost:5432/_hcms/api/boilerplate')
      .expect('status', 200);
  });

  it('should return the proper data shape', () => {
    return frisby.get('http://localhost:5432/_hcms/api/boilerplate')
      .expect('hasCorrectProperties');
  });

  afterAll(() => {
    frisby.removeExpectHandler('hasCorrectProperties');
  });
});
