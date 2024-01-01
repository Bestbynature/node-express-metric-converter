"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get(function (req, res) {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initUnit === "invalid" && initNum === "invalid") {
      return res.json({ error: "invalid number and unit" });
    } else if (initUnit === "invalid") {
      return res.json({ error: "invalid unit" });
    } else if (initNum === "invalid") {
      return res.json({ error: "invalid number" });
    }

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const toString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    res.json({
      initNum,
      initUnit,
      returnNum: parseFloat(returnNum.toFixed(5)), // Round to 5 decimal places
      returnUnit,
      string: toString,
    });
  });
};
