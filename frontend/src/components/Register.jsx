import {useState} from "react";


const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();
        // TRANSMIT DATA TO BACKEND HERE
        console.log(username);
        console.log(password);
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
                            onChange={(e) => setPassword(e.target.value)}
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
