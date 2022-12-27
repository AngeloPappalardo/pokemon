const pokemonCount = 156;
let pokedex = {};
const serchForm = document.getElementById("serch-form");
window.onload = async function () {
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
    let pokemon = document.createElement("div");
    pokemon.id = i;
    pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
    pokemon.classList.add("pokemon-name");
    pokemon.addEventListener("click", updatePokemon);
    document.getElementById("pokemon-list").appendChild(pokemon);
  }
  document.getElementById("pokemon-description").innerText = pokedex[1]["desc"];
};

async function getPokemon(num) {
  let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
  let res = await fetch(url);
  let pokemon = await res.json();
  let pokemonName = pokemon["name"];
  let pokemonType = pokemon["types"];
  let pokemonImg = pokemon["sprites"]["front_default"];
  res = await fetch(pokemon["species"]["url"]);
  let pokemonDesc = await res.json();
  pokemonDesc = pokemonDesc["flavor_text_entries"][51]["flavor_text"];
  pokedex[num] = {
    name: pokemonName,
    img: pokemonImg,
    types: pokemonType,
    desc: pokemonDesc,
  };
  serchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const pokemonSubmit = document.getElementById("serch-input").value;
    getPokemon(pokemonSubmit);
    document.getElementById("type-box").appendChild(pokemon);
    document.getElementById("pokemon-description").appendChild(pokemon);
  });
}


function updatePokemon() {
  document.getElementById("pokemon-img").src = pokedex[this.id]["img"];
  let typesDiv = document.getElementById("pokemon-types");
  while (typesDiv.firstChild) {
    typesDiv.firstChild.remove();
  }
  let types = pokedex[this.id]["types"];
  for (const element of types) {
    let type = document.createElement("span");
    type.innerText = element["type"]["name"].toUpperCase();
    type.classList.add("type-box");
    type.classList.add(element["type"]["name"]);
    typesDiv.appendChild(type);
  }
  document.getElementById("pokemon-description").innerText =
    pokedex[this.id]["desc"];
}
