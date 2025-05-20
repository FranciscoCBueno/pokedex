import React, {useState, useEffect, useCallback} from 'react';
import "../styles/Pokemon.css";
import axios from 'axios';
import { PokemonFullData } from '../types/PokemonFullData';
import { TypeDamageRelations } from '../types/TypeDamageRelations';
import { useNavigate, useParams } from 'react-router-dom';
import back from '../assets/back.svg';
import star from '../assets/star.svg';

export function Pokemon() {
    const { id } = useParams<{ id: string }>();
    const [pokemonData, setPokemonData] = useState<PokemonFullData | null>(null);
    const [pokedexEntry, setPokedexEntry] = useState<string | null>(null);
    const [damageRelations, setDamageRelations] = useState<TypeDamageRelations | null>(null);
    const [shiny, setShiny] = useState(false);
    const navigate = useNavigate();
    const typeColours = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    };
    const statColors = {
        hp: 'rgba(255, 0, 0, 0.5)',
        attack: 'rgba(0, 0, 255, 0.5)',
        defense: 'rgba(0, 128, 0, 0.5)',
        'special-attack': 'rgba(255, 165, 0, 0.5)',
        'special-defense': 'rgba(128, 0, 128, 0.5)',
        speed: 'rgba(255, 255, 0, 0.5)'
    }

    const getTypeColor = (type: keyof typeof typeColours) => {
        return {backgroundColor: typeColours[type] || '#FFF'};
    }

    const getDamageRelations = useCallback(async (types: PokemonFullData["types"]) => {
        try {
            const typeData = await Promise.all(types.map(t => axios.get(t.type.url).then(res => res.data.damage_relations)));
            const getTypeNames = (arr: { name: string }[]) => arr.map(t => t.name);
            const combined = {
                double_from: typeData.flatMap(d => getTypeNames(d.double_damage_from)),
                half_from: typeData.flatMap(d => getTypeNames(d.half_damage_from)),
                no_from: typeData.flatMap(d => getTypeNames(d.no_damage_from)),
                double_to: typeData.flatMap(d => getTypeNames(d.double_damage_to)),
                half_to: typeData.flatMap(d => getTypeNames(d.half_damage_to)),
                no_to: typeData.flatMap(d => getTypeNames(d.no_damage_to)),
            };

            const filtered = {
                double_from: combined.double_from.filter(t => !combined.no_from.includes(t)),
                half_from: combined.half_from.filter(t => !combined.no_from.includes(t)),
                double_to: combined.double_to.filter(t => !combined.no_to.includes(t)),
                half_to: combined.half_to.filter(t => !combined.no_to.includes(t)),
            };

            const countTypes = (arr: string[]) => arr.reduce((acc, t) => ({ ...acc, [t]: (acc[t] || 0) + 1 }), {} as Record<string, number>);
            const doubleFromCount = countTypes(filtered.double_from);
            const halfFromCount = countTypes(filtered.half_from);
            const doubleToCount = countTypes(filtered.double_to);
            const halfToCount = countTypes(filtered.half_to);

            const cancelOpposing = (damage: Record<string, number>, resist: Record<string, number>) => {
                const result = { ...damage };
                for (const t in resist) {
                    if (result[t]) {
                        const min = Math.min(result[t], resist[t]);
                        result[t] -= min;
                        if (result[t] === 0) delete result[t];
                    }
                }
                return result;
            };

            const finalDoubleFrom = cancelOpposing(doubleFromCount, halfFromCount);
            const finalHalfFrom = cancelOpposing(halfFromCount, doubleFromCount);
            const finalDoubleTo = cancelOpposing(doubleToCount, halfToCount);
            const finalHalfTo = cancelOpposing(halfToCount, doubleToCount);

            const createDamageList = (types: Record<string, number>, baseMultiplier: string, enhancedMultiplier: string) => 
                Object.entries(types)
                    .filter(([_, count]) => count > 0)
                    .map(([name]) => ({
                        name,
                        multiplier: types[name] >= 2 ? enhancedMultiplier : baseMultiplier
                    }));

            setDamageRelations({
                double_damage_from: createDamageList(finalDoubleFrom, 'x2', 'x4'),
                half_damage_from: createDamageList(finalHalfFrom, '×½', '×¼'),
                no_damage_from: [...new Set(combined.no_from)].map(name => ({ name, multiplier: 'x0' })),
                double_damage_to: createDamageList(finalDoubleTo, 'x2', 'x4'),
                half_damage_to: createDamageList(finalHalfTo, '×½', '×¼'),
                no_damage_to: [...new Set(combined.no_to)].map(name => ({ name, multiplier: 'x0' })),
            });
        } catch (error) {
            console.error("Error fetching damage relations:", error);
        }
    }, []);

    const fetchPokemonFullData = useCallback(async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemonData(response.data);
        } catch (error) {
            console.error("Error fetching Pokemon data:", error);
        }
    }, [id]);

    const getPokedexEntry = useCallback(() => {
        if (pokemonData) {
            axios.get(pokemonData.species.url).then((response) => {
                const entries = response.data.flavor_text_entries;
                const englishEntries = entries.filter(
                    (entry: { language: { name: string; } }) => entry.language.name === 'en'
                );
    
                if (englishEntries.length > 0) {
                    const latestEntry = englishEntries[englishEntries.length - 1];
                    setPokedexEntry(latestEntry.flavor_text.replace(/[^a-zA-Z0-9.,' ]/g, ' ').replace(/\s+/g, ' ').trim());
                }
            })
        }
    }, [pokemonData]);

    useEffect(() => {
        if (id) {
            fetchPokemonFullData();
        }
    }, [id, fetchPokemonFullData]);

    useEffect(() => {
        if (pokemonData) {
            getPokedexEntry();
            getDamageRelations(pokemonData.types);
        }
    }, [pokemonData, getPokedexEntry , getDamageRelations]);

    return (
        <div className="pokemon-container">
            <header className='pokemon-header'>
                <button className="back-btn" onClick={() => navigate('/home')}>
                    <img src={back} alt='back icon' className='back-icon' height='20px'/> Return
                </button>
                <div className="pokemon-identification">
                    <div className="pokemon-types">
                        {pokemonData ? pokemonData.types.map((type, index) => (
                            <div key={index} className="pokemon-type" style={getTypeColor(type.type.name as keyof typeof typeColours)}>
                                {type.type.name.toUpperCase()}
                            </div>
                        )) : "Loading Types"}
                    </div>
                    <div className='pokemon-name'>{pokemonData ? '#'+pokemonData.id+' '+pokemonData.name.toUpperCase() 
                    : "Loading Data"}</div>
                </div>
            </header>
            <div className="pokemon-info">
                <div className="sprite-container">
                    <button className='shiny-button' onClick={() => shiny ? setShiny(false) : setShiny(true)}>
                        <img className='star-icon' src={star} alt='switch to shiny button'/> Shiny</button>
                    {pokemonData && pokemonData.sprites.other['official-artwork'].front_default ? (
                        <div className="pokemon-sprite">
                            <img className='sprite-img' src={shiny ? pokemonData.sprites.other['official-artwork'].front_shiny : 
                            pokemonData.sprites.other['official-artwork'].front_default} alt={`${pokemonData.name} sprite`} />
                        </div>
                    ) : (
                        <div className="loading-sprite">Loading...</div>
                    )}
                </div>
                <div className="pokemon-details">
                    <h2 className="pokedex-entry">{pokedexEntry}</h2>
                    <div className="pokemon-stats">
                        Stats:
                        <div className="stats-list">
                            {pokemonData ? pokemonData.stats.map((stat, index) => (
                                <div key={index} className="stat-item" style={{backgroundColor: statColors[stat.stat.name as keyof typeof statColors]}}>
                                    <span className="stat-name">{stat.stat.name.toUpperCase()}</span>
                                    <span className="stat-value">{stat.base_stat}</span>
                                </div>
                            )): "Loading Stats"}
                            <div className="stat-item" style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
                                <span className="stat-name">Total</span>
                                <span className="stat-value">{pokemonData ? pokemonData.stats.reduce((sum, stat) => sum + stat.base_stat, 0) : "Loading Total"}</span>
                            </div>
                            <div className="physical-stats">
                                <div className="physical-stat-item">
                                    <span className="physical-stat-name">Height: </span>
                                    <span className="physical-stat-value">{pokemonData ? (pokemonData.height / 10).toFixed(1) : "Loading"} m</span>
                                </div>
                                <hr className='separator'/>
                                <div className="physical-stat-item">
                                    <span className="physical-stat-name">Weight: </span>
                                    <span className="physical-stat-value">{pokemonData ? (pokemonData.weight / 10).toFixed(1) : "Loading"} kg</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="type-effectiveness">
                        <div className="weaknesses-list">
                            Weaknesses:
                            {damageRelations ? damageRelations.double_damage_from.map((type, slot) => (
                                <div key={slot} className="pokemon-type" style={getTypeColor(type.name as keyof typeof typeColours)}>
                                    {type.name.toUpperCase()} <span className="multiplier" style={type.multiplier === "×½" || type.multiplier === "×¼" ? 
                                        {fontFamily: "Roboto, sans-serif"} : {}}>{type.multiplier}</span>
                                </div>
                            )) : "Loading Weaknesses"}
                        </div>
                        <div className="resistances-list">
                            Resistances:
                            {damageRelations ? damageRelations.half_damage_from.map((type, slot) => (
                                <div key={slot} className="pokemon-type" style={getTypeColor(type.name as keyof typeof typeColours)}>
                                    {type.name.toUpperCase()} <span className="multiplier" style={type.multiplier === "×½" || type.multiplier === "×¼" ? 
                                        {fontFamily: "Roboto, sans-serif"} : {}}>{type.multiplier}</span>
                                </div>
                            )) : "Loading Resistances"}
                        </div>
                        <div className="immunities-list">
                            Immunities:
                            {damageRelations ? damageRelations.no_damage_from.map((type, slot) => (
                                <div key={slot} className="pokemon-type" style={getTypeColor(type.name as keyof typeof typeColours)}>
                                    {type.name.toUpperCase()}
                                </div>
                            )) : "Loading Immunities"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}