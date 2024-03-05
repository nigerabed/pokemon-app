
const params = new URLSearchParams(location.search);
const limit = parseInt(params.get("limit")) || 20;
const offset = parseInt(params.get("offset")) || 0;

async function getPokemons(limit, offset) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const pokemons = await response.json();
  return pokemons;
}


// async function getPokemon() {
//   const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
//   const pokemon = await response.json();
//   //   console.log(pokemon);
//   return pokemon;
// }

async function getPokemonfromAPI() {
  const pokemonObject = await getPokemons(limit,offset);
  //   console.log(pokemonObject);

  const detailPokemonList = await Promise.all(
    pokemonObject.results.map(getDetailePOkemon)
  );
  // console.log(detailPokemonList);

  return detailPokemonList;
}

async function getDetailePOkemon(element) {
  const name = element.name;
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
  const pokemon = await response.json();
  //   console.log(pokemon);
  return pokemon;
}

async function createContent(filterby) {
  let pokemonList = await getPokemonfromAPI();

  // Now filter the list of there is filterbyString

  if (filterby !== undefined) {
    pokemonList = pokemonList.filter((pokemon) => {
      if (pokemon.name.includes(filterby)) {
        return true;
      } else {
        return false;
      }
    });
  }

  let previous = document.querySelector(".previous")
  let next = document.querySelector(".next")
  next.href = `index.html?limit=${limit}&offset=${offset + limit}`;
  previous.href = `index.html?limit=${limit}&offset=${offset - limit}`;

  const list = document.querySelector("ul#pokemonList");
  list.innerHTML = "";

  pokemonList.forEach((pokemonElement) => {
    // console.log(" one pokemon object", pokemonElement);
    // console.log(" one pokemon object", pokemonElement.abilities[1]);
    let li = document.createElement("li");
    li.innerHTML = `
      <div class="poke-container">
            <a href="detail.html?id=${pokemonElement.id}">
                <img src ="${
                  pokemonElement.sprites.other.dream_world.front_default
                }">
                
                <div class="id-name-power">
                <span class="poke-id">${pokemonElement.id}</span>
                <p>
                <h2>${
                  pokemonElement.name
                }</h2>
                </p>
                <div class="powerDiv">
                <span class="power grass">${
                  pokemonElement.types[0].type.name
                }</span>
                
                ${
                  pokemonElement.types[1] !== undefined
                  ? ` <span class="power fire">${pokemonElement.types[1].type.name}</span>`
                  : ""
                }
                </div>
                </div>
                </a>
                </div>
          `;
    list.append(li);
  });
}

createContent();

let form = document.querySelector("#form");

form.addEventListener("submit", submitHandler);

function submitHandler(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#searchInput");
  // let filteredBy = document.querySelector("#filteredBy");

  // filteredBy.innerHTML = searchInput.value;

  createContent(searchInput.value);
}
