import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import React, {useState, useEffect} from 'react';
import {Home} from './pages';

function App() {
  return (
    <ChakraProvider>
    <Router>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
      </Routes>
    </Router>
    </ChakraProvider>
  );
}

export default App;
