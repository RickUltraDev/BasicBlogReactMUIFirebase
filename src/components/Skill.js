/* Material imports */
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lightBlue } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';

/* Component imports */
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import debounce from 'debounce';


/* Firebase imports */
import { getFirestore, doc, getDoc, updateDoc} from 'firebase/firestore';
import { firebaseApp } from "../firebase";
const fireStore = getFirestore(firebaseApp);

const Skill = ( { user} ) => {    
    //UseStates vars
    const defaultTheme = createTheme();
    const navigate = useNavigate(); //for v6 of react router is better useNavigate
    const [title, setTitle] = useState("");
    const [descrip, setDescrip] = useState("");
    const [errTitle, setErrTitle] = useState({
        status: false,
        message: ""
    });
    const [errDescrip, setErrDescrip] = useState({
        status: false,
        message: ""
    });

    //functions
    const handleNewSkill = async () => {
        try {
            const docuRef = doc(fireStore, `userData/${user.uid}`);
            const docSearch = await getDoc(docuRef);

            //If we have saved data this will be true
            if (docSearch.exists()) {
                const remoteData = docSearch.data();
                const currArrSkills = remoteData.skills;
                if (!!currArrSkills) {
                    const arrSkillsNew = [...currArrSkills, {id: +new Date().getTime(), title: title, description: descrip}];
                    await updateDoc(docuRef, { skills: [...arrSkillsNew]});
                    navigate('/profile');
                } else {
                    await updateDoc(docuRef, {
                        skills: [{id: +new Date().getTime(), title: title, description: descrip}]
                    });
                    navigate('/profile');
                }
            }
            
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    //Debounce vars
    const debouncedCreateSkill = debounce(handleNewSkill, 1500, {maxWait: 2000});

    //validation of form
    useEffect(() => {
        if (!!title && (title.length < 2 || title.length > 30) ) {
            setErrTitle({
                status:true,
                message:"This is an invalid title, try between 2 to 30 caracters."
            });
        }else{
            setErrTitle({
                status:false,
                message:""
            });
        }

        if (!!descrip && descrip.length < 20 ) {
            setErrDescrip({
                status:true,
                message:"This is an invalid description, try adding at least 20 caracters."
            });
        }else{
            setErrDescrip({
                status:false,
                message:""
            });
        }
        
    }, [title, descrip]);


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


                    <Avatar sx={{ m: 1, bgcolor: lightBlue[500] }}>
                        <AddCircleIcon />
                    </Avatar>
                                        
                    <Typography component="h1" variant="h5">
                        Add Skill
                    </Typography>

                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Title"
                                type="text"
                                autoComplete="Title"
                                autoFocus
                                maxLength={4}
                                error={errTitle.status}
                                helperText={errTitle.message}
                                onChange={(e) => setTitle(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Description"
                                type="text"
                                multiline
                                rows={5}
                                autoComplete="Description"
                                error={errDescrip.status}
                                helperText={errDescrip.message}
                                onChange={(e) => setDescrip(e.target.value)}
                                />
                                
                            </Grid>
                        </Grid>  

                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={debouncedCreateSkill}
                            disabled={ (!title || !descrip || errDescrip.status || errTitle.status) ? true : false }
                            >
                            Add Skill
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
     );
}
 
export default Skill;