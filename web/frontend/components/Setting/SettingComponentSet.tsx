import {Collapsible} from '@shopify/polaris';
import {ChevronDownMinor, ChevronUpMinor} from '@shopify/polaris-icons';
import * as React from 'react';
import {useContext, useState} from 'react';
import ConfigSetting from './ConfigSetting';
import FormSetting from './FormSetting';
import Box from "@mui/material/Box"
import {actions, StoreContext} from '../../store';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {payloadObject} from "../../store/actions";
import ListItemButton from "@mui/material/ListItemButton";
import ThanksFormSetting from "./ThanksFormSetting";
import List from '@mui/material/List'

export const showColor: object = {
    width: '100%',
    bgcolor: ''
}

export const hideColor: object = {
    width: '100%',
    bgcolor: 'secondary.light'
}
export const hover: object = {
    "&.Mui-selected": {
        backgroundColor: "#2979ff"
    },
    ":hover": {
        backgroundColor: "#2979ff"
    },
}
export const buttonColor: object = {
    marginLeft: "auto",

}


const SettingComponentSet = () => {
    const [selected, setSelected] = useState(false)
    const [generalSetting, setGeneralSetting] = useState(false)
    const {state, dispatch} = useContext(StoreContext)
    const setSection = (section: payloadObject) => {
        dispatch(actions.setSettingTab(section))
    }

    return (
        <>
            <Box sx={{display: '', flexWrap: 'wrap'}}>
                <div
                    style={{display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center'}}
                    onClick={() => {
                        state.settingTab.includes('configSetting') ? setSection({
                            add: false,
                            tab: 'configSetting'
                        }) : setSection({add: true, tab: 'configSetting'})
                    }}>
                    <ListItemButton
                        sx={state.settingTab.includes('configSetting')?showColor:hideColor}>
                        <Typography variant="body2">General Setting</Typography>
                        {state.settingTab.includes('configSetting') && <Button sx={{marginLeft: "auto"}}>
                            <Typography variant="body2">Hide</Typography>
                        </Button>}
                        {!state.settingTab.includes('configSetting') && <Button sx={{marginLeft: "auto"}}>
                            <Typography variant="body2">Show</Typography>
                        </Button>}
                    </ListItemButton>

                </div>
                <Collapsible
                    open={(state.settingTab.includes('configSetting')) ? true : false}
                    id="basic-collapsible"
                    transition={{duration: '500ms', timingFunction: 'ease-in-out'}}
                    expandOnPrint
                >
                    <ConfigSetting/>
                </Collapsible>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        alignItems: 'center'
                    }}
                    onClick={() => {
                        state.settingTab.includes('formField') ? setSection({
                            add: false,
                            tab: 'formField'
                        }) : setSection({add: true, tab: 'formField'})
                    }}>
                    {/*<ListItemButton*/}
                    {/*    sx={state.settingTab.includes('formField')?showColor:hideColor}>*/}
                    {/*    <Typography variant="body2">Form Fields</Typography>*/}
                    {/*    {state.settingTab.includes('formField') && <Button sx={{marginLeft: "auto"}}>*/}
                    {/*        <Typography variant="body2">Hide</Typography>*/}
                    {/*    </Button>}*/}
                    {/*    {!state.settingTab.includes('formField') && <Button sx={{marginLeft: "auto"}}>*/}
                    {/*        <Typography variant="body2">Show</Typography>*/}
                    {/*    </Button>}*/}
                    {/*</ListItemButton>*/}
                </div>
                <div>
                    <Collapsible
                        open={state.settingTab.includes('formField') ? true : false}
                        id="basic-collapsible"
                        transition={{duration: '500ms', timingFunction: 'ease-in-out'}}
                        expandOnPrint
                    >
                        <FormSetting/>
                    </Collapsible>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        alignItems: 'center'
                    }}
                    onClick={() => {
                        state.settingTab.includes('thanksForm') ? setSection({
                            add: false,
                            tab: 'thanksForm'
                        }) : setSection({add: true, tab: 'thanksForm'})
                    }}>

                    {/*<ListItemButton*/}
                    {/*    sx={state.settingTab.includes('thanksForm')?showColor:hideColor}>*/}
                    {/*    <Typography variant="body2">Thanks Page Setting</Typography>*/}
                    {/*    {state.settingTab.includes('thanksForm') && <Button sx={{marginLeft: "auto"}}>*/}
                    {/*        <Typography variant="body2">Hide</Typography>*/}
                    {/*    </Button>}*/}
                    {/*    {!state.settingTab.includes('thanksForm') && <Button sx={{marginLeft: "auto"}}>*/}
                    {/*        <Typography variant="body2">Show</Typography>*/}
                    {/*    </Button>}*/}
                    {/*</ListItemButton>*/}
                </div>
                <div style={{ marginTop: 4}}>
                    <Collapsible
                        open={state.settingTab.includes('thanksForm') ? true : false}
                        id="basic-collapsible"
                        transition={{duration: '500ms', timingFunction: 'ease-in-out'}}
                        expandOnPrint
                    >
                        <ThanksFormSetting/>
                    </Collapsible>
                </div>
            </Box>

        </>
    )
}

export default SettingComponentSet
