var request = require("request-promise");

module.exports = async () => {
  let res = await request("http://api.icndb.com/jokes/random").then((res) => {
    return JSON.parse(res);
  });

  return res.value.joke.replace(/Chuck Norris/gi, "*Chuck Norris*");
};
