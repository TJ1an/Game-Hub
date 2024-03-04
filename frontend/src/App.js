import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import React, {useState, useEffect} from 'react';
import {Home, Games, GameDetails} from './pages';



function App() {
  return (
    <ChakraProvider>
    <Router>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/games" element = {<Games/>}/>
        <Route path = "/games/:id" element = {<GameDetails/>}/>
      </Routes>
    </Router>
    </ChakraProvider>
  );
}

export default App;
