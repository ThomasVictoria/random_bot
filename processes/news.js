var request = require("request-promise");

module.exports = async () => {
  let res = await request(
    `https://newsapi.org/v2/top-headlines?apiKey=${process.env.NEWS}&country=fr&category=general&pageSize=20`
  ).then((res) => {
    return JSON.parse(res);
  });

  let n = Math.floor(Math.random() * (20 - 0) + 0);
  let article = res.articles[n];

  return `*${article.title}*\n_${article.author}_\n${article.urlToImage}\n>${article.description}\n${article.url}`;
};
