import SettingComponentSet from "../components/Setting/SettingComponentSet";
import React, {useContext} from "react";
import SettingComponentPreview from "../components/Setting/SettingComponentPreview";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import {actions, StoreContext} from "../store";
import Button from "@mui/material/Button";
import {payloadObject} from "../store/actions";
import {makeStyles} from "@mui/styles";
import {useAppQuery, useAuthenticatedFetch} from "../hooks";
import SaveSetting from "../components/Setting/SaveSetting";
import FormSetting, {defaultFormSetting} from "../components/Setting/FormSetting";
import {Frame, ContextualSaveBar} from '@shopify/polaris';
import ConfigSetting from "../components/Setting/ConfigSetting";
import ConfigSettingPreview from "../components/Setting/ConfigSettingPreview";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FormSettingPreview from "../components/Setting/FormSettingPreview";
import ThanksFormSetting from "../components/Setting/ThanksFormSetting";
import ThanksPagePreview from "../components/Setting/ThanksPagePreview";
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import SvgIcon, {SvgIconProps} from '@mui/material/SvgIcon';

const HomeIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </SvgIcon>
    );
}


const useStyles = makeStyles({
    root: {
        position: "sticky",
        overflow: "auto",
        // top: "1rem",
        // maxWidth: "600"
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const Setting = () => {
    const fetch = useAuthenticatedFetch();
    const {state, dispatch} = useContext(StoreContext);
    const localFormSetting = {
        ...defaultFormSetting,
        ...state.setting,
        ...state.currentSetting,
    };
    // console.log("LocalFormSetting", localFormSetting)
    const setSection = (sections: payloadObject[]) => {
        sections.map((section) => {
            dispatch(actions.setSettingTab(section));
        });
    };
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };


    const settingComponentSet = (
        <CardContent>
            <SettingComponentSet/>
        </CardContent>
    );
    const settingComponentPreview = (
        <CardContent>
            <SettingComponentPreview/>
        </CardContent>
    );
    // const handleSubmit = useCallback(() => {
    //     const data = localFormSetting
    //     console.log("handleSubmit")
    //     console.log("data frontend", data)
    // }, [])
    // const handleSubmit = () => {
    //     const data = localFormSetting
    //     console.log("handleSubmit")
    //     console.log("data frontend", data)
    // }

    // const data = fetch("/api/quote-entity", {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(dataPost)
    // })
    // fetch("/api/quote-entity", {method: "Post"}).then((data: Response): void => {
    //     console.log("data", data)
    //     const res: Promise<Response> = new Promise((resolve, reject) => {
    //         resolve(data.json())
    //     })
    //     res.then((value: Response) => console.log("value:", value))
    // });
    const setting = state.currentSetting;
    console.log("state.currentSetting", state.currentSetting);
    // const data =localFormSetting
    // const {
    //     data: data,
    //     refetch: refetchQuote,
    //     isLoading: isLoadingQuote,
    //     isRefetching: isRefetchingQuote,
    // } = useAppQuery({
    //     url: "/api/quote-entity",
    //     reactQueryOptions: {
    //         onSuccess: () => {
    //             let returnData = data as Object[];
    //             console.log("returnData", returnData);
    //             if (returnData) {
    //                 returnData.map((entity: any) => {
    //                     console.log("entity", entity);
    //                     switch (entity.name) {
    //                         case "name":
    //                             setting.name_title = entity.label || "";
    //                             setting.name_placeholder = entity.value || "";
    //                             break;
    //                         case "email":
    //                             setting.email_title = entity.label || "";
    //                             setting.email_placeholder = entity.value || "";
    //                             break;
    //                         case "message":
    //                             setting.message_title = entity.label || "";
    //                             setting.message_placeholder = entity.value || "";
    //                             break;
    //
    //                         default:
    //                             // setting[data.name] = entity.value;
    //                             break;
    //                     }
    //                     // console.log("data", data)
    //                     dispatch(actions.setInitSetting(setting));
    //                 });
    //             }
    //         },
    //     },
    // });
    const configSetting = (
        <Grid
            container
            item
            spacing={1}
            sx={{mt: 5, mx: 0.5, width: "100%", position: 'fixed', overflow: 'auto'}}
        >
            <Grid item xs={7} sx={{width: "100%", overflow: 'auto'}}>
                <div style={{
                    maxHeight: '80vh',
                    overflow: "auto",

                }}>
                    <Card>
                        <CardContent>
                            <ConfigSetting/>
                        </CardContent>
                    </Card>
                </div>
            </Grid>
            <Grid item xs={5} sx={{width: "100%", overflow: "auto"}}>
                <div style={{maxHeight: "80vh", overflow: "auto", width: "95%"}}>
                    <Card>
                        <CardContent>
                            <ConfigSettingPreview/>
                        </CardContent>
                    </Card>
                </div>
            </Grid>
        </Grid>
    )
    const formSetting = (
        <Grid
            container
            item
            spacing={1}
            sx={{mt: 5, mx: 0.5, width: "100%", position: 'fixed', overflow: 'auto'}}
        >
            <Grid item xs={7} sx={{width: "100%", overflow: 'auto'}}>
                <div style={{
                    maxHeight: '80vh',
                    overflow: "auto",

                }}>
                    <Card>
                        <CardContent>
                            <FormSetting/>
                        </CardContent>
                    </Card>
                </div>
            </Grid>
            <Grid item xs={5} sx={{width: "100%", overflow: "auto"}}>
                <div style={{maxHeight: "80vh", overflow: "auto", width: "95%"}}>
                    <Card>
                        <CardContent>
                            <FormSettingPreview/>
                        </CardContent>
                    </Card>
                </div>
            </Grid>
        </Grid>
    )
    const thanksSetting = (
        <Grid
            container
            item
            spacing={1}
            sx={{mt: 5.3, mx: 0.5, width: "100%", position: 'fixed', overflow: 'auto'}}
        >
            <Grid item xs={7} sx={{width: "100%", overflow: 'auto'}}>
                <div style={{
                    maxHeight: '80vh',
                    overflow: "auto",

                }}>
                    <Card>
                        <CardContent>
                            <ThanksFormSetting/>
                        </CardContent>
                    </Card>
                </div>
            </Grid>
            <Grid item xs={5} sx={{width: "100%", overflow: "auto"}}>
                <div style={{maxHeight: "80vh", overflow: "auto", width: "95%"}}>
                    <Card>
                        <CardContent>
                            <ThanksPagePreview/>
                        </CardContent>
                    </Card>
                </div>
            </Grid>
        </Grid>
    )


    const classes = useStyles();

    return (
        <>
            {/*<Box sx={{width: '100%', typography: 'body1'}}>*/}
            <TabContext value={value} sx={{width: '100%'}}>
                {/*<ValidatorForm onSubmit={handleSubmit}>*/}
                <Grid container spacing={1} sx={{width: "100%"}}>
                    <Grid
                        container
                        item

                        sx={{
                            m: 1.2,
                            position: "fixed",
                            justifyContent: "flex-end",
                            width: "100%",
                            zIndex: 'modal',

                        }}
                    >

                        <Box sx={{
                            borderBottom: 1, borderColor: 'divider', display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            width: "100%",
                            bgcolor: 'background.paper',


                        }}>
                            <Box sx={{flexGrow: 1}}>
                                <TabList
                                    onChange={handleChange}
                                    aria-label="lab API tabs example"
                                    textColor="primary"
                                    indicatorColor="primary"
                                >
                                    <Tab
                                        label="General Setting"
                                        value="1"/>
                                    <Tab label="Form Setting" value="2"/>
                                    <Tab label="ThanksPage Setting" value="3"/>
                                </TabList>
                            </Box>
                            <Box sx={{mr: 2}}>
                                <SaveSetting/>
                            </Box>
                        </Box>


                        {/*<Box sx={{mr: 3}}>*/}
                        {/*    <SaveSetting/>*/}
                        {/*</Box>*/}
                        {/*</Card>*/}
                    </Grid>
                    <Box sx={{width: '100%'}}>
                        <TabPanel value="1" sx={{width: '100%'}}>{configSetting}</TabPanel>
                        <TabPanel value="2">{formSetting}</TabPanel>
                        <TabPanel value="3">{thanksSetting}</TabPanel>
                    </Box>


                </Grid>
            </TabContext>
            {/*</Box>*/}
            {/*</Container>*/}
            {/*</Box>*/}

            {/*</ValidatorForm>*/}
        </>
    );
};

export default Setting;
