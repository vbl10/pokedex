const offset = 10;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
const pokemonsListElement = document.getElementById("pokemonsList");

function pokemonStructToHtml(pokemonStruct) {
  return `
    <li class="pokemon">
      <span class="numero">#001</span>
      <span class="nome">${pokemonStruct.name}</span>
      <div class="detalhes">
        <ol class="tipos">
          <li class="tipo">grama</li>
          <li class="tipo">poison</li>
        </ol>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
          alt="${pokemonStruct.name}"
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
      .map(pokemonStructToHtml)
      .join("");
  })
  .catch((error) => console.log(error));
