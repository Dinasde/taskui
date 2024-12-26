import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, TextField, Button } from '@mui/material';
import axiosInstance from '../utils/axios'; // Import the custom axios instance
import './Login.css';

function Login() {
  const [admin, setAdmin] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
    
  
  
   
  
      // Make the POST request
      const result = await axiosInstance.post('/user/login', admin);
 
      // Store the token and adminId in localStorage
      const { token: newToken, adminId } = result.data;
      localStorage.setItem('token', newToken);
     
  
      // Navigate to the schedule page
      navigate('/schedule');
    } catch (err) {
      setError('Invalid email or password');
      console.log(err.message);
    }
  };
  





  return (
    <div className="login-container">
      <Card className="login-card">
        <form onSubmit={loginHandler}>
          <h3 className="login-header">Login</h3>
          <div style={{
            marginRight:'10px',
            marginBottom:'20px'

          }}>
          <TextField
            sx={{margin:'10px'}}
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            onChange={inputHandler}
            fullWidth
          />
          <TextField
          sx={{margin:'10px'}}
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            onChange={inputHandler}
            fullWidth
          />
          {error && <p className="error-message">{error}</p>}
          <Button sx={{marginLeft:'10px'}} variant="contained" type="submit" className="submit-btn">
            Submit
          </Button>

          </div>
      
        </form>
      </Card>
    </div>
  );
}

export default Login;

