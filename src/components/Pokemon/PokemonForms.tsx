import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PokemonFullDataContext } from "../../context/PokemonFullDataContext";
import { ColorUtils } from "../../utils/ColorUtils";
import "../../styles/PokemonForms.css";

export function PokemonForms() {
    const { pokemonFullData } = useContext(PokemonFullDataContext);
    const [forms, setForms] = useState<{ is_default: boolean, pokemon: { name: string; url: string } }[]>([]);
    const [formSprites, setFormSprites] = useState<{ [name: string]: string }>({});
    const [formTypes, setFormTypes] = useState<{ [name: string]: string[] }>({});
    const navigate = useNavigate();
    const { getTypeColor } = new ColorUtils();

    const getForms = async () => {
        try {
            const response = await axios.get(pokemonFullData.species.url);
            const formsData = response.data.varieties;
            setForms(formsData);
        } catch (error) {
            console.error("Error fetching forms data:", error);
        }
    };

    useEffect(() => {
        if (pokemonFullData && pokemonFullData.species && pokemonFullData.species.url) {
            getForms();
        }
    }, [pokemonFullData]);

    useEffect(() => {
        const fetchSpritesAndTypes = async () => {
            const sprites: { [name: string]: string } = {};
            const types: { [name: string]: string[] } = {};
            await Promise.all(
                forms.map(async (form) => {
                    const result = await axios.get(form.pokemon.url);
                    sprites[form.pokemon.name] = result.data.sprites.front_default || "URL not found";
                    types[form.pokemon.name] = result.data.types.map((t: any) => t.type.name);
                })
            );
            setFormSprites(sprites);
            setFormTypes(types);
        };
        if (forms.length > 0) {
            fetchSpritesAndTypes();
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
                            <div className="form-types">
                                {formTypes[form.pokemon.name]?.map((type) => (
                                    <span key={type} className="pokemon-type" style={getTypeColor(type as keyof ColorUtils['typeColors'])}>
                                        {type.toUpperCase()}
                                    </span>
                                ))}
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