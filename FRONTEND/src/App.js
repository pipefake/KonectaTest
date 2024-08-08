
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Registro from './components/Registro';
import Inicio from './components/Inicio';
import ProtectedRoute from './components/ProtectectedRoute';




function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<Registro />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/inicio' element={<Inicio />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
