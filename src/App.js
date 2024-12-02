import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Movielist from './Components/Movielist';
import Moviedetail from './Components/Moviedetail';
import Addtocart from './Components/Addtocart';
import Viewcart from './Components/Viewcart';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Movielist />} />
          <Route path="/Moviedetail" element={<Moviedetail />} />
          <Route path="/Addtocart" element={<Addtocart />} />
          <Route path="/Viewcart" element={<Viewcart />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
