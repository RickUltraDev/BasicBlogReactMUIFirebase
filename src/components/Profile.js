/* Material imports */
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

/* Component imports */
import ListSkills from './ListSkills';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

/* Firebase imports */
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { firebaseApp } from "../firebase"; //var to use firebase capacities been authenticated
const fireStore = getFirestore(firebaseApp);

const Profile = ({user}) => {

    //useStates vars
    const navigate = useNavigate(); //for v6 of react router is better useNavigate
    const [arrSkills, setArrSkills] = useState(null);
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");

    //functions
    const handleGetData = async (uidUser) => {
        try {
            const docuRef = doc(fireStore, `userData/${uidUser}`);
            const docSearch = await getDoc(docuRef);
            
            //If we have saved data this will be true
            if (docSearch.exists()) {
                const remoteData = docSearch.data();
                return remoteData;
            }
            return {};
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    const handleAddSkill = () => {
        navigate('/skill');
    }

    useEffect(() => {
        const fetchRemoveData = async () => {
            const removeData = await handleGetData(user.uid);
            setFName(removeData.fName);
            setLName(removeData.lName);
            setArrSkills(removeData.skills);
        }
        fetchRemoveData();
    }, [user.uid]);

    return ( 
        <Container maxWidth="sm">
            <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >                       
                    <Typography component="h1" variant="h5">
                        Profile
                    </Typography>
                    <Typography component="h1" variant="h6">
                        {fname} {lname}
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        {user.email}
                    </Typography>
                    
                </Box>

            <br />
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} >
                <Button variant="contained" size="small" color="info" onClick={handleAddSkill}>
                    Add new skill
                </Button>
            </Stack>
            <br />
            {arrSkills && arrSkills.length !== 0  && <ListSkills arrSkills={arrSkills} setArrSkills={setArrSkills} userUid={user.uid} />}
        </Container>
     );
}
 
export default Profile;