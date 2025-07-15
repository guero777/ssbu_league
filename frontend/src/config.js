// Determine the API base URL based on the current environment
const getApiBaseUrl = () => {
    // Always use HTTP for local development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:8080';
    }
    
    // For production environment
    if (window.location.hostname === '173.212.222.16') {
        return 'http://173.212.222.16:8080';
    }

    // For production environment
    if (window.location.hostname === 'ssbu.org') {
        return 'https://ssbu.org';
    }
    
    // Default fallback
    return 'http://' + window.location.hostname + ':8080';
};

export const API_BASE_URL = getApiBaseUrl();
