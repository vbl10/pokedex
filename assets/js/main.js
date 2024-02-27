const offset = 10;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
const pokemonsListElement = document.getElementById("pokemonsList");

function makeHtmlPokemonTypeList(pokemonStruct) {
  return pokemonStruct.types.map((elmnt) => {
    return `<li class="tipo">${elmnt.type.name}</li>`;
  }).join("");
}

function makeHtmlPokemonCard(pokemonStruct) {
  let name = pokemonStruct.name;
  name = name[0].toUpperCase() + name.slice(1);
  return `
    <li class="pokemon">
      <span class="numero">#${pokemonStruct.order}</span>
      <span class="nome">${name}</span>
      <div class="detalhes">
        <ol class="tipos">
          ${makeHtmlPokemonTypeList(pokemonStruct)}
        </ol>
        <img
          src="${pokemonStruct.sprites.other.dream_world.front_default}"
          alt="${name}"
          srcset=""
        />
      </div>
    </li>
  `;
}

/*
  A função fetch() é executada assincronamente. Quando a resposta - que é argumento
do template do retorno de fetch() - está pronta, pode ser acessada dentro do corpo
da função lambda passada como argumento para a funchão membro then().
  O retorno da função then() é, novamente, outra Promise<>, cujo argumento para o 
template é o retorno da função lambda passada como argumento. Dessa forma, é possível
concatenar múltiplas chamadas à função membro then() e processar os resultados 
progressivamente.
*/
pokeApi
  .getPokemons()
  .then((pokemonsList = []) => {
    pokemonsListElement.innerHTML += pokemonsList
      .map(makeHtmlPokemonCard)
      .join("");
  })
  .catch((error) => console.log(error));
