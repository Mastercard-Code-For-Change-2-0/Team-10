import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from './handle.js';
import axios from "axios";

const Signup = () => {
    const navigate =   useNavigate(); 
    const [formData, setFormData] = useState({
        organisationName: '',
        email: '',
        password: '',
        role: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    console.log(formData);

    const handleSubmit = async (e) => { 
        e.preventDefault();
        try {
            if( formData.organisationName === "" || formData.email === "" || formData.password === "" || formData.role === ""){
                handleError("Please fill all the fields");
                return;
            }
            const response = await axios.post("http://localhost:8080/auth/signup", formData);
            console.log(response);
            if (response.data.success) {
                handleSuccess("Signup successful, please login to continue....");
                //window.location.href = "/login";
                navigate("/login"); 
            } else {
                handleError(response.data.message);
            }
        } catch (err) {
            console.error("Signup error:", err);
            handleError(err.response?.data?.message || "An error occurred during signup.");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="organisationName">Name of Organisation:</label>
                        <input
                            type="text"
                            id="organisationName"
                            name="organisationName"
                            value={formData.organisationName}
                            onChange={handleChange}
                            required
                            placeholder="Enter your organisation name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Organisation Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your organisation email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role:</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select your role</option>
                            <option value="reciever">Reciever</option>
                            <option value="donor">Donor</option>
                        </select>
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
                    <button type="submit" className="signup-btn">
                        Sign Up
                    </button>
                </form>
                <p className="login-link">
                    Already have an account? <a href="/login">Login here</a>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Signup;