import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import AuthButton from '../components/common/AuthButton';

const ProtectedLayout = ({ children }) => {
  const { userRole, username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
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

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="border-b backdrop-blur-sm border-red-900/50 border-b-[2px] p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left side navigation */}
          <div className="flex gap-4">
            <AuthButton onClick={() => navigate('/user/profile')}>
              Profile
            </AuthButton>
            {userRole === 'ADMIN' && (
              <AuthButton onClick={() => navigate('/admin/panel')}>
                Admin
              </AuthButton>
            )}
          </div>

          {/* Right side - Logout */}
          <AuthButton onClick={handleLogout}>
            Logout
          </AuthButton>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default ProtectedLayout;
