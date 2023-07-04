import { LegacyCard, LegacyStack, Collapsible, Icon, Divider, Button } from '@shopify/polaris';
import { ChevronDownMinor, ChevronUpMinor } from '@shopify/polaris-icons';
import { useState } from 'react';
import ConfigSetting from './ConfigSetting';
import FormSetting from './FormSetting';
import SaveSetting from './SaveSetting';
import Box from "@mui/material/Box"

const SettingComponentSet = () => {
  const [section, setSection] = useState('configSetting');

  return (
    <>
      {/*<LegacyCard sectioned>*/}
      {/*  <LegacyStack vertical>*/}
      <Box>
          <div 
            style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }}
            onClick={() => {section !== 'configSetting' ? setSection('configSetting') : setSection('') }} >
            General
            <div>
              <Icon source={ (section === 'configSetting') ? ChevronDownMinor : ChevronUpMinor } color="base" />
            </div>
          </div>
        <Divider borderColor="border-inverse" borderWidth='2' />
          <Collapsible
            open={(section === 'configSetting') ? true : false }
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
            onClick={() => {section !== 'formField' ? setSection('formField') : setSection('') }} >
            FormField
            <div>
              <Icon source={ (section === 'formField') ? ChevronDownMinor : ChevronUpMinor } color="base" />
            </div>
          </div>
        <Divider borderColor="border-inverse" borderWidth='2' />
          <Collapsible
            open={(section === 'formField') ? true : false }
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
