tempFormatter = (temperature) => {
  let formattedTemp = Math.round((temperature - 273) * 10) / 10;
  return formattedTemp;
};

dateUnixConverter = (unixTime) => {
  let date = new Date(unixTime * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let formattedTime = hours + ":" + minutes.substr(-2);
  return formattedTime;
};

capitaliseWeather = (weatherString) => {
  let splitStr = weatherString.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
};

module.exports = {
  tempFormatter,
  dateUnixConverter,
  capitaliseWeather,
};
