const param = new URLSearchParams(location.search);

let id = parseInt(param.get("id"));

async function getPokemonDetails(id) {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
  const pokemon = await response.json();
  console.log(pokemon);

  showInHtml(pokemon);
}

function showInHtml(pokemon) {
  let name = document.getElementById("name");
  //name.innerHTML = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  name.innerHTML = capitalizeMyString(pokemon.name);

  let pokemonImg = document.querySelector(".pokemon-img");
  pokemonImg.src = pokemon.sprites.other.dream_world.front_default;
  let height = document.getElementById("height");
  height.innerHTML = pokemon.height + " dm";
  let weight = document.getElementById("weight");
  weight.innerHTML = pokemon.weight + " lbs";
  let abilities = document.querySelector("#abilities");
  // abilities.innerHTML = pokemon.abilities[0].ability.name;
  // console.log(pokemon);
  // if (pokemon.abilities[1] !== undefined) {
  //   abilities.innerHTML += " | " + pokemon.abilities[1].ability.name;
  // }
  abilities.innerHTML = "";
  for (let i = 0; i < pokemon.abilities.length; i++) {
    let ability = pokemon.abilities[i].ability.name;
    //Uability = ability.charAt(0).toUpperCase() + ability.slice(1);
    
    abilities.innerHTML += capitalizeMyString(ability) + "  ";
  }
}

function capitalizeMyString(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}



getPokemonDetails(id);

let leftArrow = document.querySelector(".left-arrow");
let rightArrow = document.querySelector(".right-arrow");
  leftArrow.href = `detail.html?id=${id-1}`;
  rightArrow.href = `detail.html?id=${id+1}`;