import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from "axios";
import { API_BASE_URL } from '../config';
import FormInput from './common/FormInput';
import SubmitButton from './common/SubmitButton';


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
    <div className="fixed inset-0 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-black/90 backdrop-blur-sm" 
           style={{backgroundImage: "url('/images/logo-calm.jpg')"}}>
        <div className="w-full max-w-md p-8 pb-12 mx-4 my-8 bg-black/60 backdrop-blur-sm rounded-xl border border-blue-400/30 shadow-[0_0_30px_rgba(37,99,235,0.15)]">

        <h2 className="text-3xl font-bold mb-8 text-center text-blue-50">Login to SSBU League</h2>
        
        <form onSubmit={handleSubmit} className="space-y-8 mb">
          <FormInput
            label="Username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            color="blue"
          />
          
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            color="blue"
          />

          {error && (
            <div className="text-red-500 text-sm text-center mb-4">
              {error}
            </div>
          )}
          
          <div className="mt-8 flex justify-center">
            <SubmitButton color="blue">
              Sign in
            </SubmitButton>
          </div>
        </form>
        </div>
      </div>
    </div>
);

};

export default Login;