class PokemonModel {
  constructor(pokeApiModel) {
    this.number = pokeApiModel.order;
    this.name =
      pokeApiModel.name.slice(0, 1).toUpperCase() + pokeApiModel.name.slice(1);
    this.types = pokeApiModel.types.map((elmnt) => elmnt.type.name);
    this.mainType = this.types[0];
    this.sprite = pokeApiModel.sprites.other.dream_world.front_default;
  }
  number;
  name;
  mainType;
  types = [];
  sprite;
}
class pokeApi {
  static getPokemons(offset = 0, limit = 10) {
    const getPokemonDetailsPromise = function (elmnt) {
      return fetch(elmnt.url)
        .then((pokemonDetailsJson) => pokemonDetailsJson.json())
        .then((pokeApiModel) => new PokemonModel(pokeApiModel));
    };

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
      .then((response) => response.json()) //.json() is asynchronous because until here only the response header has been received
      .then((responseStruct) => responseStruct.results)
      .then((pokemonList) => pokemonList.map(getPokemonDetailsPromise))
      .then((pokemonDetailsPromiseList) =>
        Promise.all(pokemonDetailsPromiseList)
      ) //waits for all promises to fulfill and returns pokemonDetailsList
      .catch((error) => console.log(error));
  }
}
