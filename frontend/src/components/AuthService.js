// src/services/AuthService.js
import { API_BASE_URL } from '../config';

export const authService = {
    async getUserInfo() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/user/get-info`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    return { role: 'ANONYMOUS', username: null };
                }
                throw new Error('Failed to get user info');
            }

            const data = await response.json();
            return { role: data.role, username: data.username };
        } catch (error) {
            console.error('Error getting user info:', error);
            return { role: 'ANONYMOUS', username: null };
        }
    },

    async getUserRole() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/user/get-role`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to get user role');
            }
            
            return await response.text();
        } catch (error) {
            console.error('Error getting user role:', error);
            return 'ANONYMOUS';
        }
    },

    async login(username, password) {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        if (!response.ok) {
            throw new Error('Login failed');
        }
        
        return this.getUserRole();
    }
};