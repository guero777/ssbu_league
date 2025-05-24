import {useState} from "react";
import axios from "axios";
import { API_BASE_URL } from '../config';
import {useNavigate} from "react-router-dom";
import './Register.css'

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const MINIMUM_PASSWORD_LENGTH = 4;


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Client-Side validation
        if (password.length < MINIMUM_PASSWORD_LENGTH) {
            setError("Password must be at least " + MINIMUM_PASSWORD_LENGTH + " characters long");
            return;
        }

        if (password !== repeatPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                })
            });

            if (response.ok) {
                navigate('/login');
            } else {
                const errorData = await response.text();
                setError(errorData || 'Registration failed');
            }
        } catch (error) {
            setError('Network error: ' + error.message);
        }
    }

    return (
        <>
            <div className="register-container">
                <h2 className={"register-header"}> Wanna fight? </h2>
                {error && <div className="error-message" style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}
                <form className = "register-form" onSubmit={handleSubmit}>
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
                    <div className={"password-field"}>
                        <input
                            type="password"
                            id={"repeat-password"}
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            placeholder="Repeat password"
                            required
                        />
                    </div>
                    <button type={"submit"} className={"register-button"}>
                        Register
                    </button>
                </form>
            </div>
        </>
    );

};

export default Register;
