
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './layouts/Home';
import Login from './layouts/Login';
import Registro from './layouts/Registro';
import Inicio from './layouts/Inicio';
import ProtectedRoute from './layouts/ProtectectedRoute';
import Empleados from './layouts/Empleados';
import RegistrarEmpleado from './layouts/RegistrarEmpleado';




function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<Registro />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/inicio' element={<Empleados />} />
          <Route path='/inicio/agregarEmpleado' element={<RegistrarEmpleado />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
