import './login.css'
import {useState} from "react";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // TRANSMIT DATA TO BACKEND HERE
        console.log(username);
        console.log(password);

    }

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
