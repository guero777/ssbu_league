import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import AuthButton from '../components/common/AuthButton';
import { API_BASE_URL } from '../config';

const ProtectedLayout = ({ children }) => {
  const { userRole, username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      
      if (response.ok) {
        logout();
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isProfileOrAdmin = window.location.pathname.includes('/profile') || window.location.pathname.includes('/admin');

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="border-b backdrop-blur-sm border-red-900/50 border-b-[2px] p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left side navigation */}
          <div className="flex gap-2 md:gap-4 items-center">
            {isProfileOrAdmin ? (
              <AuthButton onClick={() => navigate(-1)} className="px-3 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </AuthButton>
            ) : (
              <>
                <AuthButton onClick={() => navigate('/user/profile')} className="text-sm md:text-base">
                  Profile
                </AuthButton>
                {userRole === 'ADMIN' && (
                  <AuthButton onClick={() => navigate('/admin/panel')} className="text-sm md:text-base">
                    Admin
                  </AuthButton>
                )}
              </>
            )}
          </div>

          {/* Right side - Logout */}
          <AuthButton onClick={handleLogout} className="text-sm md:text-base">
            Logout
          </AuthButton>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default ProtectedLayout;
