const frisby = require('frisby');

describe('unauthed-api-call', () => {
  beforeAll(() => {
    frisby.addExpectHandler('hasCorrectProperties', (response) => {
      const json = JSON.parse(response.body);
      const { character } = json;

      expect(character.name).toEqual(expect.any(String));
      expect(character.height).toEqual(expect.any(String));
      expect(character.mass).toEqual(expect.any(String));
      expect(character.hair_color).toEqual(expect.any(String));
      expect(character.skin_color).toEqual(expect.any(String));
      expect(character.eye_color).toEqual(expect.any(String));
      expect(character.birth_year).toEqual(expect.any(String));
      expect(character.gender).toEqual(expect.any(String));
      expect(character.homeworld).toEqual(expect.any(String));
      expect(character.films).toEqual(expect.any(Array));
      expect(character.species).toEqual(expect.any(Array));
      expect(character.vehicles).toEqual(expect.any(Array));
      expect(character.starships).toEqual(expect.any(Array));
      expect(character.created).toEqual(expect.any(String));
      expect(character.edited).toEqual(expect.any(String));
      expect(character.url).toEqual(expect.any(String));
    });
  });

  it('should return a 200', () => {
    return frisby.get('http://localhost:5432/_hcms/api/unauthed-api-call')
      .expect('status', 200);
  });

  it('should return the proper data shape', () => {
    return frisby.get('http://localhost:5432/_hcms/api/unauthed-api-call')
      .expect('hasCorrectProperties');
  });

  afterAll(() => {
    frisby.removeExpectHandler('hasCorrectProperties');
  });
});
