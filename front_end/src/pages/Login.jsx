import React, { useState } from 'react'
import { client } from '../config/axios';
import "../styles/login.css"
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState({
    username: '',
    password: ''
    });
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setState({
        ...state,
        [name]: value
      });
    };
    const navigate = useNavigate();

   const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await client({
      method: 'POST',
      url: `users/login`,
     
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(state),
    });
    console.log(response.url)
    console.log('RESPONSE:', response);
    alert(`Message: ${response.data.message}`);
    localStorage.setItem('username', response.data.username);
    localStorage.setItem('userId', response.data.userId);
    localStorage.setItem('token', response.data.token);
    navigate('/');
  } catch (error) {
    console.error('REQ ERROR:', error?.response?.data);
    const errorMessage =
      error?.response?.data?.message || 'An unexpected error occurred. Please try again.';
    alert(`Error: ${errorMessage}`);
  }
};

    
  return (
    <div className='login_body'>
       <form action="/login" 
       onSubmit={handleSubmit} 
       method='POST'>
        <h1>Login</h1>
        <div className="inputbox">
          <input type="text"
          placeholder='Username'
          name='username'
          value={useState.username}
          onChange={handleChange}
           required />
          </div>

        <div className="inputbox">
          <input type="password"
          name="password"
          placeholder='Password'
          value={useState.password}
          onChange={handleChange}
          required  />
          
        
        </div>
        <div className="remember_me">
          <label> <input type="checkbox" />Remember me</label>
          <a href="Forgot_password">Forgot password</a>
        </div>
        <button className="button" type='submit'>Login</button>
        <div className="register_link">
          <p>You don't have an account ?<a href="register">Register</a></p>
        </div>

       </form>
      
    </div>
  )
}

export default Login