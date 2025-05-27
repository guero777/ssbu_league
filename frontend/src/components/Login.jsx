import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from "axios";
import { API_BASE_URL } from '../config';
import './Login.css';


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const { refreshAuthInfo } = useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/api/login`, 
                `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    withCredentials: true
                }
            );

            if (response.status === 200) {
                // Login successful
                await refreshAuthInfo();
                const from = location.state?.from?.pathname || '/user/dashboard';
                navigate(from, { replace: true });
                return;
            }
            setError('Invalid credentials');
        } catch (error) {
            console.error('Login error:', error);
            setError(error.response?.data?.error || 'Invalid credentials');
        }
    };

return (
    <>
        <div className="login-container">
            
            <form onSubmit={handleSubmit}>
                <div className={"username-field"}>
                    <input
                        type="text"
                        id={"username"}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div className={"password-field"}>
                    <input
                        type="password"
                        id={"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type={"submit"} className={"login-submit-button"}>
                    Sign in
                </button>
            </form>
        </div>
    </>
);

};

export default Login;