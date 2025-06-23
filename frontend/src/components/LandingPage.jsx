import React from 'react';
import { useNavigate } from 'react-router-dom';
import Scoreboard from './Scoreboard';
import AuthButton from './common/AuthButton';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-repeat-x bg-center bg-cover flex-col bg-[url('/images/logoBurning.gif')]
                    lg:bg-[url('/images/logoMinimalRed.jpg')]">
      {/* Header - Fixed height */}
      <header className="border-b border-red-900/50 border-b-[3px] p-6 sm:p-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-4">
          {/* Logo/Title */}
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-white bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              SSBU League
            </h1>
          </div>
          
          {/* Auth Buttons - Stack on mobile, row on desktop */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-4">
            <AuthButton onClick={() => navigate('/login')}>Login</AuthButton>
            <AuthButton onClick={() => navigate('/register')}>Register</AuthButton>
          </div>
        </div>
      </header>

      {/* Main Content - Scrollable */}
      <main className="flex-1 overflow-auto px-4 py-6">
        <div className="max-w-7xl mx-auto h-full">
          <div className="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-red-900/50 h-full">
            <Scoreboard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
