import "./App.css";
import { Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home";
import PrivateRoute from "./components/Privateroute";
import Dashboard from "./Pages/Dashboard";
import Login  from "./Pages/Login";
import Signup from "./Pages/Signup";
import Navbar from "./components/Navbar";
import Contact from "./Pages/Contact";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="w-screen h-screen bg-richblack-900 flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/dashboard" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Dashboard />
          </PrivateRoute>
        }/>
        <Route path="/contact" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Contact />
          </PrivateRoute>
        } />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn}/>} />
      </Routes>
    </div>
  );
}

export default App;
