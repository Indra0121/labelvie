import React, { useState } from 'react';
import { Box, Button, TextField, useMediaQuery } from '@mui/material';
import loginIllu from '../../assets/svg/login-animate.svg';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './auth.css';
import { authenticateUser } from "../../state";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      authenticateUser({ email, password })
    )
      .unwrap()
      .then(() => {
        console.log("Login successful");
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
      color: '#333',
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.05em',
      padding: '2em',
      borderRadius: '0.5em',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    }}>
      {!isMobile && (
        <Box sx={{
          overflow: 'clipped',
          transition: 'all 0.3s ease-in-out',
          '&:hover': { transform: 'scale(1.05)' },
          backgroundImage: `url(${loginIllu})`,
          height: "100vh",
          width: "100vh",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
      )}
      <Box sx={{
        backgroundColor: 'white',
        height: '65vh',
        width: '50vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: '30px',
      }}>
        <h1 className='loginwlc'>Bienvenue</h1>
        <Box>
          <TextField 
            id="outlined-email" 
            label="Email"
            placeholder="a@a.com"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: '1em' }}
          />
          <TextField 
            id="outlined-password" 
            label="Password"
            type="password" 
            placeholder="*****"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Button 
          sx={{
            bgcolor: 'yellow',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: 'none',
            '&:hover': {
              bgcolor: '#FFF5CC',
              boxShadow: 'none',
            },
          }}
          variant="contained"
          onClick={handleSubmit}
          className='loginbtn'
        >
          Connexion
        </Button>
      </Box>
    </Box>
  );
};

export default Auth;
