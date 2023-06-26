import {LegacyCard, Tabs} from '@shopify/polaris';
import {useState, useCallback} from 'react';

import React from 'react'

type Props = {}

const Setting = (props: Props) => {
  const [selected, setSelected] = useState<number>(0);

  const handleTabChange = useCallback(
    
    (selectedTabIndex: number) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'all-customers-1',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-content-1',
    },
    {
      id: 'prospects-1',
      content: 'Prospects',
      panelID: 'prospects-content-1',
    },
  ];

  return (
    <>
    <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
      <LegacyCard.Section title={tabs[selected].content}>
        <p>Tabselected</p>
      </LegacyCard.Section>
    </Tabs>
    </>
  );
}

export default Setting
