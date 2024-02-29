const pokemonsListElement = document.getElementById("pokemonsList");
const btnPrevPage = document.getElementById("prevPage");
const btnNextPage = document.getElementById("nextPage");

let limit = 10;
let offset = 0;
let pokemonCount;

function makeHtmlPokemonTypeList(pokemonModel) {
  return pokemonModel.types
    .map((type) => {
      return `<li class="tipo ${type}">${type}</li>`;
    })
    .join("");
}

function makeHtmlPokemonCard(pokemonModel) {
  return `
  <a style="text-decoration: none;" href="assets/pages/pokemon-details/index.html?id=${pokemonModel.number}">
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
  </a>
  `;
}

function loadPokemons() {
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
    .getPokemons(offset, limit)
    .then((pokemonsList = []) => {
      pokemonsListElement.innerHTML = pokemonsList
        .map(makeHtmlPokemonCard)
        .join("");
    })
    .catch((error) => console.log(error));
}

function nextPage() {
  offset += limit;
  btnPrevPage.removeAttribute("disabled");
  if (offset + limit > pokemonCount) {
    btnNextPage.setAttribute("disabled", true);
  }
  window.scrollTo(0, 0);
  loadPokemons();
}

function prevPage() {
  offset -= limit;
  btnNextPage.removeAttribute("disabled");
  if (offset === 0) {
    btnPrevPage.setAttribute("disabled", true);
  }
  window.scrollTo(0, 0);
  loadPokemons();
}

pokeApi.pokemonCount().then((count) => (pokemonCount = count));

btnPrevPage.addEventListener("click", prevPage);
btnNextPage.addEventListener("click", nextPage);

loadPokemons();
