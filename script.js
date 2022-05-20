// Creating Html elements using DOM
const container=document.createElement("div"); 
container.className="container";
const title=document.createElement("h1");
title.innerHTML="Pokemon"
const pokemonCards=document.createElement("div");
pokemonCards.className="pokemon-area";
pokemonCards.id="pokemon-area";

const list=document.createElement("div");
list.className="list";
list.id="list";
const pageNumbers=document.createElement("div");
pageNumbers.className="pageNumbers";
pageNumbers.id="pagination";

// appending those created elements using append
container.append(title,pokemonCards,list,pageNumbers);
document.body.append(container);




const pokemon_area = document.getElementById("pokemon-area");
const pokemon_count = 50;  // default count of cards to be displayed, Display 50 Pokemons is my task

// Lopping and calling FetchPokemon() function for desired count.
const fetchPokemonApi = async () => {
    for(let i=1; i<=pokemon_count; i++) 
        await fetchPokemon(i);
};

// Fetching pokemon api using await/async method
const fetchPokemon = async (id)=>{
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const response = await fetch(url);
        const pokemon = await response.json();
        createPokemonCards(pokemon);
    } catch (error) {
        console.error(error);
    }
    
};

// Creating pokemons using the fetched data + counts.
function createPokemonCards(pokemon){
    const pokemonElement = document.createElement("div");
    pokemonElement.classList.add("pokemon");
// First letter of pokemon name must be an Uppercase
    const name = pokemon.name[0].toUpperCase()+pokemon.name.slice(1);


// fetching abilities data 
    let abilitiesDiv=document.createElement("div");
    abilitiesDiv.className="abilities";      
    let abilitiesHtml= ``;   
      for(i=0;i<pokemon.abilities.length;i++){
          abilitiesHtml+= `<small class="abilities">${pokemon.abilities[i].ability.name}</small><br>`;
      }

// fetching moves data and showing 3 primary moves to display
    let movesList = document.createElement("div");
    movesList.className="moves";   
    let movesHtml= ``;
    for(j=0;j<3;j++){
        movesHtml += `<small class="moves"> ${pokemon.moves[j].move.name} </small>`;
    }
    

    const pokemonInnerHtml = `
        <div class="img-Pokemon">
        <img src="${pokemon.sprites.other.dream_world.front_default}"
        alt = "${name}" /> 
        </div>
        <div class="details" id="details">
            <span class="number">${pokemon.id.toString().padStart(3, '0')}</span>
            <h3 class ="name">${name}</h3>
            <small class="weight">Weight: ${pokemon.weight} kgs</small>
            <div id="pokemon-abilities"><div class="abilitiesDiv"><small>Abilities: </small>${abilitiesHtml}</div></div>
            <div id="pokemon-moves"><small>Moves: </small> ${movesHtml} </div>
        </div>
    `;

    pokemonElement.innerHTML=pokemonInnerHtml;
    pokemon_area.appendChild(pokemonElement);


}

fetchPokemonApi(); 
