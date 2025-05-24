import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './Login.css';


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();



    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const formData = new URLSearchParams();
            formData.append("username", username);
            formData.append("password", password);

            await axios.post('/api/login', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                withCredentials: true
            });

            // If login successful, navigate to dashboard
            navigate('/user/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            setError(error.response?.data || "Invalid username or password");
        }
    };

return (
    <>
        <div className="login-container">
            
            <form onSubmit={handleLogin}>
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