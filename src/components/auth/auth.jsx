import React, { useState } from 'react'
import { Box, Button, TextField,useMediaQuery } from '@mui/material';
import loginIllu from '../../assets/svg/login-animate.svg';
import './auth.css'
import axios from 'axios'
const Auth = () => {
  
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [data, setData] = useState([]);
  const login=()=>{
    console.log(email,password);
    console.log("logged in fr")
    fetchData()
  }
  const fetchData=()=>{
    axios.get('http://192.168.100.20/api/magasin.php')
    .then(response=>console.log(response.data))
    .catch(error=>console.error('error fetching data:',error))
  }
  const isMobile = useMediaQuery('(max-width:600px)');


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
      boxSizing: 'border-box',
      padding: '2em',
      borderRadius: '0.5em',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',

    }}>
     { !isMobile&&(
       <Box sx={{
        overflow: 'clipped',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      backgroundImage: `url(${loginIllu})`,
      height: "100vh",
      width: "100vh",
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
    </Box>
    )}
      <Box sx={{
        backgroundColor:'white',
        height: '65vh',
        width:'50vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        
        borderRadius:'30px'
      }}>
        <h1 className='loginwlc'>Bienvenue</h1>
        <Box>
        <TextField 
        id="outlined-basic" 
        label="Email"
        placeholder='a@a.com' 
        variant="outlined"
        onChange={(e)=>setEmail(e.target.value)}
        sx={{
          marginBottom: '1em',
        }}/>
        <br />
        <TextField 
        id="outlined-basic" 
        label="Password" 
        type='Mot de Passe' 
        placeholder='*****' 
        variant="outlined" 
        onChange={(e)=>setPassword(e.target.value)}

        />
        </Box>
        <Button 
           sx={{
            bgcolor: 'yellow', // Background color
            color: 'white', // Text color
            fontWeight:'bold', // Bold font weight
              boxShadow: 'none',
           
            '&:hover': {
              bgcolor: '#FFF5C', // Background color on hover
              boxShadow: 'none',
            },
          }}
        variant="contained"  
        onClick={login} 
        className='loginbtn'>Connexion
        </Button>
      </Box>
    </Box>
  );
}

export default Auth;
