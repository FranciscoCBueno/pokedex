import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PokemonFullDataContext } from "../../context/PokemonFullDataContext";
import "../../styles/PokemonForms.css";

export function PokemonForms() {
    const { pokemonFullData } = useContext(PokemonFullDataContext);
    const [forms, setForms] = useState<{ is_default: boolean, pokemon: { name: string; url: string } }[]>([]);
    const [formSprites, setFormSprites] = useState<{ [name: string]: string }>({});
    const navigate = useNavigate();

    const getForms = async () => {
        try {
            const response = await axios.get(pokemonFullData.species.url);
            const formsData = response.data.varieties;
            setForms(formsData);
        } catch (error) {
            console.error("Error fetching forms data:", error);
        }
    };

    const getFormSprite = async(url: string) => {
        const result = await axios.get(url);
        const spriteUrl = result.data.sprites.front_default;
        return spriteUrl ? spriteUrl : "URL not found";
    };

    useEffect(() => {
        if (pokemonFullData && pokemonFullData.species && pokemonFullData.species.url) {
            getForms();
        }
    }, [pokemonFullData]);

    useEffect(() => {
        const fetchSprites = async () => {
            const sprites: { [name: string]: string } = {};
            await Promise.all(
                forms.map(async (form) => {
                    const sprite = await getFormSprite(form.pokemon.url);
                    sprites[form.pokemon.name] = sprite;
                })
            );
            setFormSprites(sprites);
        };
        if (forms.length > 0) {
            fetchSprites();
        }
    }, [forms]);

    return (
        forms.length > 1 ? (
            <div className="pokemon-forms">
                Alternate Forms:
                <div className="forms-list">
                    {forms.map((form) => (
                        !form.is_default && (
                        <div key={form.pokemon.name} className="form-item" onClick={() => navigate(`/pokemon/${form.pokemon.name}`)}>
                            <div className="form-sprite">
                                <img src={formSprites[form.pokemon.name] || "no url"} alt={form.pokemon.name} />
                            </div>
                            <div className="form-name">
                                {form.pokemon.name.toUpperCase().split('-').join(' ')}
                            </div>
                        </div>
                        )
                    ))}
                </div>
            </div>
        ) : (
            <div className="no-forms"></div>
        )
    );
}