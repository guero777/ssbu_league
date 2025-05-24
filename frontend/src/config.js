// Determine the API base URL based on the current environment
const getApiBaseUrl = () => {
    // If we're in development and running locally
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:8080';
    }
    
    // For production/remote environment, use the same host as the frontend
    return `http://${window.location.hostname}:8080`;
};

export const API_BASE_URL = getApiBaseUrl();
