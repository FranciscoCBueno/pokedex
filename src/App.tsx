import './App.css';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar.tsx';

function App() {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  );
}

export default App;