import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Countdown from "react-countdown";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppContext from '../Context/AppContext';
import { useNavigate  } from 'react-router-dom'

const theme = createTheme();

export default function Blocked() {
    const { blockedTime, setBlockedTime } = React.useContext(AppContext);
    const navigate = useNavigate()

    const goToSignIn=()=>{
        navigate('/signin')
    }
    React.useEffect(()=>{
        if(blockedTime===0)
        navigate('/signin')
    },[blockedTime])
    
  return ( 
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 4, bgcolor: 'red' }}>
            <RemoveCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h6">
          Your account has been temporarily banned
          </Typography>
          <Box  noValidate sx={{ mt: 1 }}>
          <Typography component="h1" variant="h2">
          <Countdown date={Date.now() + blockedTime} 
          onComplete={goToSignIn} 
          />
          </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={goToSignIn}
            >
             back to Sign In
            </Button>
          
           
          </Box>
        </Box>
       </Container>
    </ThemeProvider>
  );
}