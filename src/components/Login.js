/* Material imports */
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber } from '@mui/material/colors';

/* Component imports */
import { useState, useEffect } from 'react';
import { useNavigate} from "react-router-dom";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';


const defaultTheme = createTheme();

const Login = () => {
    //UseStates vars
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

    //functions
    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // If we want to do something with the user data --> const user = userCredential.user;
            navigate('/profile');
        })
        .catch((error) => {
            //If we have any error we will have it here
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }
    
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

        if (!!password && password.length < 6) {
            setErrPassword({
                status:true,
                message:"This is an invalid password, minimun length is 6 caracters."
            });
        }else{
            setErrPassword({
                status:false,
                message:""
            });
        }
    }, [email, password]);


    return ( 
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >

                <Avatar sx={{ m: 1, bgcolor: amber[500] }}>
                    <LockPersonOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
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

                    <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSignUp}
                    disabled={ (!email || !password || errEmail.status || errPassword.status) ? true : false }
                    >
                    Sign Up
                    </Button>
                </Box>
                </Box>
            </Container>
        </ThemeProvider>
     );
}
 
export default Login;