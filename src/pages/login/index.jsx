import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';




// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {



    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isClicked, setIsClicked] = useState(false)


    const navigate = useNavigate()


    // react toastify success
    const notifySuccess = () => toast.success('Successfully Sign in', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });

    // react toastify error
    const notifyError = () => toast.error('Incorrect Credentials', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });




    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log('login handler')

        try {
            // for submit button disabling
            setIsClicked(true)

            console.log('try')
            await signInWithEmailAndPassword(auth, email, password)
                .then(async (user) => {


                    notifySuccess()


                    console.log('user=====>', user)
                    // user uid
                    const userUId = user.user.uid;
                    // console.log(userUId)

                    // getting user data 
                    const docSnap = await getDoc(doc(db, 'Users', userUId))

                    // console.log(docSnap)
                    // console.log(docSnap.data())    // extracting data
                    // console.log(docSnap.exists())   // is data exists or not


                    // setting uid and data in storage
                    localStorage.setItem('user uid', userUId)
                    // console.log(localStorage.getItem('user uid'))

                    // localStorage.setItem('user', docSnap.data())   
                    localStorage.setItem('user data', JSON.stringify(docSnap.data()))
                    // console.log(JSON.parse(localStorage.getItem('user data')))


                    // navigate to TODO dashboard
                    navigate('/')



                })
                .catch((error) => {
                    setIsClicked(false)
                    notifyError()
                    console.log('Login error =====>', error.code)

                })



        } catch (error) {
            console.log('Try Catch error ====>>', error.code);
            console.log('notifyError====>', notifyError)
        }


    };

    return (
        <ThemeProvider theme={defaultTheme}>
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
                        <LockOutlinedIcon />
                    </Avatar>
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
                            onChange={(e) => { setEmail(e.target.value) }}
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
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={isClicked ? true : false}
                            // disabled={false}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>

                        < ToastContainer />

                        <Grid container>
                            <Grid item xs>
                                <Link to={''} variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to={'/signUP'} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}