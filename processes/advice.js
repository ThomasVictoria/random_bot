var request = require("request-promise");

module.exports = async () => {
  let res = await request("https://api.adviceslip.com/advice").then((res) => {
    return JSON.parse(res);
  });
  return `*Slip advice*\n_${res.slip.advice}_`;
};
