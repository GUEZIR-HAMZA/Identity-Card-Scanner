// Navbar.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './navbar.css'; // Import your existing CSS file
import uploadImg from '../ressources/03e88eaa-dbb7-435e-a8f8-8bed603b891d-removebg-preview.png';

const Navbar = () => {
  const navigate = useNavigate(); // Initialize navigate from useNavigate

  const handleLogout = () => {
    // Perform any logout logic here
    // For now, let's navigate to the /login route
    navigate('/login');
  };

  return (
    <div className='nav'>
    
    <img src={uploadImg} alt="upload" className='logo'  />
    <h2>Scan To Fill</h2>
  </div>



  );
}

export default Navbar;
