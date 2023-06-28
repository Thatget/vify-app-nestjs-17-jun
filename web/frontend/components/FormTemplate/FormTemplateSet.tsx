import { FormLayout, LegacyCard, LegacyTabs, TextField } from '@shopify/polaris'
import React from 'react'

type Props = {}

const FormTemplateSet = (props: Props) => {
  return (
    <>
      <FormLayout>
        <LegacyCard>
          <LegacyCard.Section title={"Form setting"}>
            <TextField label="Name" onChange={() => {}} autoComplete="off" />
            <TextField
              type="email"
              label="Account email"
              onChange={() => {}}
              autoComplete="email"
            />
          </LegacyCard.Section>
          <LegacyCard.Section title={"Form page"}>
            <TextField label="Name" onChange={() => {}} autoComplete="off" />
            <TextField
              type="email"
              label="Account email"
              onChange={() => {}}
              autoComplete="email"
            />
          </LegacyCard.Section>
          <LegacyCard.Section title={"Thank you page"}>
            <TextField label="Name" onChange={() => {}} autoComplete="off" />
            <TextField
              type="email"
              label="Account email"
              onChange={() => {}}
              autoComplete="email"
            />
          </LegacyCard.Section>
        </LegacyCard>
      </FormLayout>
    </>
  )
}

export default FormTemplateSet