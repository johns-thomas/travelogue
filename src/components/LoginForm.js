
import React, { useState } from 'react';

import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const { username, password } = credentials;
    const { setUser } = useUser();
    const navigate = useNavigate();
    function onChange(e) {
        const { name, value } = e.target;
        //console.warn(e.target)
        setCredentials(creds => ({ ...creds, [name]: value }));
    }


    let errorMessage = null;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username && password) {
            try {
                const response = await fetch('http://localhost:5000/bookingapp/api/user/authenticate/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials),
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error('login failed');
                }
                if (response.status === 200) {
                    localStorage.setItem('JWTBOOKINGTOKEN', data.token);
                    const accessToken = localStorage.getItem('JWTBOOKINGTOKEN');

                    console.log(accessToken);
                    const respons = await fetch('http://localhost:5000/bookingapp/api/user/', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                        },
                    });
                    const res = await respons.json();
                    console.log(res);
                    setUser(res);
                }







                // Reset form fields after successful registration
                setCredentials({
                    username: '',
                    password: ''
                });
                // Redirect to login page after registration
                navigate("/home");
                return;
            } catch (error) {
                console.error('Login error:', error);
                errorMessage = 'Invalid credentials. Please try again.';
            }
        }
    }
    const error = null;
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {error && <p className="text-danger">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <h3>Login</h3>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={onChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
