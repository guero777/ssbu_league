// Determine the API base URL based on the current environment
const getApiBaseUrl = () => {
    // Always use HTTP for local development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:8080';
    }
    
    // For production environment
    if (window.location.hostname === 'ssbu.org') {
        return 'https://ssbu.org';
    }
    
    // Default fallback - use HTTPS if not localhost
    return window.location.protocol + '//' + window.location.hostname;
};

export const API_BASE_URL = getApiBaseUrl();
