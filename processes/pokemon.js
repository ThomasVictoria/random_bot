var request = require("request-promise");

module.exports = async () => {
  let n = Math.floor(Math.random() * (500 - 1) + 1);
  let res = await request("https://pokeapi.co/api/v2/pokemon/" + n).then(
    (res) => {
      return JSON.parse(res);
    }
  );

  let types = "";

  for (let t in res.types) {
    if (t == res.types.length - 1) types += res.types[t].type.name;
    else types += res.types[t].type.name + ", ";
  }

  return `*${res.name.toUpperCase()}*\n${
    res.sprites.front_default
  }\n>${res.name.toUpperCase()} is a pokemon of type ${types}. He usually weight around ${
    res.weight / 10
  }kg and can be ${res.height / 10} meters tall !`;
};
