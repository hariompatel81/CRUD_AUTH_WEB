import './AuthForm.css';
import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate , NavLink } from 'react-router-dom';
export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const data = response.data;

    if (data.success) {
      localStorage.setItem("token", data.token);
      alert("Login successful");
      navigate('/dashboard');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message;
    
    // Agar backend se "not verified" ka error aaye (Status 403)
    if (error.response?.status === 403) {
      alert(errorMessage);
      navigate('/verify-signup-otp', { state: { email: email } });
    } else {
      alert(errorMessage || "Login failed");
    }
  }
};

const handleSignup = async () => {
  try {
    const response = await api.post("/auth/signup", { name, email, password, age });

    if (response.data.success) {
      alert("Registration successful! Please verify the OTP sent to your email.");
      // Email pass karein taaki verify page par iska use ho sake
      navigate('/verify-signup-otp', { state: { email: email } });
    }
  } catch (error) {
    alert(error.response?.data?.message || "Signup failed");
  }
};

  return (
    <div className='auth-page'>
      <div className='container'>
        <div className='form-container'>
          <div className='form-toggle'>
            <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
            <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Signup</button>
          </div>
          {
            isLogin ? (
              <div className='form'>
                <h2>Login Form</h2>
                <input type="email" name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <input type='password' name='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}/>

                <NavLink to="/send-otp" className='forget-pass'>Forgot password</NavLink>

                <button onClick={handleLogin}>Login</button>

                <p>
                  Not a number?
                  <a href="#" onClick={() => setIsLogin(false)}>Signup Now</a>
                </p>
              </div>
            ) : (
              <div className='form'>
                <h2>Signup Form</h2>

                <input type='name' name='name' placeholder='Name' onChange={(e) => setName(e.target.value)}/>
                <input type='email' name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                <input type='password' name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                <input type='number' name='age' placeholder='Age' onChange={(e) => setAge(e.target.value)}/>

                <button onClick={handleSignup}>Signup</button>

              </div>
            )
          }
        </div>
      </div>

    </div>

  );
}
