class PokemonModel {
  constructor(pokeApiModel) {
    this.number = pokeApiModel.id;
    this.name =
      pokeApiModel.name.slice(0, 1).toUpperCase() + pokeApiModel.name.slice(1);
    this.types = pokeApiModel.types.map((elmnt) => elmnt.type.name);
    this.mainType = this.types[0];
    this.sprite = pokeApiModel.sprites.other.dream_world.front_default;
    this.height = pokeApiModel.height * 10 + " cm";
    this.weight = pokeApiModel.weight / 10 + " kg";
    this.abilities = pokeApiModel.abilities.map((elmnt) => elmnt.ability.name);
    this.base_xp = pokeApiModel.base_experience;
    this.hp = pokeApiModel.stats[0].base_stat;
    this.attack = pokeApiModel.stats[1].base_stat;
    this.defense = pokeApiModel.stats[2].base_stat;
    this.special_attack = pokeApiModel.stats[3].base_stat;
    this.special_defense = pokeApiModel.stats[4].base_stat;
    this.speed = pokeApiModel.stats[5].base_stat;
  }

  number;
  name;
  mainType;
  types = [];
  sprite;
  height;
  weight;
  abilities = [];
  base_xp;
  hp;
  attack;
  defense;
  special_attack;
  special_defense;
  speed;
}
class pokeApi {
  static pokemonCount() {
    return fetch("https://pokeapi.co/api/v2/pokemon?limit=1")
      .then((response) => response.json())
      .then((result) => result.count)
      .catch((error) => console.log(error));
  }
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
  static getPokemon(id) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((response) => response.json())
      .then((pokeApiModel) => new PokemonModel(pokeApiModel))
      .catch((error) => console.log(error));
  }
}
