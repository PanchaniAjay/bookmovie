import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            <p className='logo'>SHOWTIME</p>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mx-auto">
              <li class="nav-item">
                <a onClick={() => navigate('/Movielist')} class="nav-link active" aria-current="page" href="/">ALL Movie List click</a>
              </li>

            </ul>
          </div>
          <div>
            <a onClick={() => navigate('/Viewcart')} href="/Viewcart" class="btn btn-primary">View Cart</a>
          </div>
        </div>
      </nav>

    </div>
  )
}
