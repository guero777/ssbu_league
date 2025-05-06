import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


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

            await axios.post('http://localhost:8080/login', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            });

            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            setError("Invalid username or password");
        }
    };

    return (
        <>
            <div className="login-container">
                <h2 className={"login-header"}> Log into your account </h2>
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
                    <button type={"submit"} className={"login-button"}>
                        Sign in
                    </button>
                </form>
            </div>
        </>
    );

};

export default Login;