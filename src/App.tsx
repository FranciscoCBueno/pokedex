import './App.css';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { PokemonProvider } from './context/PokemonContext';

function App() {
  return (
    <PokemonProvider>
      <Navbar/>
      <Outlet/>
    </PokemonProvider>
  );
}

export default App;