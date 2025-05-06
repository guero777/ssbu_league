import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleSubmit = (e) => {

        e.preventDefault();
        setError("");

        // Client-Side validation
        if (password.length < MINIMUM_PASSWORD_LENGTH) {
            setError("Password must be at least " + MINIMUM_PASSWORD_LENGTH + " characters long");
        }
    }

    return (
        <>
            <div className="register-container">
                <h2 className={"register-header"}> Register a new account </h2>
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
                        Login
                    </button>
                </form>
            </div>
        </>
    );

};

export default Register;
