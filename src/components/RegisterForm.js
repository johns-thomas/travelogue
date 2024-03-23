
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

function RegisterForm() {
    const [credentials, setCredentials] = useState({
        username: '',
        fname: '',
        lname: '',
        email: '',
        password: '',
        confirmpassword: ''
    });
    const { username, fname, lname, email, password, confirmpassword } = credentials;
    
    const navigate=useNavigate();
    function onChange(e) {
        const { name, value } = e.target;
        setCredentials(creds => ({ ...creds, [name]: value }));
    }
    let errorMessage=null;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmpassword) {
            alert("Passwords don't match");
            return;
        }
        if (username && password) {
            try {
                const response = await fetch('http://localhost:5000/bookingapp/api/user/authenticate/signup', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(credentials),
                });
                if (!response.ok) {
                  throw new Error('Registration failed');
                }
                // Reset form fields after successful registration
                setCredentials({
                    username: '',
                    fname: '',
                    lname: '',
                    email: '',
                    password: '',
                    confirmpassword: ''
                });
                // Redirect to login page after registration
                navigate("/login");
                return;
              } catch (error) {
                console.error('Registration error:', error);
                errorMessage='Registration failed. Please try again.';
              }
        }
        
    }


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <h3>Register</h3>
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
                            <label htmlFor="fname">First name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="fname"
                                placeholder="Enter your First name"
                                value={fname}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lname">Last name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="lname"
                                placeholder="Enter your Last name"
                                value={lname}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                placeholder="Enter your email"
                                value={email}
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
                        <div className="form-group">
                            <label htmlFor="confirmpassword">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="confirmpassword"
                                placeholder="Confirm Password"
                                value={confirmpassword}
                                onChange={onChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
