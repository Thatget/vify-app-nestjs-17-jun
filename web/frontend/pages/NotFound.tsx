import React from 'react'
import { Card, EmptyState, Page } from '@shopify/polaris'
import { useTranslation } from 'react-i18next'
import { notFoundImage } from '../assets/index'

interface Props {}

const NotFound = (props: Props) => {
  const { t } = useTranslation()
  return (
    <Page>
      <Card>
        <Card.Section>
          <EmptyState heading={t('NotFound.heading')} image={notFoundImage}>
            <p>{t('NotFound.description')}</p>
          </EmptyState>
        </Card.Section>
      </Card>
    </Page>
  )
}

export default NotFound
