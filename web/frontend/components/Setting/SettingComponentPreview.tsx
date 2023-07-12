import React, {useContext} from 'react'
import ConfigSettingPreview from './ConfigSettingPreview'
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import {actions, StoreContext} from "../../store";
import FormSettingPreview from "./FormSettingPreview";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ConfigSetting from "./ConfigSetting";
import {payloadObject} from "../../store/actions";
import {Collapsible} from '@shopify/polaris';
import ThanksPagePreview from "./ThanksPagePreview";
import {hideColor, showColor} from "./SettingComponentSet";

// interface SettingComponentPrevewProps {
//   setting: Setting;
// }

// const SettingComponentPrevew: React.FC<SettingComponentPrevewProps>  = ({setting}) => {
//   return (
//     <div>

//     </div>
//   )
// }
// const SettingComponentPrevew = () => {
//     const {state} = useContext(StoreContext);
//     const tab = state.settingTab || 'configSetting';
//     if (tab === 'configSetting') {
//         return <ConfigSettingPreview/>;
//     } else if (tab === 'formField') {
//         return <FormSettingPreview/>;
//     }
// }

const SettingComponentPreview = () => {
    const {state, dispatch} = useContext(StoreContext)
    const setSection = (section: payloadObject) => {
        dispatch(actions.setSettingTab(section))
    }

    return (
        <Box sx={{mr: 0.5, width: '100%'}}>
            {/*<Box sx={{display: '', flexWrap: 'wrap'}}>*/}
            {/*<div*/}
            {/*    style={{display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center'}}*/}
            {/*    onClick={() => {*/}
            {/*        state.settingTab.includes('configSetting') ? setSection({*/}
            {/*            add: false,*/}
            {/*            tab: 'configSetting'*/}
            {/*        }) : setSection({add: true, tab: 'configSetting'})*/}
            {/*    }}>*/}

            {/*<ListItemButton*/}
            {/*    sx={state.settingTab.includes('configSetting')?showColor:hideColor}>*/}
            {/*    <Typography variant="body2">General Setting Preview</Typography>*/}
            {/*    {state.settingTab.includes('configSetting') && <Button sx={{marginLeft: "auto"}}>*/}
            {/*        <Typography variant="body2">Hide</Typography>*/}
            {/*    </Button>}*/}
            {/*    {!state.settingTab.includes('configSetting') && <Button sx={{marginLeft: "auto"}}>*/}
            {/*        <Typography variant="body2">Show</Typography>*/}
            {/*    </Button>}*/}
            {/*</ListItemButton>*/}
            {/*</div>*/}
            {/*<Collapsible*/}
            {/*    open={(state.settingTab.includes('configSetting')) ? true : false}*/}
            {/*    id="basic-collapsible"*/}
            {/*    transition={{duration: '500ms', timingFunction: 'ease-in-out'}}*/}
            {/*    expandOnPrint*/}
            {/*>*/}
            {state.settingTab.includes('configSetting') && <ConfigSettingPreview/>}
            {/*</Collapsible>*/}
            {/*<Box sx={{display: '', flexWrap: 'wrap'}}>*/}
            {/*    /!*<div*!/*/}
            {/*    /!*    style={{display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center'}}*!/*/}
            {/*    /!*    onClick={() => {*!/*/}
            {/*    /!*        state.settingTab.includes('formField') ? setSection({*!/*/}
            {/*    /!*            add: false,*!/*/}
            {/*    /!*            tab: 'formField'*!/*/}
            {/*    /!*        }) : setSection({add: true, tab: 'formField'})*!/*/}
            {/*    /!*    }}>*!/*/}

            {/*        /!*<ListItemButton*!/*/}
            {/*        /!*    sx={state.settingTab.includes('formField')?showColor:hideColor}>*!/*/}
            {/*        /!*    <Typography variant="body2">Form Setting Preview</Typography>*!/*/}
            {/*        /!*    {state.settingTab.includes('formField') && <Button sx={{marginLeft: "auto"}}>*!/*/}
            {/*        /!*        <Typography variant="body2">Hide</Typography>*!/*/}
            {/*        /!*    </Button>}*!/*/}
            {/*        /!*    {!state.settingTab.includes('formField') && <Button sx={{marginLeft: "auto"}}>*!/*/}
            {/*        /!*        <Typography variant="body2">Show</Typography>*!/*/}
            {/*        /!*    </Button>}*!/*/}
            {/*        /!*</ListItemButton>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*    /!*<Collapsible*!/*/}
            {/*    /!*    open={(state.settingTab.includes('formField')) ? true : false}*!/*/}
            {/*    /!*    id="basic-collapsible"*!/*/}
            {/*    /!*    transition={{duration: '500ms', timingFunction: 'ease-in-out'}}*!/*/}
            {/*    /!*    expandOnPrint*!/*/}
            {/*    /!*>*!/*/}
            {/*        <FormSettingPreview/>*/}
            {state.settingTab.includes('formSetting') && <FormSettingPreview/>}
            {/*    </Collapsible>*/}
            {/*</Box>*/}
            {/*<Box sx={{display: '', flexWrap: 'wrap'}}>*/}
            {/*    <div*/}
            {/*        style={{display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center'}}*/}
            {/*        onClick={() => {*/}
            {/*            state.settingTab.includes('thanksForm') ? setSection({*/}
            {/*                add: false,*/}
            {/*                tab: 'thanksForm'*/}
            {/*            }) : setSection({add: true, tab: 'thanksForm'})*/}
            {/*        }}>*/}

            {/*<ListItemButton*/}
            {/*    sx={state.settingTab.includes('thanksForm')?showColor:hideColor}>*/}
            {/*    <Typography variant="body2">Form Setting Preview</Typography>*/}
            {/*    {state.settingTab.includes('thanksForm') && <Button sx={{marginLeft: "auto"}}>*/}
            {/*        <Typography variant="body2">Hide</Typography>*/}
            {/*    </Button>}*/}
            {/*    {!state.settingTab.includes('thanksForm') && <Button sx={{marginLeft: "auto"}}>*/}
            {/*        <Typography variant="body2">Show</Typography>*/}
            {/*    </Button>}*/}
            {/*</ListItemButton>*/}
            {/*</div>*/}
            {/*<Collapsible*/}
            {/*    open={(state.settingTab.includes('thanksForm')) ? true : false}*/}
            {/*    id="basic-collapsible"*/}
            {/*    transition={{duration: '500ms', timingFunction: 'ease-in-out'}}*/}
            {/*    expandOnPrint*/}
            {/*>*/}
            {/*<ThanksPagePreview/> */}
            {state.settingTab.includes('thanksSetting') && <ThanksPagePreview/>}
            {/*</Collapsible>*/}
            {/*</Box>*/}

        </Box>
    );
}

export default SettingComponentPreview
