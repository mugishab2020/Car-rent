import React, { useState } from 'react';
import "../styles/register.css";
import client from '../config/axios';

const Register = () => {
  const [state, setState] = useState({
    email: '',
    names: '',
    username: '',
    password: '',
    confirmpasswords: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // Validate passwords
    if (state.password !== state.confirmpasswords) {
      alert('Passwords do not match');
      return;
    }

    const { email, names, username, phone, password } = state;
    const data = { email, name: names, username, phone, password };

    client.post(`users/register`, data)
      .then((response) => {
        alert(`Message: ${response.data.message}`);
        console.log('User registered successfully:', response.data);
      })
      .catch((error) => {
        console.error('There was a problem with the registration:', error.message);
      });
  };

  return (
    <div className="register_body">
      <form onSubmit={handleSignUp} method="POST">
        <h1>Register</h1>
        
        <div className="inputbox">
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            value={state.email}
            onChange={handleChange}
          />
        </div>
        
        <div className="inputbox">
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            value={state.username}
            onChange={handleChange}
          />
        </div>
        
        <div className="inputbox">
          <input
            type="text"
            placeholder="Full Name"
            name="names"
            required
            value={state.names}
            onChange={handleChange}
          />
        </div>
        
        <div className="inputbox">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={state.password}
            onChange={handleChange}
          />
        </div>
        
        <div className="inputbox">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmpasswords"
            required
            value={state.confirmpasswords}
            onChange={handleChange}
          />
        </div>
        
        <div className="inputbox">
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={state.phone}
            onChange={handleChange}
          />
        </div>
        
        <button className="button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
