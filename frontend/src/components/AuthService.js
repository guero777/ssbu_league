// src/services/AuthService.js
export const authService = {
    async getUserRole() {
        const response = await fetch('http://localhost:8080/api/user/getRole', {
            credentials: 'include'
        });
        return await response.text();
    }
};