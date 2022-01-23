import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword, signInWithGoogle } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Login, ContactMailOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EmailField from "./FormControls/EmailField";
import PasswordField from "./FormControls/PasswordField";
import { Link as UrlLink } from 'react-router-dom';
import UsernameField from "./FormControls/UsernameField";
import AppContext from '../Context/AppContext';

const theme = createTheme();

export default function SignIn() {
  const { loading, setLoading } = React.useContext(AppContext);
  const [user, error] = useAuthState(auth);

  const [username, setUsername] = useState({
    value: '',
    error: 'enter username'
  });
  const [email, setEmail] = useState({
    value: '',
    error: 'enter email'
  });
  const [password, setPassword] = useState({
    value: '',
    error: 'enter password'
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/");
  }, [user,loading]);




  const handleUsernameChange = (val) => {
    setUsername(val);
  }
  const handleEmailChange = (val) => {
    setEmail(val);
  }
  const handlePasswordChange = (val) => {
    setPassword(val)
  }
  const handleSubmit =async (event) => {
    event.preventDefault();
    setLoading(true)
    await registerWithEmailAndPassword(username.value, email.value, password.value)
      .then((isCreated) => {
        if (isCreated) {
          alert('Your account has been successfully created!')
          navigate('/signin')
        }
      })
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
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <ContactMailOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <EmailField email={email} handleEmailChange={handleEmailChange} />
            <UsernameField username={username} handleUsernameChange={handleUsernameChange} />
            <PasswordField password={password} handlePasswordChange={handlePasswordChange} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading || username.error !== '' || email.error !== '' || password.error !== ''}
              endIcon={<Login />}
            >
              Submit
            </Button>

            <Grid container>
              <Grid item xs>

              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  component={UrlLink} to={'/signin'}
                  endIcon={<ArrowForwardIosOutlined />}
                >back to Sign In
                </Button>

              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}