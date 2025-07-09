import React from "react";
import { useContext } from "react";
import { PokemonFullDataContext } from "../../context/PokemonFullDataContext";
import { ColorUtils } from "../../utils/ColorUtils";
import '../../styles/PokemonStats.css';

export function PokemonStats() {
    const { pokemonFullData } = useContext(PokemonFullDataContext);
    const { getStatColor } = new ColorUtils();

    return (
        <div className="pokemon-stats">
            Base Stats:
            <div className="stats-list">
                {pokemonFullData ? pokemonFullData.stats.map((stat, index) => (
                    <div key={index} className="stat-item" style={getStatColor(stat.stat.name as keyof ColorUtils['statColors'])}>
                        <span className="stat-name">{stat.stat.name.toUpperCase()}</span>
                        <span className="stat-value">{stat.base_stat}</span>
                    </div>
                )): "Loading Stats"}
                <div className="stat-item" style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
                    <span className="stat-name">Total</span>
                    <span className="stat-value">{pokemonFullData ? pokemonFullData.stats.reduce((sum, stat) => sum + stat.base_stat, 0) : "Loading Total"}</span>
                </div>
                <div className="physical-stats">
                    <div className="physical-stat-item">
                        <span className="physical-stat-name">Height: </span>
                        <span className="physical-stat-value">{pokemonFullData ? (pokemonFullData.height / 10).toFixed(1) : "Loading"} m</span>
                    </div>
                    <hr className='separator'/>
                    <div className="physical-stat-item">
                        <span className="physical-stat-name">Weight: </span>
                        <span className="physical-stat-value">{pokemonFullData ? (pokemonFullData.weight / 10).toFixed(1) : "Loading"} kg</span>
                    </div>
                </div>
            </div>
        </div>
    );
}