import React, { useEffect, useState } from 'react'
import { LegacyCard, TextField } from '@shopify/polaris'

type FormSetting = {
  name_title: string;
  name_placeholder: string;
  email_title: string;
  email_placeholder: string;
  message_title: string;
  massage_placeholder: string;
}

interface FormSettingProps {
  formSetting: FormSetting
}

const defaultFormSetting = { name_title: '', name_placeholder: '', email_title: '', email_placeholder: '', message_title: '', massage_placeholder: ''};

const FormSetting: React.FC<FormSettingProps> = ({ formSetting }) => {
  const [localFormSetting, setLocalFormSetting] = useState<FormSetting>(defaultFormSetting)
  useEffect(() => {
    setLocalFormSetting({...formSetting})
  })
  return (
    <div>
      <LegacyCard.Section title={"Field Name"}>
        <TextField label="Title" onChange={() => {}} autoComplete="off" />
        <TextField
          type="text"
          label="Placeholder"
          value={localFormSetting.name_title}
          onChange={() => {}}
          autoComplete="email"
        />
        <TextField label="Email Title" onChange={() => {}} autoComplete="off" />
        <TextField
          type="text"
          label="Placeholder"
          onChange={() => {}}
          autoComplete="email"
        />
      </LegacyCard.Section>
      <LegacyCard.Section title={"Form page"}>
        <TextField label="Name" onChange={() => {}} autoComplete="off" />
        <TextField
          type="text"
          label="Account email"
          onChange={() => {}}
          autoComplete="email"
        />
      </LegacyCard.Section>
    </div>
  )
}
export default FormSetting
