var randomCat = require("random-cat");

module.exports = async () => {
  return randomCat.get({
    category: "cats",
  });
};
