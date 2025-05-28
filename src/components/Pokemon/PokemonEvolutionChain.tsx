import React, { useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { PokemonFullDataContext } from "../../context/PokemonFullDataContext";
import { ColorUtils } from "../../utils/ColorUtils";
import { PokemonData } from "../../types/PokemonData";

export function PokemonEvolutionChain() {
    const { pokemonFullData } = useContext(PokemonFullDataContext);
    const [evolutionChain, setEvolutionChain] = useState<PokemonData[]>([]);
    const { getTypeColor } = new ColorUtils();

    const getEvolutionChain = useCallback(async () => {
        const speciesUrl = pokemonFullData.species.url;
        try {
            const speciesResponse = await axios.get(speciesUrl);
            const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
            const evolutionChainResponse = await axios.get(evolutionChainUrl);
            const chain = evolutionChainResponse.data.chain;

            const evolutions: PokemonData[] = [];
            let currentEvolution = chain;

            while (currentEvolution) {
                const urlParts = currentEvolution.species.url.split("/").filter(Boolean);
                const pokemonId = urlParts[urlParts.length - 1];
                const pokemonData: PokemonData = {
                    id: pokemonId,
                    name: currentEvolution.species.name,
                    types: [],
                    species: { name: "", url: "" },
                    sprites: { front_default: "", front_shiny: "" }
                };
                const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
                Object.assign(pokemonData, pokemonResponse.data);
                evolutions.push(pokemonData);
                currentEvolution = currentEvolution.evolves_to[0];
            }
            setEvolutionChain(evolutions);
        } catch (error) {
            console.error("Error fetching evolution chain:", error);
        }
    }, [pokemonFullData.species.url]);

    useEffect(() => {
        if (pokemonFullData && pokemonFullData.species && pokemonFullData.species.url) {
            getEvolutionChain();
        }
    }, [pokemonFullData, getEvolutionChain]);

    return (
        <div className="pokemon-evolution-chain">
            { evolutionChain.map((pokemon) => (
                <div className="evolution-pokemon" key={pokemon.id}>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} className="evolution-sprite"/>
                    <h3 className="evolution-name">{pokemon.name.toUpperCase()}</h3>
                    <p className="evolution-id">#{pokemon.id}</p>
                    <div className="evolution-types">
                        {pokemon.types.map((type) => (
                            <div key={type.slot} className="pokemon-type" style={getTypeColor(type.type.name as keyof ColorUtils['typeColors'])}>
                                {type.type.name.toUpperCase()}
                            </div>
                        ))}
                    </div>
                </div>
            )) }
        </div>
    );
}