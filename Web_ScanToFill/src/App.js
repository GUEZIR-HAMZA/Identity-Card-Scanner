import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './component/login';
import Mid from './component/middle';
import Navbar from './component/navbar';
import Footer from './component/footer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginForm onLogin={() => setIsLoggedIn(true)} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/main"
          element={
            
              <div>
                <Navbar />
                <Mid />
             
              </div>
           
          }
          
        />
        
      </Routes>
    </Router>
  );
}

export default App;
