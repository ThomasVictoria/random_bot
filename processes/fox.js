var request = require("request-promise");

module.exports = async () => {
  let img = await request("https://randomfox.ca/floof/").then((res) => {
    let r = JSON.parse(res);
    return "Get a fox !\n" + r.image;
  });
  return img;
};
