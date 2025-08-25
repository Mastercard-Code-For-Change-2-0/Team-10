import React, { useState } from 'react';
import './Login.css';
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from './handle.js';
const Login = () => {
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    console.log(formData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try{
            axios.post("http://localhost:8080/auth/login", formData)
            .then((res) => {
                if(res.data.success){
                    handleSuccess("Login successful");
                    localStorage.setItem("token", res.data.token);
                    window.location.href = "/dashboard"; 
                }else{
                    handleError(res.data.message);
                }
            })
            .catch((err) => {
                console.error("Login error:", err);
                alert("Login failed. Please check your credentials.");
            });
        }catch(err){
            console.error("Error during login:", err);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>
                <p className="signup-link">
                    Don't have an account? <a href="/signup">Sign up here</a>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
