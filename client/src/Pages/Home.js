import React from 'react';
import { Link } from 'react-router-dom';
import bg from '../assets/bg.jpeg';

const Home = () => {
  return (
    <div className="relative w-full h-screen">
      <img
        src={bg}
        alt="Background"
        className="object-cover w-full h-full opacity-80"
      />
      
      
      <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40">
        <div className="text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">Welcome to Your ContactX</h1>
          <p className="text-lg mb-8">Access your Contacts with one click</p>

          <Link
            to="/dashboard" // Replace with the actual route
            className="text-2xl text-white font-bold bg-indigo-700 py-3 px-8 rounded-full transition-all transform hover:scale-105 hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 shadow-xl"
          >
            See Your Contcts Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
