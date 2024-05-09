/* Material imports */
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber } from '@mui/material/colors';

/* Toast imports */
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* Component imports */
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';


const Login = ({ user }) => {
    //UseStates vars
    const defaultTheme = createTheme();
    const navigate = useNavigate(); //for v6 of react router is better useNavigate
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errEmail, setErrEmail] = useState({
        status: false,
        message: ""
    });
    const [errPassword, setErrPassword] = useState({
        status: false,
        message: ""
    });
    const [isSignUpActive, setIsSignUpActive] = useState(false);

    //functions
    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // If we want to do something with the user data --> const user = userCredential.user;
            //NOTE: Here i can save the first name and last name
            //const user = userCredential.user;
            notify("Success", "User created!");
            handlePageChange();
        })
        .catch((error) => {
            //If we have any error we will have it here
            const errorMessage = error.message;
            notify("Error", errorMessage);
        });
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            navigate('/profile');
        })
        .catch((error) => {
            //If we have any error we will have it here
            const errorMessage = error.message;
            notify("Warning", errorMessage);
        });
    }
    
    const notify = (status, message) => {
        if (status === "Error") {
            toast.error(message, {
                position: "top-right",
                autoClose: 3000,
                pauseOnFocusLoss: true
            });
        }

        if (status === "Info") {
            toast.info(message, {
                position: "top-right",
                autoClose: 2000,
                pauseOnFocusLoss: true
            });
        }

        if (status === "Warning" && message.includes('auth/invalid')) {
            toast.warn("Invalid credentials. Check and try again.", {
                position: "top-right",
                autoClose: 2000,
                pauseOnFocusLoss: true
            });
        }

        if (status === "Warning" && message.includes('auth/too-many-requests')) {
            toast.error("Account temporary disabled. Too many attemps.", {
                position: "top-right",
                autoClose: 3000,
                pauseOnFocusLoss: true
            });
        }

        if (status === "Warning" && ! (message.includes('auth/too-many-requests') || message.includes('auth/invalid') )) {
            toast.warn(message, {
                position: "top-right",
                autoClose: 2000,
                pauseOnFocusLoss: true
            });
        }
    };

    const handlePageChange = () => {
        setIsSignUpActive(!isSignUpActive);
    }
    
    //validation of form
    useEffect(() => {
        let regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        
        if (!!email && !regex.test(email)) {
            setErrEmail({
                status:true,
                message:"This is an invalid email, please verify."
            });
        }else{
            setErrEmail({
                status:false,
                message:""
            });
        }

        if (!!password && (password.length < 6 || password.length > 20) ) {
            setErrPassword({
                status:true,
                message:"This is an invalid password, try between 6 to 20 caracters."
            });
        }else{
            setErrPassword({
                status:false,
                message:""
            });
        }
        //If a user is logged navigate to /Profile
        if (user) {
            navigate('/profile');
        }

    }, [email, password, user, navigate]);

    

    return ( 
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    {!isSignUpActive && 
                        <Avatar sx={{ m: 1, bgcolor: amber[500] }}>
                            <LockPersonOutlinedIcon />
                        </Avatar>
                    }
                    {!isSignUpActive && 
                        <Typography component="h1" variant="h5">
                            Sign In
                        </Typography>
                    }

                    {isSignUpActive && 
                        <Avatar sx={{ m: 1, bgcolor: amber[500] }}>
                            <LockOpenIcon />
                        </Avatar>
                    }

                    {isSignUpActive && 
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                    }


                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        type="text"
                        autoComplete="email"
                        autoFocus
                        error={errEmail.status}
                        helperText={errEmail.message}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        error={errPassword.status}
                        helperText={errPassword.message}
                        onChange={(e) => setPassword(e.target.value)}
                        />

                        {!isSignUpActive &&
                            <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSignIn}
                            disabled={ (!email || !password || errEmail.status || errPassword.status) ? true : false }
                            >
                            Sign In
                            </Button>
                        }

                        {isSignUpActive &&
                            <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSignUp}
                            disabled={ (!email || !password || errEmail.status || errPassword.status) ? true : false }
                            >
                            Create account
                            </Button>
                        }
                        {!isSignUpActive &&
                            <Grid container>
                                <Grid item md>
                                    <Link component="button" onClick={handlePageChange} variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        }
                        {isSignUpActive &&
                            <Grid container>
                                <Grid item md>
                                    <Link component="button" onClick={handlePageChange} variant="body2">
                                        {"Already have an account? Sign In"}
                                    </Link>
                                </Grid>
                            </Grid>
                        }
                    </Box>
                </Box>
            </Container>
            <ToastContainer limit={3} />
        </ThemeProvider>
     );
}
 
export default Login;