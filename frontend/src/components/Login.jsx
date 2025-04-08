import './login.css'
import axios from 'axios';
import {useState} from "react";
import { useNavigate } from "react-router-dom";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 🔁 Ensure new session + token
            await axios.get("http://localhost:8080/", {
                withCredentials: true
            });

            const csrfToken = getCookie("XSRF-TOKEN");
            console.log("Using CSRF Token:", csrfToken);

            const response = await axios.post(
                "http://localhost:8080/login",
                new URLSearchParams({
                    username,
                    password
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "X-XSRF-TOKEN": csrfToken // header name for csrf cookie
                    },
                    withCredentials: true
                }
            );

            console.log("Login successful");
            navigate("/dashboard");

        } catch (err) {
            console.error("Login failed:", err.response || err);
        }
    };

    return (
        <>
            <div className="login-container">
                <h2 className={"login-header"}> Log into your account </h2>
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
                    <button type={"submit"} className={"login-button"}>
                        Login
                    </button>
                </form>
            </div>
        </>
    );
};

export default Login;
