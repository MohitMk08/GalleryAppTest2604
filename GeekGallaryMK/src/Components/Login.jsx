import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Retrieve users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find((user) => user.email === email && user.password === password);

        if (user) {
            alert('Login successful!');
            onLogin(true); // Update login state
            setEmail(''); // Reset email field
            setPassword(''); // Reset password field
            navigate('/'); // Redirect to main content
        } else {
            alert('Invalid credentials!');
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p className="auth-link">
                Don't have an account? <Link to="/signup">Signup</Link>
            </p>
        </div>
    );
};

export default Login;