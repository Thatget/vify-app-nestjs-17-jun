import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function GettingStarted() {
    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const selectProducts = (
        <React.Fragment>
            <CardContent>
                <Typography variant="body1" component="div">
                   <b> Step 1: Select products </b>
                </Typography>
                <br/>
                <Typography variant="body1">
                    Click Add products to browser your products , select some to show quote button
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Add Products</Button>
            </CardActions>
        </React.Fragment>
    );
    const enableApp = (
        <React.Fragment>
            <CardContent>
                <Typography variant="body1" component="div">
                    <b>Step 2: Enable App</b>
                </Typography>
                <br/>
                <Typography variant="body1">
                    Click Enable to make App functional
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Enable</Button>
            </CardActions>
        </React.Fragment>
    );
    const themes = (
        <React.Fragment>
            <CardContent>
                <Typography variant="body1" component="div">
                    <b>Step 3: For Online Store 2.0 themes </b>
                </Typography>
                <br/>
                <Typography variant="body1">
                    Customize your Current theme and add a block to your target page <br/>
                    Select <b>Simple Quote</b> when you find it available <br/>
                    Click <a href="#">Enable </a>to make App functional <br/>
                    <a href="#">Contact us if the button doesn't show</a> <br/>
                </Typography>
            </CardContent>
        </React.Fragment>
    );
    const otherSetting = (
        <React.Fragment>
            <CardContent>
                <Typography variant="body1" component="div">
                    <b>Other settings</b>
                </Typography>
                <br/>
                <Typography variant="body1">
                    If you want to change the notification mailbox , go Email Settings.
                </Typography>
                <Typography variant="body1">
                    If you want to hid prices or customize the style of the quote button, go <a href="#">General
                    Settings</a>
                </Typography>
                <Typography variant="body1">
                    If you want to customize contact form or do some translation, go <a href="#">Form Settings</a>
                </Typography>
            </CardContent>
        </React.Fragment>
    );

    return (
        <>
            <React.Fragment>
                <br/>
                <Container >
                    <Box sx={{minWidth: 275}} >
                        <Card variant="outlined">{selectProducts}</Card>
                    </Box>
                    <br/>
                    <Box sx={{minWidth: 275}}>
                        <Card variant="outlined">{enableApp}</Card>
                    </Box>
                    <br/>
                    <Box sx={{minWidth: 275}}>
                        <Card variant="outlined">{themes}</Card>
                    </Box>
                    <br/>
                    <Box sx={{minWidth: 275}}>
                        <Card variant="outlined">{otherSetting}</Card>
                    </Box>
                </Container>
            </React.Fragment>
        </>
    );

};
