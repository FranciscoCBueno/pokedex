import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { PokemonFullDataContext } from "../../context/PokemonFullDataContext";
import { PokemonLocation } from "../../types/PokemonLocation";
import { ColorUtils } from "../../utils/ColorUtils";
import "../../styles/PokemonLocationsList.css";

export function PokemonLocationsList() {
    const { pokemonFullData } = useContext(PokemonFullDataContext);
    const [locations, setLocations] = useState<PokemonLocation[]>([]);
    const { getGameColor } = new ColorUtils();

    const generationOrder = [
        "red", "blue", "yellow",
        "gold", "silver", "crystal",
        "ruby", "sapphire", "emerald", "firered", "leafgreen",
        "diamond", "pearl", "platinum", "heartgold", "soulsilver",
        "black", "white", "black-2", "white-2",
        "x", "y", "omega-ruby", "alpha-sapphire",
        "sun", "moon", "ultra-sun", "ultra-moon", "lets-go-pikachu", "lets-go-eevee",
        "sword", "shield", "brilliant-diamond", "shining-pearl", "legends-arceus",
        "scarlet", "violet"
    ];

    function capitalizeWords(str: string) {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    }

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const locationPromises = pokemonFullData.location_area_encounters ? 
                [axios.get(pokemonFullData.location_area_encounters).then(res => res.data)] : [];
                const locationsData = await Promise.all(locationPromises);
                setLocations(locationsData[0]);
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };
        if (pokemonFullData && pokemonFullData.location_area_encounters) {
            fetchLocations();
        }
    }, [pokemonFullData]);

    return (
        <div className="locations-list">
            <div className="locations-header">
                <h2 className="locations-list-title">Locations</h2>
                <p>Note: The chance percentages have weird spreads and it may seem like some are repeated</p>
            </div>
            {locations.length > 0 ? (
                locations.slice().sort((locA, locB) => {
                    const getEarliestIndex = (loc: PokemonLocation) => {
                        const indices = loc.version_details
                            .map(vd => generationOrder.indexOf(vd.version.name))
                            .filter(idx => idx !== -1);
                        return indices.length > 0 ? Math.min(...indices) : 999;
                    };
                    return getEarliestIndex(locA) - getEarliestIndex(locB);
                }).map((location, index) => (
                    <div key={index} className="location-item">
                        <h3 className="location-name">{capitalizeWords(location?.location_area?.name?.replace(/-/g, " "))}</h3>
                        {location?.version_details?.map((detail, idx) => (
                            <div key={idx} className="version-detail">
                                <div className="version-detail-header">
                                    <p className="version-name" style={getGameColor(detail.version.name as keyof ColorUtils['gameColors'])}>
                                        {(detail.version.name.replace(/-/g, " ")).toUpperCase()}
                                    </p>
                                    <p className="version-rarity">Encounter Potential: {detail.max_chance}</p>
                                </div>
                                <div className="encounter-detail-container">
                                    {detail?.encounter_details?.map((encounter, eIdx) => (
                                        <div key={eIdx} className="encounter-detail">
                                            <p>Method: {capitalizeWords(encounter.method.name.replace(/-/g, " "))}</p>
                                            <p>Chance: {encounter.chance}%</p>
                                            <p>Level Range: {encounter.min_level} - {encounter.max_level}</p>
                                            {encounter.condition_values.length > 0 && (
                                                <p>Conditions: {encounter.condition_values.map(c => capitalizeWords(c.name.replace(/-/g, " "))).join(", ")}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p className="no-locations">No location data available.</p>
            )}
        </div>
    );
}