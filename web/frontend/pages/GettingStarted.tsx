import * as React from 'react';
import {useEffect} from 'react';
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useAuthenticatedFetch} from "../hooks";
import {Card} from '@mui/material';
import {Page, Layout, LegacyCard} from '@shopify/polaris'

export default function GettingStarted() {
    const fetch = useAuthenticatedFetch()
    useEffect(() => {
        fetch("/api/store", {method: "Get"}).then((data: Response): void => {
            console.log("data", data)
            const res: Promise<Response> = new Promise((resolve, reject) => {
                resolve(data.json())
            })
            res.then((value: Response) => console.log("value:", value))
        });
    }, [])
    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const selectProducts = (
        <>
            <CardContent>
                <Typography variant="body1" component="div">
                    <b> Step 1: Select products</b>
                </Typography>
                <br/>
                <Typography variant="body1">
                    Click Add products to browser your products , select some to show quote button
                </Typography>
            </CardContent>
            <CardActions>
                {/*<Button>ABC</Button>*/}
                {/*<Button size="small">Add Products</Button>*/}
            </CardActions>

        </>
    );

    const enableApp = (
        <>
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
                {/*<Button size="small">Enable</Button>*/}
            </CardActions>
        </>
    );
    const themes = (
        <>
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
        </>
    );
    const otherSetting = (
        <>
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
        </>
    );

    return (
        <Page>
            <Layout sectioned>
                <LegacyCard>{selectProducts}</LegacyCard>
                <br/>
                {/*<Box sx={{minWidth: 275}}>*/}
                <LegacyCard>{enableApp}</LegacyCard>
                {/*</Box>*/}
                <br/>
                {/*<Box sx={{minWidth: 275}}>*/}
                <LegacyCard>{themes}</LegacyCard>
                {/*</Box>*/}
                <br/>
                {/*<Box sx={{minWidth: 275}}>*/}
                <LegacyCard>{otherSetting}</LegacyCard>
                {/*</Box>*/}
            </Layout>
        </Page>
    );

};
