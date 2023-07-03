import React, { useContext } from 'react'
import { Grid, Page } from '@shopify/polaris'
import SettingComponentSet from '../components/Setting/SettingComponentSet'
import SettingComponentPrevew from '../components/Setting/SettingComponentPrevew'
import { useAppQuery } from '../hooks'
import { StoreContext, actions } from '../store'

const Setting = () => {

  const { state, dispatch} = useContext<StoreContextType>(StoreContext);
  const setting = {};
  const {
    data,
    refetch: refetchQuote,
    isLoading: isLoadingQuote,
    isRefetching: isRefetchingQuote,
  } = useAppQuery({
    url: "/api/quote-entity",
      reactQueryOptions: {
        onSuccess: () => {
          if(data) {
            data.map((entity: any) => {
              switch (entity.name) {
                case 'name':
                  setting.name_title = entity.label||'';
                  setting.name_placeholder = entity.value||'';
                  break;
                case 'email':
                  setting.email_title = entity.label||'';
                  setting.email_placeholder = entity.value||'';
                  break;
                case 'message':
                  setting.massage_title = entity.label||'';
                  setting.massage_placeholder = entity.value||'';
                  break;
                
                default:
                  setting[entity.name] = entity.value;
                  break;
              }
            })
            dispatch(actions.setInitSetting(setting));
          }
        }
      },
    });
  
    console.log("data: ", data)

  return (
    <Page fullWidth>
      <Grid>
        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
          <SettingComponentSet />
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
          <SettingComponentPrevew />
        </Grid.Cell>
      </Grid>
    </Page>
  )
}

export default Setting
