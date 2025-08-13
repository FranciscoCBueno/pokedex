import React from "react";
import "../../styles/PokemonLocationsList.css";

export function PokemonLocationsList() {
    return (
        <div className="locations-list">
            <h2 className="locations-list-title">Locations</h2>
            <hr />
            <p className="warning">Currently PokéAPI's locations endpoint is not returning data</p>
        </div>
    );
}