import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Store user credentials in localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some((user) => user.email === email);

        if (userExists) {
            alert('User already exists!');
        } else {
            users.push({ email, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Signup successful!');
            setEmail(''); // Reset email field
            setPassword(''); // Reset password field
            setConfirmPassword(''); // Reset confirm password field
        }
    };

    return (
        <div className="auth-container">
            <h2>Signup</h2>
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Signup</button>
            </form>
            <p className="auth-link">
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Signup;