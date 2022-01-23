import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword,CheckIsBlocked, signInWithGoogle } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Login, LockOutlined, ArrowBackIosNew } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EmailField from "./FormControls/EmailField";
import PasswordField from "./FormControls/PasswordField";
import { Link as UrlLink } from 'react-router-dom';
import AppContext from '../Context/AppContext';

const theme = createTheme();

export default function SignIn() {
  const { blockedTime, setBlockedTime ,loading, setLoading} = React.useContext(AppContext);

  const [email, setEmail] = useState({
    value: '',
    error: 'enter email'
  });
  const [password, setPassword] = useState({
    value: '',
    error: 'enter password'
  });
  const [user, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/");
  }, [user, loading]);

  const handleEmailChange = (val) => {
    setEmail(val);
  }
  const handlePasswordChange = (val) => {
    setPassword(val)
  }
  const handleSubmit =async (event) => {
    setLoading(true)
 event.preventDefault();
 const blockDuration =await CheckIsBlocked(email.value)
if (blockDuration>0){
  alert("your account has been blocked")
  setBlockedTime(blockDuration)
  navigate('/blocked')
}else{
    logInWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        // Signed in 
      })
    }
    setLoading(false)
  };

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <EmailField email={email} handleEmailChange={handleEmailChange} />
            <PasswordField password={password} handlePasswordChange={handlePasswordChange} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading||email.error !== '' || password.error !== ''}
              endIcon={<Login />}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="outlined"
              component={UrlLink} to={'/signup'}
              startIcon={<ArrowBackIosNew />}
            >Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}