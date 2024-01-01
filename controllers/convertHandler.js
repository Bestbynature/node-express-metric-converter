function ConvertHandler() {
  this.getNum = function (input) {
    const regex = /[a-zA-Z]/; 
    const index = input.search(regex);
    let numStr = input.slice(0, index !== -1 ? index : input.length); 

    if (numStr.includes("/")) {
      
      if (numStr.split("/").length > 2) return "invalid"; 
      
      let [first, second] = numStr.split("/");
      numStr = parseFloat(first) / parseFloat(second);
    } else numStr = parseFloat(numStr);
    

    if (isNaN(numStr)) return 1;
    else return numStr;
    
  };

  this.getUnit = function (input) {
    const units = ["gal", "l", "mi", "km", "lbs", "kg"];
    const regex = /[a-zA-Z]/;
    const index = input.search(regex);
    let unit = input.slice(index).toLowerCase();

    if (!units.includes(unit)) {
      return "invalid";
    } else {
      if(unit === 'l') return unit.toUpperCase();
      return unit;
    }
  };

  this.getReturnUnit = function(initUnit) {
    const unitPairs = {
      gal: 'L',
      l: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs',
    };
  
    const unit = initUnit.toLowerCase();
    return unitPairs[unit];
  };
  

   this.spellOutUnit = function (unit) {
    const unitNames = {
      gal: "gallons",
      l: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };

    unit = unit.toLowerCase();

    return unitNames[unit];
  };

  this.convert = function (initNum, initUnit) {
    const conversions = {
      gal: 3.78541,
      L: 0.264172,
      mi: 1.60934,
      km: 0.621373,
      lbs: 0.453592,
      kg: 2.204624,
    };

    const precision = 100000;
    const num = initNum * conversions[initUnit];
    
    const multiplied = num * precision;
    const floored = Math.floor(multiplied);
    const decimalPlace = multiplied - floored;

    if (decimalPlace >= 0.5) {
      return (floored + 1) / precision;
    } else {
      return floored / precision;
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const spelledInitUnit = this.spellOutUnit(initUnit);
    const spelledReturnUnit = this.spellOutUnit(returnUnit);

    return `${initNum} ${spelledInitUnit} converts to ${returnNum} ${spelledReturnUnit}`;
  };
}

module.exports = ConvertHandler;
