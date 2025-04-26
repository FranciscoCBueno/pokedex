import "../styles/PokemonCard.css";
import React from "react";
import { PokemonList } from "../pages/Home";

interface PokemonCardItems {
    pokemonList: PokemonList;
}

export function PokemonCard({ pokemonList }: PokemonCardItems) {
    return (
        <div className="card-container">
            {pokemonList ? pokemonList.PokemonData.map((pokeitem) => 
            (<div key={pokeitem.id}>
                <p>{pokeitem.id} {pokeitem.name}</p>
                <img src={pokeitem.sprites.front_default} alt={pokeitem.name+" sprite"} />
            </div>
            )) : "Loading Pokedex"}
        </div>
    );
}