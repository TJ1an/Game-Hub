import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import React, {useState, useEffect} from 'react';
import {Home, Games, GameDetails, Login, Register} from './pages';



function App() {
  return (
    <ChakraProvider>
    <Router>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/games" element = {<Games/>}/>
        <Route path = "/games/:id" element = {<GameDetails/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/register" element = {<Register/>}/>
      </Routes>
    </Router>
    </ChakraProvider>
  );
}

export default App;
