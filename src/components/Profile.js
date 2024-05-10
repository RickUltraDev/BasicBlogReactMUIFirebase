/* Material imports */
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

/* Component imports */
import ListSkills from './ListSkills';
import { useState, useEffect } from 'react';

/* Firebase imports */
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { firebaseApp } from "../firebase"; //var to use firebase capacities been authenticated
const fireStore = getFirestore(firebaseApp);

const Profile = ({user}) => {

    //useStates vars
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
            //return [];
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    const fetchRemoveData = async () => {
        const removeData = await handleGetData(user.uid);
        setFName(removeData.fName);
        setLName(removeData.lName);
        setArrSkills(removeData.skills);
    }

    useEffect(() => {
        fetchRemoveData();
    }, );

    return ( 
        <div className="container">
            <h2>Profile</h2>
            <div className="card">
                <label htmlFor="">First Name: {fname}</label> <br/>
                <label htmlFor="">Last Name: {lname}</label><br/>
                <label htmlFor="">Email: {user.email}</label><br/>
            </div>
            <br />
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} >
                <Button variant="contained" size="small" color="info">
                Add new skill
                </Button>
            </Stack>
            <br />
            {arrSkills && <ListSkills arrSkills={arrSkills} />}
        </div>
     );
}
 
export default Profile;