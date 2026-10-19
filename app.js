
const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=20";

const container = document.getElementById("cards-container");
const mensaje = document.getElementById("mensaje");

async function showPokemon() {

    try {

        const respuesta = await fetch(API_URL);
        const datos = await respuesta.json();

        let output = "";

        for (const pokemon of datos.results) {

            const respuestaPokemon = await fetch(pokemon.url);
            const detallePokemon = await respuestaPokemon.json();

            const nombre = detallePokemon.name;
            const numero = detallePokemon.id;
            const imagen = detallePokemon.sprites.other["official-artwork"].front_default
                || detallePokemon.sprites.front_default;

            const tipos = detallePokemon.types
                .map(tipo => tipo.type.name)
                .join(", ");

            output += `
                <div class="card">

                    <img src="${imagen}" alt="${nombre}">

                    <h2>${nombre}</h2>

                    <p>N.º ${numero}</p>

                    <p>Tipo: ${tipos}</p>

                    <button onclick="showDetails(${numero})">
                        Ver detalles
                    </button>

                </div>
            `;
        }

        container.innerHTML = output;
        mensaje.textContent = "Se encontraron 20 Pokémon.";

    } catch (error) {

        mensaje.textContent =
            "No se pudieron cargar los Pokémon. Revisa tu conexión e inténtalo de nuevo.";

        console.error("Error al consultar PokéAPI:", error);

    }
}

function showDetails(id) {
    window.location.href = `detalle.html?id=${id}`;
}

document.addEventListener("DOMContentLoaded", showPokemon);
