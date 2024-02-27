const pokemonsListElement = document.getElementById("pokemonsList");

function makeHtmlPokemonTypeList(pokemonModel) {
  return pokemonModel.types
    .map((type) => {
      return `<li class="tipo ${type}">${type}</li>`;
    })
    .join("");
}

function makeHtmlPokemonCard(pokemonModel) {
  return `
    <li class="pokemon ${pokemonModel.mainType}">
      <span class="numero">#${pokemonModel.number}</span>
      <span class="nome">${pokemonModel.name}</span>
      <div class="detalhes">
        <ol class="tipos">
          ${makeHtmlPokemonTypeList(pokemonModel)}
        </ol>
        <img
          src="${pokemonModel.sprite}"
          alt="${pokemonModel.name}"
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
  .getPokemons(0, 20)
  .then((pokemonsList = []) => {
    pokemonsListElement.innerHTML += pokemonsList
      .map(makeHtmlPokemonCard)
      .join("");
  })
  .catch((error) => console.log(error));
