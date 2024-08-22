
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Registration from './pages/Registration';
import Login from './pages/Login';
import Contact from './pages/Contact'
import NotFound from './pages/NotFound';
import PrivateRouter from './pages/PrivateRouter';

//dealing with the private router

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<PrivateRouter/>}>
        </Route>
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>

  );
};

export default App;
