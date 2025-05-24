// src/services/AuthService.js
export const authService = {
    async getUserRole() {
        const response = await fetch('/api/user/get-role', {
            credentials: 'include'
        });
        return await response.text();
    }
};