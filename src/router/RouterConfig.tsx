import React from "react";
import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from "../App.tsx";
import { Home } from "../pages/Home.tsx";
import { Pokemon } from "../pages/Pokemon.tsx";
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
                element: <Pokemon />
            }
        ]
    }
])