// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from './AuthService.js';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);
    const [username, setUsername] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshAuthInfo = async () => {
        try {
            const { role, username } = await authService.getUserInfo();
            setUserRole(role);
            setUsername(username);
        } catch (error) {
            setUserRole(null);
            setUsername(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshAuthInfo();
    }, []);

    // Refresh auth info when the window regains focus
    useEffect(() => {
        const onFocus = () => refreshAuthInfo();
        window.addEventListener('focus', onFocus);
        return () => window.removeEventListener('focus', onFocus);
    }, []);

    return (
        <AuthContext.Provider value={{ userRole, username, isLoading, refreshAuthInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};