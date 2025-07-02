import React, { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PokemonFullDataContext } from "../../context/PokemonFullDataContext";
import { ColorUtils } from "../../utils/ColorUtils";
import { EvolutionChain, Chain } from "../../types/EvolutionChain";
import { PokemonData } from "../../types/PokemonData";
import { PokemonForms } from "./PokemonForms";
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

    function getTypesFor (name: string) {
        const pokemon = evolutionChainList.find(p => p.name === name);
        return pokemon ? pokemon.types : [];
    };

    function getSpritesFor (name: string) {
        const pokemon = evolutionChainList.find(p => p.name === name);
        return pokemon ? pokemon.sprites.front_default : "Url not found";
    }

    function getEvolutionDetails(detailsArr: Chain["evolution_details"]) {
        if (!detailsArr || detailsArr.length === 0) {
            return <div className="evolution-details">No specific requirements</div>;
        }

        const requirements: string[] = [];

        detailsArr.forEach(details => {
            if (details.trigger?.name === "trade") {
                let tradeReq = "Trade";
                if (details.held_item) {
                    tradeReq += ` while holding ${details.held_item.name}`;
                }
                if (details.trade_species) {
                    tradeReq += ` for ${details.trade_species.name}`;
                }
                requirements.push(tradeReq);
                return;
            }

            if (details.location) {
                let locReq = "Level up";
                if (details.min_level) {
                    locReq += ` at level ${details.min_level}`;
                }
                locReq += ` at ${details.location.name}`;
                requirements.push(locReq);
                return;
            }

            if (details.trigger?.name === "level-up") {
                let levelReq = "Level up";
                if (details.min_level) {
                    levelReq += ` at level ${details.min_level}`;
                }
                if (details.time_of_day && details.time_of_day !== "") {
                    levelReq += ` during ${details.time_of_day}`;
                }
                if (details.known_move) {
                    levelReq += ` knowing ${details.known_move.name}`;
                }
                if (details.known_move_type) {
                    levelReq += ` knowing a ${details.known_move_type.name}-type move`;
                }
                if (details.min_happiness) {
                    levelReq += ` with at least ${details.min_happiness} happiness`;
                }
                if (details.min_beauty) {
                    levelReq += ` with at least ${details.min_beauty} beauty`;
                }
                if (details.min_affection) {
                    levelReq += ` with at least ${details.min_affection} affection`;
                }
                if (details.needs_overworld_rain) {
                    levelReq += ` while raining`;
                }
                if (details.turn_upside_down) {
                    levelReq += ` while device is upside down`;
                }
                requirements.push(levelReq);
                return;
            }

            if (details.trigger?.name === "use-item" && details.item) {
                requirements.push(`Use ${details.item.name}`);
                return;
            }
        });

        return (
            <div className="evolution-details">
                {requirements.length > 0 ? requirements.join(" || ") : "No specific requirements"}
            </div>
        );
    }

    useEffect(() => {
        if (pokemonFullData && pokemonFullData.species && pokemonFullData.species.url) {
            getEvolutionChain();
        }
    }, [pokemonFullData, getEvolutionChain]);

    return (
        evolutionChain ? (
            <div className="pokemon-evolution-chain">
                Evolutions:
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
                <div className="evolution-primary-chain">
                    {evolutionChain.chain.evolves_to.map((evolution, index) => (
                        <div className="evolution-item" key={index}>
                            <div className="evolution-pokemon" onClick={() => navigate(`/pokemon/${evolution.species.name}`)}>
                                <div className="evolution-triggers">
                                    {evolution.evolution_details.length > 0 && getEvolutionDetails(evolution.evolution_details)}
                                </div>
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
                                            <div className="evolution-triggers">
                                                {subEvolution.evolution_details.length > 0 && getEvolutionDetails(subEvolution.evolution_details)}
                                            </div>
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
                <PokemonForms/>
            </div>
        ) : <div>
                Evolution chain loading
            </div>
    );
}