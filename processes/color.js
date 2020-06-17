var request = require("request-promise");

module.exports = async () => {
  let res = await request("http://www.colr.org/json/color/random").then(
    (res) => {
      return JSON.parse(res);
    }
  );

  return `#${res.new_color}`;
};
