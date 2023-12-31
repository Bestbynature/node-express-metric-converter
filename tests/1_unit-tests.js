// const chai = require('chai');
// let assert = chai.assert;
// const ConvertHandler = require('../controllers/convertHandler.js');

// let convertHandler = new ConvertHandler();

// suite('Unit Tests', function(){
  

// });

const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

  test('convertHandler should correctly read a whole number input', function () {
    const input = '32mi';
    const result = convertHandler.getNum(input);
    assert.equal(result, 32);
  });

  test('convertHandler should correctly read a decimal number input', function () {
    const input = '2.5gal';
    const result = convertHandler.getNum(input);
    assert.equal(result, 2.5);
  });

  test('convertHandler should correctly read a fractional input', function () {
    const input = '3/4km';
    const result = convertHandler.getNum(input);
    assert.equal(result, 0.75);
  });

  test('convertHandler should correctly read a fractional input with a decimal', function () {
    const input = '5.4/3lbs';
    const result = convertHandler.getNum(input);
    assert.equal(result, 1.8);
  });

  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', function () {
    const input = '3/2/3kg';
    const result = convertHandler.getNum(input);
    assert.equal(result, 'invalid');
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function () {
    const input = 'gal';
    const result = convertHandler.getNum(input);
    assert.equal(result, 1);
  });

  test('convertHandler should correctly read each valid input unit', function () {
    const units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    units.forEach(unit => {
      const input = `5${unit}`;
      const result = convertHandler.getUnit(input);
      assert.equal(result, unit);
    });
  });

  test('convertHandler should correctly return an error for an invalid input unit', function () {
    const input = '5invalidunit';
    const result = convertHandler.getUnit(input);
    assert.equal(result, 'invalid');
  });

  test('convertHandler should return the correct return unit for each valid input unit', function () {
    const inputUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    const expectedReturnUnits = ['l', 'gal', 'km', 'mi', 'kg', 'lbs'];
    inputUnits.forEach((unit, index) => {
      const result = convertHandler.getReturnUnit(unit);
      assert.equal(result, expectedReturnUnits[index]);
    });
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function () {
    const units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    const expectedStrings = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
    units.forEach((unit, index) => {
      const result = convertHandler.spellOutUnit(unit);
      assert.equal(result, expectedStrings[index]);
    });
  });

  test('convertHandler should correctly convert gal to L', function () {
    const input = [5, 'gal'];
    const expected = 18.92705;
    const result = convertHandler.convert(...input);
    assert.equal(result, expected);
  });

  test('convertHandler should correctly convert L to gal', function () {
    const input = [5, 'l'];
    const expected = 1.32086;
    const result = convertHandler.convert(...input);
    assert.equal(result, expected);
  });

  test('convertHandler should correctly convert mi to km', function () {
    const input = [5, 'mi'];
    const expected = 8.0467;
    const result = convertHandler.convert(...input);
    assert.equal(result, expected);
  });

  test('convertHandler should correctly convert km to mi', function () {
    const input = [5, 'km'];
    const expected = 3.10686;
    const result = convertHandler.convert(...input);
    assert.equal(result, expected);
  });

  test('convertHandler should correctly convert lbs to kg', function () {
    const input = [5, 'lbs'];
    const expected = 2.26796;
    const result = convertHandler.convert(...input);
    assert.equal(result, expected);
  });

  test('convertHandler should correctly convert kg to lbs', function () {
    const input = [5, 'kg'];
    const expected = 11.0231;
    const result = convertHandler.convert(...input);
    assert.equal(result, expected);
  });
});
