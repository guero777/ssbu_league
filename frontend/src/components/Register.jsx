import {useState} from "react";
import axios from "axios";
import { API_BASE_URL } from '../config';
import {useNavigate} from "react-router-dom";
import FormInput from './common/FormInput';
import SubmitButton from './common/SubmitButton';

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
      <div className="h-screen w-screen flex items-center justify-center bg-repeat-x bg-center bg-contain bg-black backdrop-blur-sm bg-[url('/images/logoMinimalRed.jpg')]">
        <div className="w-full max-w-md p-8 pb-12 mx-4 my-8 bg-black/60 backdrop-blur-sm rounded-xl border border-red-900/50 shadow-[0_0_30px_rgba(185,28,28,0.15)]">

        <h2 className="text-2xl font-bold mb-6 text-center text-red-50">Join SSBU League</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose your username"
            required
            color="red"
          />
          
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create your password"
            required
            color="red"
          />

          <FormInput
            label="Confirm Password"
            type="password"
            name="repeat-password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            placeholder="Repeat your password"
            required
            color="red"
          />

          {error && (
            <div className="text-red-500 text-sm text-center mb-4">
              {error}
            </div>
          )}
          
          <div className="mt-8 flex justify-center">
            <SubmitButton color="red">
              Create Account
            </SubmitButton>
          </div>
        </form>
        </div>
      </div>
    );

};

export default Register;
