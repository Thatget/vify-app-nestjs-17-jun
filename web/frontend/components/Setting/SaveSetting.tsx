import React, { type ReactElement, useContext, useState, useCallback } from 'react'
import { StoreContext, actions } from '../../store'
import { useAuthenticatedFetch } from '../../hooks'
import { ContextualSaveBar, Toast, Loading } from '@shopify/polaris'

interface SaveSettingProps {
  fetchQuoteEntity: () => Promise<void>
}

const SaveSetting = ({ fetchQuoteEntity }: SaveSettingProps): ReactElement | null => {
  const { state, dispatch } = useContext(StoreContext)
  const setting = state.setting
  const currentSetting = state.currentSetting
  // console.log('localConfigSetting- save',localConfigSetting)
  console.log('state.setting - save', state.setting)
  console.log('state.currentSetting-save', state.currentSetting)
  const [isLoading, setIsLoading] = useState(false)
  const [active, setActive] = useState(false)
  const [activeToastUnchanged, setActiveToastUnchanged] = useState(false)
  const toggleActive = useCallback(() => {
    setActive((active) => !active)
  }, [])
  const toggleActiveToastUnchanged = useCallback(() => {
    setActiveToastUnchanged((activeToastUnchanged) => !activeToastUnchanged)
  }, [])
  const toastMarkup = active
    ? (
      <Toast content="Save Successfully" onDismiss={toggleActive}/>
      )
    : null
  const unsavedMarkup = activeToastUnchanged
    ? (
      <Toast content="Discarded Changes" onDismiss={toggleActiveToastUnchanged}/>
      )
    : null
  const loadingMarkup = isLoading
    ? (
    <Loading />
      )
    : null

  const fetch = useAuthenticatedFetch()
  const unchangeSetting = (): void => {
    dispatch(actions.resetNewSetting())
  }
  const updateSetting = async (): Promise<void> => {
    const dataPost: unknown[] = []
    let changedName = false
    let changeNamePlaceholder = false
    let changedEmail = false
    let changeEmailPlaceholder = false
    let changedMessage = false
    let changeMessagePlaceholder = false
    let changedHidePrice = false
    let changedHideByNow = false
    let changedRequestQuote = false
    let changeThankTitle = false
    let changeThankContent = false
    let changeShoppingButton = false
    let changeFormTitle = false
    let changeAddToCart = false
    let changeAllProducts = false
    let defaultName = { name: 'name', value: setting !== undefined ? setting.name : '' }
    let defaultEmail = { name: 'email', value: setting !== undefined ? setting.email_title : '' }
    let defaultEmailPlaceholder = {
      name: 'email_placeholder',
      value: setting !== undefined ? setting.email_placeholder : ''
    }
    let defaultMessage = {
      name: 'message_title',
      value: setting !== undefined ? setting.message_title : ''
    }
    let defaultMessagePlaceholder = {
      name: 'message_placeholder',
      value: setting !== undefined ? setting.message_placeholder : ''
    }
    let defaultNamePlaceholder = {
      name: 'name_placeholder',
      value: setting !== undefined ? setting.name_placeholder : ''
    }

    let defaultHidePrice = {
      name: 'hide_price',
      value: setting !== undefined ? setting.hide_price : ''
    }
    let defaultHideByNow = {
      name: 'hide_buy_now',
      value: setting !== undefined ? setting.hide_buy_now : ''
    }
    let defaultRequestQuote = {
      name: 'show_request_for_quote',
      value: setting !== undefined ? setting.show_request_for_quote : ''
    }
    let defaultFormTitle = {
      name: 'form_title',
      value: setting !== undefined ? setting.form_title : ''
    }
    let defaultThankTitle = { name: 'thank_title', value: setting !== undefined ? setting.thank_title : '' }
    let defaultThankContent = { name: 'thank_content', value: setting !== undefined ? setting.thank_content : '' }
    let defaultContinueShoppingButton = {
      name: 'shopping_button',
      value: setting !== undefined ? setting.shopping_button : ''
    }
    let defaultAddToCart = { name: 'hide_add_to_cart', value: setting !== undefined ? setting.hide_add_to_cart : '' }
    let defaultAllProducts = { name: 'all_product', value: setting !== undefined ? setting.all_product : '' }
    if (currentSetting !== undefined) {
      Object.entries(currentSetting).forEach(([key, value]) => {
        switch (key) {
          case 'name':
            if (value !== setting?.name) {
              defaultName = { ...defaultName, value }
              changedName = true
            }
            break
          case 'name_placeholder':
            if (value !== setting?.name_placeholder) {
              defaultNamePlaceholder = { ...defaultNamePlaceholder, value }
              changeNamePlaceholder = true
            }
            break
          case 'email':
            if (value !== setting?.email_title) {
              defaultEmail = { ...defaultEmail, value }
              changedEmail = true
            }
            break
          case 'email_placeholder':
            if (value !== setting?.email_placeholder) {
              defaultEmailPlaceholder = { ...defaultEmailPlaceholder, value }
              changeEmailPlaceholder = true
            }
            break
          case 'message_title':
            if (value !== setting?.message_title) {
              defaultMessage = { ...defaultMessage, value }
              changedMessage = true
            }
            break

          case 'message_placeholder':
            if (value !== setting?.message_placeholder) {
              defaultMessagePlaceholder = { ...defaultMessagePlaceholder, value }
              changeMessagePlaceholder = true
            }
            break
          case 'hide_price':
            console.log('case hide price')
            if (value !== setting?.hide_price) {
              defaultHidePrice = { ...defaultHidePrice, value }
              changedHidePrice = true
            }
            break
          case 'hide_buy_now':
            if (value !== setting?.hide_buy_now) {
              defaultHideByNow = { ...defaultHideByNow, value }
              changedHideByNow = true
            }
            break
          case 'show_request_for_quote':
            if (value !== setting?.show_request_for_quote) {
              defaultRequestQuote = { ...defaultRequestQuote, value }
              changedRequestQuote = true
            }
            break
          case 'thank_title':
            if (value !== setting?.thank_title) {
              defaultThankTitle = { ...defaultThankTitle, value }
              changeThankTitle = true
            }
            break
          case 'thank_content':
            if (value !== setting?.thank_content) {
              defaultThankContent = { ...defaultThankContent, value }
              changeThankContent = true
            }
            break
          case 'shopping_button':
            if (value !== setting?.shopping_button) {
              defaultContinueShoppingButton = { ...defaultContinueShoppingButton, value }
              changeShoppingButton = true
            }
            break
          case 'all_product':
            console.log('case of All_product', value)
            if (value !== setting?.all_product) {
              defaultAllProducts = { ...defaultAllProducts, value }
              changeAllProducts = true
            }
            break
          case 'form_title':
            if (value !== setting?.form_title) {
              defaultFormTitle = { ...defaultFormTitle, value }
              changeFormTitle = true
            }
            break
          case 'hide_add_to_cart':
            if (value !== setting?.hide_add_to_cart) {
              defaultAddToCart = { ...defaultAddToCart, value }
              changeAddToCart = true
            }
            break
          default:
            if (currentSetting[key] !== setting[key]) {
              dataPost.push({ name: key, value: currentSetting !== undefined ? currentSetting[key] : (setting !== undefined ? setting[key] : '') })
            }
            break
        }
      })
      if (changedName) {
        dataPost.push(defaultName)
      }
      if (changeNamePlaceholder) {
        dataPost.push(defaultNamePlaceholder)
      }
      if (changedEmail) {
        dataPost.push(defaultEmail)
      }
      if (changeEmailPlaceholder) {
        dataPost.push(defaultEmailPlaceholder)
      }
      if (changedMessage) {
        dataPost.push(defaultMessage)
      }
      if (changeMessagePlaceholder) {
        dataPost.push(defaultMessagePlaceholder)
      }
      if (changedHidePrice) {
        dataPost.push(defaultHidePrice)
      }
      if (changedHideByNow) {
        dataPost.push(defaultHideByNow)
      }
      if (changedRequestQuote) {
        dataPost.push(defaultRequestQuote)
      }
      if (changeThankTitle) {
        dataPost.push(defaultThankTitle)
      }
      if (changeThankContent) {
        dataPost.push(defaultThankContent)
      }
      if (changeShoppingButton) {
        dataPost.push(defaultContinueShoppingButton)
      }
      if (changeFormTitle) {
        dataPost.push(defaultFormTitle)
      }
      if (changeAddToCart) {
        dataPost.push(defaultAddToCart)
      }
      if (changeAllProducts) {
        console.log('all product has changed')
        dataPost.push(defaultAllProducts)
      }
      await fetch('/api/quote-entity', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataPost)
      })
      void fetchQuoteEntity()
    }
    toggleActive()
  }

  return (
    <>
      { Boolean(state.currentSetting !== null) &&
        <ContextualSaveBar
          alignContentFlush
          message="Save changes"
          saveAction={
            {
              onAction: () => {
                void updateSetting()
                toggleActive()
              },
              loading: false
            }
          }
          discardAction={{
            onAction: () => {
              unchangeSetting()
              toggleActiveToastUnchanged()
            }
          }}
        />}
      {toastMarkup}
        {loadingMarkup}
        {unsavedMarkup}
    </>
  )
}

export default SaveSetting
