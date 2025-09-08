import React from "react";
import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from "../App";
import { Home } from "../pages/Home";
import { Pokemon } from "../pages/Pokemon";
import { About } from "../pages/About";
import { PokemonFullDataProvider } from "../context/PokemonFullDataContext";
import { PokemonSpeciesDataProvider } from "../context/PokemonSpeciesDataContext";

export const Routes = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                element: <Navigate to="/home" replace/>
            },
            {
                path: '/home',
                element: <Home/>
            },
            {
                path: '/pokemon/:id',
                element: (
                    <PokemonFullDataProvider>
                        <PokemonSpeciesDataProvider>
                            <Pokemon/>
                        </PokemonSpeciesDataProvider>
                    </PokemonFullDataProvider>
                )
            },
            {
                path: '/about',
                element: <About/>
            }
        ]
    }
])