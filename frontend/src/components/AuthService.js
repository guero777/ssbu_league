// src/services/AuthService.js
export const authService = {
    async getUserRole() {
        try {
            const response = await fetch('/api/user/get-role', {
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
        const response = await fetch('/api/login', {
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