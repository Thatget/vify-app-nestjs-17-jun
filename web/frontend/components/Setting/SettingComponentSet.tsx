import { LegacyCard, LegacyStack, Collapsible, Icon, Divider, Button } from '@shopify/polaris';
import { ChevronDownMinor, ChevronUpMinor } from '@shopify/polaris-icons';
import { useContext, useState } from 'react';
import ConfigSetting from './ConfigSetting';
import FormSetting from './FormSetting';
import SaveSetting from './SaveSetting';
import Box from "@mui/material/Box"
import { StoreContext, actions } from '../../store';

const SettingComponentSet = () => {
  const {state, dispatch} = useContext(StoreContext)
  const setSection = (section: string) => {
    dispatch(actions.setSettingTab(section))
  }

  return (
    <>
      {/*<LegacyCard sectioned>*/}
      {/*  <LegacyStack vertical>*/}
      <Box>
          <div 
            style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }}
            onClick={() => {state.settingTab !== 'configSetting' ? setSection('configSetting') : setSection('') }} >
            General
            <div>
              <Icon source={ (state.settingTab === 'configSetting') ? ChevronDownMinor : ChevronUpMinor } color="base" />
            </div>
          </div>
        <Divider borderColor="border-inverse" borderWidth='2' />
          <Collapsible
            open={(state.settingTab === 'configSetting') ? true : false }
            id="basic-collapsible"
            transition={{duration: '500ms', timingFunction: 'ease-in-out'}}
            expandOnPrint
          >
            <ConfigSetting />
          </Collapsible>
        {/*</LegacyStack>*/}
        {/*<LegacyStack vertical>*/}
          <div 
            style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }}
            onClick={() => {state.settingTab !== 'formField' ? setSection('formField') : setSection('') }} >
            FormField
            <div>
              <Icon source={ (state.settingTab === 'formField') ? ChevronDownMinor : ChevronUpMinor } color="base" />
            </div>
          </div>
        <Divider borderColor="border-inverse" borderWidth='2' />
          <Collapsible
            open={(state.settingTab === 'formField') ? true : false }
            id="basic-collapsible"
            transition={{duration: '500ms', timingFunction: 'ease-in-out'}}
            expandOnPrint
          >
            <FormSetting />
          </Collapsible>
      {/*  </LegacyStack>*/}
      {/*</LegacyCard>*/}
      <SaveSetting />
      </Box>
    </>
  )
}

export default SettingComponentSet
