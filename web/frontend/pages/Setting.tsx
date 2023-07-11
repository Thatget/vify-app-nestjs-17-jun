import SettingComponentSet from '../components/Setting/SettingComponentSet'
import React, {useContext} from 'react'
import SettingComponentPreview from '../components/Setting/SettingComponentPreview'
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import {actions, StoreContext} from '../store'
import Button from "@mui/material/Button";
import {payloadObject} from "../store/actions";

const Setting = () => {
    const {state, dispatch} = useContext(StoreContext)
    const setSection = (sections: payloadObject[]) => {
        sections.map(section => {
            dispatch(actions.setSettingTab(section))
        })
    }

    // const setting = {};
    // const {
    //   data,
    //   refetch: refetchQuote,
    //   isLoading: isLoadingQuote,
    //   isRefetching: isRefetchingQuote,
    // } = useAppQuery({
    //   url: "/api/quote-entity",
    //     reactQueryOptions: {
    //       onSuccess: () => {
    //         if(data) {
    //           data.map((entity: any) => {
    //             switch (entity.name) {
    //               case 'name':
    //                 setting.name_title = entity.label||'';
    //                 setting.name_placeholder = entity.value||'';
    //                 break;
    //               case 'email':
    //                 setting.email_title = entity.label||'';
    //                 setting.email_placeholder = entity.value||'';
    //                 break;
    //               case 'message':
    //                 setting.massage_title = entity.label||'';
    //                 setting.massage_placeholder = entity.value||'';
    //                 break;
    //
    //               default:
    //                 setting[entity.name] = entity.value;
    //                 break;
    //             }
    //           })
    //           dispatch(actions.setInitSetting(setting));
    //         }
    //       }
    //     },
    //   });
    //
    //   console.log("data: ", data)
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
    return (
        <React.Fragment>
            {/*<Box sx={{flexDirection: 'row', flexWrap: 'wrap'}}>*/}
            <Grid container spacing={1} sx={{}}>
                <Grid container item sx={{mt: 1, position: "fixed", justifyContent: "flex-end", width: "100%"}}>
                    <Box sx={{display: "flex", justifyContent: "flex-end", alignItems: "flex-end"}}>
                        {/*// <Card variant="outlined" sx={{ display:"flex" ,justifyContent:"flex-end" ,alignItems :"flex-end" }} >*/}
                        <Button variant="contained" sx={{m: 0.2}}
                                onClick={() => {
                                    console.log("click")
                                    !state.settingTab.includes('configSetting') ?
                                        setSection([
                                            {add: true, tab: 'configSetting'},
                                            {add: false, tab: 'formSetting'},
                                            {add: false, tab: 'thanksSetting'}
                                        ])
                                        :
                                        setSection([
                                            {add: false, tab: 'formSetting'},
                                            {add: true, tab: 'configSetting'},
                                            {add: false, tab: 'thanksSetting'}
                                        ])
                                }}
                        >General Setting</Button>
                        <Button variant="contained" sx={{m: 0.2}}
                                onClick={() => {
                                    console.log("click")
                                    !state.settingTab.includes('formSetting') ?
                                        setSection([
                                            {add: true, tab: 'formSetting'},
                                            {add: false, tab: 'configSetting'},
                                            {add: false, tab: 'thanksSetting'}
                                        ])
                                        :
                                        setSection([
                                            {add: true, tab: 'formSetting'},
                                            {add: false, tab: 'configSetting'},
                                            {add: false, tab: 'thanksSetting'}
                                        ])
                                }}
                        >Form Fields</Button>
                        <Button variant="contained" sx={{m: 0.2}}
                                onClick={() => {
                                    console.log("click")
                                    !state.settingTab.includes('thanksSetting') ?
                                        setSection([
                                            {add: true, tab: 'thanksSetting'},
                                            {add: false, tab: 'configSetting'},
                                            {add: false, tab: 'formSetting'}
                                        ])
                                        :
                                        setSection([
                                            {add: true, tab: 'thanksSetting'},
                                            {add: false, tab: 'configSetting'},
                                            {add: false, tab: 'formSetting'}
                                        ])
                                }}
                        >Thanks Page Setting</Button>
                        {/*</Card>*/}
                    </Box>
                </Grid>
                <Grid container item spacing={1} sx={{mt: 6.2, mx: 0.5, width: '100%'}}>
                    <Grid item xs={7} sx={{width: '100%'}}>
                        <div style={{
                            maxHeight: '80vh',
                            position: 'fixed',
                            width: '57%',
                            overflow: "auto",
                        }}>
                            <Card variant="outlined">{settingComponentSet}</Card>
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <div style={{maxHeight: '80vh', position: 'fixed', overflow: "auto"}}>
                            <Card variant="outlined">{settingComponentPreview}</Card>
                        </div>
                    </Grid>
                </Grid>

            </Grid>
            {/*</Box>*/}


        </React.Fragment>
    )
}

export default Setting
