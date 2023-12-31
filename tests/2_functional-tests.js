const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

function approximatelyEqual(num1, num2, epsilon = 0.0001) {
  return Math.abs(num1 - num2) < epsilon;
}

suite('Functional Tests', function() {
  
  test('Convert a valid input such as 10L: GET request to /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '10L' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'l');
        assert.equal(res.body.returnUnit, 'gal');
        assert.equal(res.body.string, '10 L converts to 2.6417200000000003 gallons');
        assert.ok(approximatelyEqual(parseFloat(res.body.returnNum), 2.64172));
        done();
      });
  });
  
  
  test('Convert an invalid input such as 32g: GET request to /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '32g' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'invalid unit');
        done();
      });
  });
  
  test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'invalid number');
        done();
      });
  });
  
  test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'invalid number and unit');
        done();
      });
  });
  
  test('Convert with no number such as kg: GET request to /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: 'kg' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        assert.approximately(res.body.returnNum, 2.20462, 0.1);
        assert.equal(res.body.returnUnit, 'lbs');
        assert.equal(res.body.string, '1 kilograms converts to 2.20462 pounds');
        done();
      });
  });
  
});
