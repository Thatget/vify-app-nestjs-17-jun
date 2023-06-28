import * as React from 'react';
import SettingComponent from '../components/Setting/Index';
import FormTemplate from '../components/FormTemplate/Index';
import { Tabs } from '@shopify/polaris';
const Setting = () => {
  const [selected, setSelected] = React.useState(0);
  const handleTabChange = React.useCallback(
    (selectedTabIndex: number) => setSelected(selectedTabIndex),
    [],
  );
  const tabs = [
    {
      id: 'setting',
      content: 'Setting',
      accessibilityLabel: 'Setting',
      panelID: 'setting',
      children: <SettingComponent />,
    },
    {
      id: 'form',
      content: 'Form',
      accessibilityLabel: 'Form',
      panelID: 'form',
      children: <FormTemplate />,
    },
  ];

  return (
    <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
      { tabs[selected].children }
    </Tabs>
  );
}

export default Setting
