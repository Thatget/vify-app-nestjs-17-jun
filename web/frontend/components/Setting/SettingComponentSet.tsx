import {
  LegacyCard,
  LegacyStack,
  Button,
  Collapsible,
  TextContainer,
  Link,
} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import ConfigSetting from './ConfigSetting';

const SettingComponentSet = () => {
  const [open, setOpen] = useState(true);

  const handleToggle = useCallback(() => setOpen((open) => !open), []);

  return (
    <div style={{height: '200px'}}>
      <LegacyCard sectioned>
        <LegacyStack vertical>
          <Button
            onClick={handleToggle}
            ariaExpanded={open}
            fullWidth
            ariaControls="basic-collapsible"
          >
            General
          </Button>
          <Collapsible
            open={open}
            id="basic-collapsible"
            transition={{duration: '500ms', timingFunction: 'ease-in-out'}}
            expandOnPrint
          >
            <ConfigSetting />
          </Collapsible>
        </LegacyStack>
      </LegacyCard>
    </div>
  )
}

export default SettingComponentSet
