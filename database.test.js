const app = require('./server/app.js');
const request = require('supertest');
// test('database is populated with exactly 100 businesses', () => {
//   expect().toBe('test');
// })
describe('Test server', () => {
  test('It should response the GET method', (done) => {
    request(app).get('/api/--9e1ONYQuAa-CB_Rrw7Tw').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  test('data in response should be an array', (done) => {
    request(app).get('/api/--9e1ONYQuAa-CB_Rrw7Tw').then((response) => {
      expect(Array.isArray(JSON.parse(response.text))).toBe(true);
      done();
    });
  })
  test('first item in array should have a business_id that matches id in request', (done) => {
    request(app).get('/api/--9e1ONYQuAa-CB_Rrw7Tw').then((response) => {
      expect(JSON.parse(response.text)[0].business_id).toBe('--9e1ONYQuAa-CB_Rrw7Tw');
      done();
    });
  })
  test('second item in array should be an array', (done) => {
    request(app).get('/api/--9e1ONYQuAa-CB_Rrw7Tw').then((response) => {
      expect(Array.isArray(JSON.parse(response.text)[1])).toBe(true);
      done();
    });
  })
  test('selected business should not show up as a recomended business except when less than 3 recomended businesses', (done) => {
    request(app).get('/api/--9e1ONYQuAa-CB_Rrw7Tw').then((response) => {
      var recomended = JSON.parse(response.text)[1];
      var repeated = false;
      recomended.forEach((business) => {
        if (business.business_id === '--9e1ONYQuAa-CB_Rrw7Tw') {
          repeated = true;
        }
      })
      if (recomended.length > 3) {
        repeated = false;
      }
      expect(repeated).toBe(false);
      done();
    });
  })
});

