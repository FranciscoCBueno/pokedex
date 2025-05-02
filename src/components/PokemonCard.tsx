import "../styles/PokemonCard.css";
import React, { useEffect, useState } from "react";
import { PokemonCardItems } from "../types/PokemonCardItems";
import ColorThief from "colorthief";
import axios from "axios";

export function PokemonCard({ pokemonData, onClick }: PokemonCardItems) {
    const colorThief = new ColorThief();
    const [isLegendary, setIsLegendary] = useState(false);
    const [isMythical, setIsMythical] = useState(false);
    const [colors, setColors] = useState<number[][] | null>(null);
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

    const getColorPallete = (url : string) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = url;
        img.onload = () => {
            setColors(colorThief.getPalette(img, 3));
        };
    }

    const getCardStyles = () => {
        if (!colors) {
            return {};
        }
        const bgColor = `rgb(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]})`;
        const borderColor = `rgb(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]})`;
        const brightness = Math.round(((colors[0][0] * 299) + (colors[0][1] * 587) + (colors[0][2] * 114)) / 1000);
        const textColor = brightness > 125 ? 'black' : 'white';
        return {
            backgroundColor: bgColor,
            borderColor: borderColor,
            color: textColor
        };
    }

    const getSpriteBgStyle = () => {
        if (!colors) {
            return {};
        }
        const brightness = Math.round(((colors[0][0] * 299) + (colors[0][1] * 587) + (colors[0][2] * 114)) / 1000);
        const bgColor = brightness > 125 ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)";
        let border = "none";
        if (isLegendary) {
            border = "2px solid gold";
        } else if (isMythical) {
            border = "2px solid magenta";
        }
        return {
            backgroundColor: bgColor,
            border: border
        };
    }

    const getTypeColor = (type: keyof typeof typeColours) => {
        return {backgroundColor: typeColours[type] || '#FFF'};
    }

    useEffect(() => {
        if (pokemonData) {
            axios.get(pokemonData.species.url)
            .then((response) => {
                setIsLegendary(response.data.is_legendary);
                setIsMythical(response.data.is_mythical);
            });
        }
    }, [pokemonData]);

    return (
        <div className="card-container" onClick={onClick}>
            <div className="card" onLoad={() => getColorPallete(pokemonData.sprites.front_default)} style={getCardStyles()}>
                <div className="card-header">
                    <div className="id_number">{'#'+pokemonData.id}</div>
                </div>
                <div className="sprite" style={getSpriteBgStyle()}>
                    <img className="sprite-img" src={pokemonData.sprites.front_default} 
                    alt={pokemonData.name+" sprite"} />
                </div>
                <h2 className="name">{pokemonData.name.toUpperCase()}</h2>
                <div className="types">
                    {pokemonData.types.map((types) => (<span className="type" key={types.slot} 
                    style={getTypeColor(types.type.name as keyof typeof typeColours)}>{types.type.name.toUpperCase()}</span>))}
                </div>
            </div>
        </div>
    );
}