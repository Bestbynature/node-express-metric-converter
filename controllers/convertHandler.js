function ConvertHandler() {
  
  this.getNum = function(input) {
    const regex = /[a-zA-Z]/; // Regex to find the index of the first letter
    const index = input.search(regex);
    let numStr = input.slice(0, index !== -1 ? index : input.length); // Extract the number part
  
    // Handle cases like fractions or decimals
    if (numStr.includes('/')) {
      // Check for multiple slashes (indicating a double-fraction)
      if (numStr.split('/').length > 2) {
        return 'invalid'; // Return 'invalid' for double-fraction inputs
      }
  
      let [first, second] = numStr.split('/');
      numStr = parseFloat(first) / parseFloat(second);
    } else {
      numStr = parseFloat(numStr);
    }
  
    if (isNaN(numStr)) {
      return 1;
    } else {
      return numStr;
    }
  };
  
  
  this.getUnit = function(input) {
    const units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg']; 
    const regex = /[a-zA-Z]/;
    const index = input.search(regex);
    let unit = input.slice(index).toLowerCase(); 
  
    if (!units.includes(unit)) {
      return 'invalid';
    } else {
      return unit;
    }
  };
  
  
  this.getReturnUnit = function(initUnit) {
    const unitPairs = {
      'gal': 'L',
      'l': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
  
    return unitPairs[initUnit];
  };
  

  this.spellOutUnit = function(unit) {
    const unitNames = {
      'gal': 'gallons',
      'l': 'L',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
  
    return unitNames[unit];
  };
  
  
  this.convert = function(initNum, initUnit) {
    const conversions = {
      'gal': 3.78541,
      'l': 0.264172,
      'mi': 1.60934,
      'km': 0.621371,
      'lbs': 0.453592,
      'kg': 2.20462
    };
  
    return initNum * conversions[initUnit];
  };
  
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const spelledInitUnit = this.spellOutUnit(initUnit);
    const spelledReturnUnit = this.spellOutUnit(returnUnit);
  
    return `${initNum} ${spelledInitUnit} converts to ${returnNum} ${spelledReturnUnit}`;
  };
  
  
}

module.exports = ConvertHandler;
