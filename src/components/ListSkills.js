/* Material imports */
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

/* Component imports */
import { Fragment } from 'react';

const ListSkills = ({ arrSkills }) => {
    return ( 
        <Paper
            sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 500,
            flexGrow: 1,
            backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
        >
            <Typography variant="h5" gutterBottom>
                List of Skills
            </Typography>
            {arrSkills.map((skill) => (
                <Fragment key={skill.id}>
                    <Grid container padding={2} spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    {skill.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Description: {skill.description}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} >
                                    <Button variant="outlined" color="warning">
                                        Edit
                                    </Button>
                                    <Button variant="outlined" color="error">
                                        Remove
                                    </Button>
                                </Stack>
                            </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Fragment>
            ))}
        </Paper>
     );
}
 
export default ListSkills;