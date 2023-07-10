import React, { useState } from "react";
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_BASE_URL}/login`, {
                email,
                password
            });
            // Handle the response from the backend
            if (response.status === 200) {
                // Successful login
                console.log(response.data); // Logged-in user data
                // Redirect to the dashboard or desired page
                props.history.push('/dashboard');
            } else {
                // Display error message if login fails
                setErrorMessage('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error(error);
            // Display error message if an error occurs during login
            setErrorMessage('Login failed. Please try again later.');
        }
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
};
