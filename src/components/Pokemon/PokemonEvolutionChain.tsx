import React, { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PokemonFullDataContext } from "../../context/PokemonFullDataContext";
import { ColorUtils } from "../../utils/ColorUtils";
import { EvolutionChain } from "../../types/EvolutionChain";
import { PokemonData } from "../../types/PokemonData";
import "../../styles/PokemonEvolutionChain.css";

export function PokemonEvolutionChain() {
    const { pokemonFullData } = useContext(PokemonFullDataContext);
    const [ evolutionChain, setEvolutionChain ] = useState<EvolutionChain | null>(null);
    const [ evolutionChainList, setEvolutionChainList ] = useState<PokemonData[]>([]);
    const { getTypeColor } = new ColorUtils();
    const navigate = useNavigate();

    const getEvolutionChain = useCallback(async () => {
        const speciesUrl = pokemonFullData.species.url;
        try {
            const speciesResponse = await axios.get(speciesUrl);
            const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
            const evolutionChainResponse = await axios.get(evolutionChainUrl);
            setEvolutionChain(new EvolutionChain(evolutionChainResponse.data));
            let evolutionData : PokemonData[] = await EvolutionChain.getList(evolutionChainResponse.data);
            evolutionData = evolutionData.filter(
                (item: any) => item && item.name && item.types
            );
            setEvolutionChainList(evolutionData);
        } catch (error) {
            console.error("Error fetching evolution chain:", error);
        }
    }, [pokemonFullData.species.url]);

    const getTypesFor = (name: string) => {
        const pokemon = evolutionChainList.find(p => p.name === name);
        return pokemon ? pokemon.types : [];
    };

    const getSpritesFor = (name: string) => {
        const pokemon = evolutionChainList.find(p => p.name === name);
        return pokemon ? pokemon.sprites.front_default : "";
    }

    useEffect(() => {
        if (pokemonFullData && pokemonFullData.species && pokemonFullData.species.url) {
            getEvolutionChain();
        }
    }, [pokemonFullData, getEvolutionChain]);

    return (
        evolutionChain ? (
            <div className="pokemon-evolution-chain">
                <div className="evolution-pokemon" id="origin" onClick={() => navigate(`/pokemon/${evolutionChain.chain.species.name}`)}>
                    <div className="evolution-sprite">
                        <img src={getSpritesFor(evolutionChain.chain.species.name)} alt={evolutionChain.chain.species.name} />
                    </div>
                    <div className="evolution-name">
                        {evolutionChain.chain.species.name.toUpperCase()}
                    </div>
                    <div className="evolution-types">
                        {getTypesFor(evolutionChain.chain.species.name).map((type, index) => (
                            <span key={index} className="pokemon-type" style={getTypeColor(type.type.name as keyof ColorUtils['typeColors'])}>
                                {type.type.name.toUpperCase()}
                            </span>
                        ))}
                    </div>
                </div>
                {evolutionChain.chain.evolves_to.map((evolution, index) => (
                    <div className="evolution-item" key={index}>
                        <div className="evolution-pokemon" onClick={() => navigate(`/pokemon/${evolution.species.name}`)}>
                            <div className="evolution-sprite">
                                <img src={getSpritesFor(evolution.species.name)} alt={evolution.species.name} />
                            </div>
                            <div className="evolution-name" onClick={() => navigate(`/pokemon/${evolution.species.name}`)}>
                                {evolution.species.name.toUpperCase()}
                            </div>
                            <div className="evolution-types">
                                {getTypesFor(evolution.species.name).map((type, index) => (
                                    <span key={index} className="pokemon-type" style={getTypeColor(type.type.name as keyof ColorUtils['typeColors'])}>
                                        {type.type.name.toUpperCase()}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {evolution.evolves_to.length > 0 ? 
                            <div className="evolution-subchain">
                                {evolution.evolves_to.map((subEvolution, subIndex) => (
                                    <div className="evolution-pokemon" key={subIndex} onClick={() => navigate(`/pokemon/${subEvolution.species.name}`)}>
                                        <div className="evolution-sprite">
                                            <img src={getSpritesFor(subEvolution.species.name)} alt={subEvolution.species.name} />
                                        </div>
                                        <div className="evolution-name">
                                            {subEvolution.species.name.toUpperCase()}
                                        </div>
                                        <div className="evolution-types">
                                            {getTypesFor(subEvolution.species.name).map((type, index) => (
                                                <span key={index} className="pokemon-type" style={getTypeColor(type.type.name as keyof ColorUtils['typeColors'])}>
                                                    {type.type.name.toUpperCase()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        : null}
                    </div>
                ))}
            </div>
        ) : <div>
                Evolution chain loading
            </div>
    );
}