import React from "react";
import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from "../App";
import { Home } from "../pages/Home";
import { Pokemon } from "../pages/Pokemon";
import { PokemonFullDataProvider } from "../context/PokemonFullDataContext";

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
                        <Pokemon/>
                    </PokemonFullDataProvider>
                )
            }
        ]
    }
])