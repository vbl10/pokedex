const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get("id");
const page = document.getElementById("page");

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
  .then((response) => response.json())
  .then((pokeApiModel) => {
    console.log(pokeApiModel);
    const pokemon = new PokemonModel(pokeApiModel);
    page.innerHTML = `
    <section class="conteudo ${pokemon.mainType}">
        <div class="top-bar">
          <div class="left-info">
            <h1 class="pokemon-name">${pokemon.name}</h1>
            <ol>
              ${pokemon.types.map((type) => `<li class="${type}">${type}</li>`).join("")}
            </ol>
          </div>
          <h1 class="numero">#${pokemon.number}</h1>
        </div>
        <div id="pokemon-sprite-container">
          <img
            id="pokemon-sprite"
            src="${pokemon.sprite}"
            alt="${pokemon.name}"
          />
        </div>
      </section>
      <div class="div1">
        <div class="info-dock">
          <div class="info-table">
            <span class="table-prop">Altura</span><span>${pokemon.height}</span>
            <span class="table-prop">Peso</span><span>${pokemon.weight}</span>
            <span class="table-prop">Habilidades</span
            ><span>${pokemon.abilities.join(", ")}</span>
            <span class="table-prop">Experiência base</span><span>${pokemon.base_xp}</span>
            <span class="table-prop">HP</span><span>${pokemon.hp}</span>
            <span class="table-prop">Ataque</span><span>${pokemon.attack}</span>
            <span class="table-prop">Defesa</span><span>${pokemon.defense}</span>
            <span class="table-prop">Ataque especial</span><span>${pokemon.special_attack}</span>
            <span class="table-prop">Defesa especial</span><span>${pokemon.special_defense}</span>
            <span class="table-prop">Velocidade</span><span>${pokemon.speed}</span>
          </div>
        </div>
      </div>
    `;
  })
  .catch((error) => console.log(error));
