import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import GithubIcon from '@mui/icons-material/GitHub';
import useAuth from './useAuth';
import { useDispatch } from 'react-redux';
import { saveUser } from './store/userSlice';

const client_id = process.env.REACT_APP_CLIENT_ID;
const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
const proxy_url = process.env.REACT_APP_PROXY_URL;

const SignIn = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, null!, newUrl[0]);

      fetch(proxy_url + "/authenticate", {
        method: "POST",
        body: JSON.stringify({ code: newUrl[1] })
      })
        .then(response => response.json())
        .then(({ user, access_token }) => {
          localStorage.setItem('access_token', access_token);
          dispatch(saveUser({ email: user.email, name: user.name}));
          navigate('dashboard');
        })
        .catch(error => {
          // TODO: Show error
        });
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    auth
      .signin({
        email: data.get('email')?.toString() || '',
        password: data.get('password')?.toString() || '',
      })
      .then(() => {
        navigate('dashboard');
      })
      .catch((e) => {
        // TODO: Show error
      });
  };

  const handleLoginWithGithub = () => {
    const url = `https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`;
    window.location.replace(url);
  };

  return (
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
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <div>
              <Button onClick={handleLoginWithGithub}>
              <GithubIcon />
                <span>Login with GitHub</span>
              </Button>
            </div>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
