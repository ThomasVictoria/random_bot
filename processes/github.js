var request = require("request-promise");

module.exports = async () => {
  let res = await request(
    "https://github-trending-api.now.sh/repositories"
  ).then((res) => {
    return JSON.parse(res);
  });
  return `*Github trending*\n${res[0].author}/${res[0].name}\n_${res[0].description}_\n${res[0].stars} stars/${res[0].language}\n${res[0].url}`;
};
