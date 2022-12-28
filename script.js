const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");
const pokemonType = document.querySelector(".types");
const pokemonType2 = document.querySelector(".type");
const typeContainer = document.querySelector(".types__container");
const form = document.querySelector(".form");
const input = document.querySelector(".input__serch");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");
const hpPokemon = document.querySelector(".hp");
const attackPokemon = document.querySelector(".attack");
const defensePokemon = document.querySelector(".defense");
const displayDamage = document.querySelector(".damage");

let serchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  typeContainer.style.display = "none";
  displayDamage.style.display = "none";
  pokemonNumber.innerHTML = " ";
  pokemonType2.innerHTML = " ";
  const data = await fetchPokemon(pokemon);

  if (data) {
    typeContainer.style.display = "flex";
    pokemonImage.style.display = "block";
    displayDamage.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    input.value = "";
    serchPokemon = data.id;
    hpPokemon.innerHTML= data["stats"][0]["base_stat"];
    attackPokemon.innerHTML= data["stats"][1]["base_stat"];
    defensePokemon.innerHTML = data["stats"][2]["base_stat"];
    pokemonType.innerHTML = data["types"][0]["type"]["name"];
    pokemonType2.innerHTML = data["types"][1]["type"]["name"];
  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Not found :c";
    pokemonNumber.innerHTML = " ";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", (event) => {
  if (serchPokemon > 1) {
    serchPokemon -= 1;
    renderPokemon(serchPokemon);
  }
});

buttonNext.addEventListener("click", (event) => {
  serchPokemon += 1;
  renderPokemon(serchPokemon);
});

renderPokemon(serchPokemon);
