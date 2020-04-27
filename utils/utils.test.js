const {
  tempFormatter,
  dateUnixConverter,
  capitaliseWeather,
} = require("./utils");
const { expect } = require("chai");

describe("tempFormatter", () => {
  it("takes an input number and returns a number", () => {
    const input = 300;
    const actual = tempFormatter(input);
    expect(actual).to.be.a("number");
  });
  it("returns a number rounded to one decimal place", () => {
    const input = 300.27;
    const actual = tempFormatter(input);
    const expected = 27.3;
    expect(actual).to.equal(expected);
  });
});

describe("dateUnixConverter", () => {
  it("takes an input unix number and converts it to time format HH:MM", () => {
    const input = 1587531143;
    const actual = dateUnixConverter(input);
    expect(actual).to.equal("5:52");
  });
});

describe("weatherCapitaliser", () => {
  it("capitalises firs", () => {
    const input = "hello world";
    const actual = capitaliseWeather(input);
    const expected = "Hello World";
    expect(actual).to.equal(expected);
  });
});
