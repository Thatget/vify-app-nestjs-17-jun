import SettingComponentSet from '../components/Setting/SettingComponentSet'
import React, { useContext } from 'react'
import SettingComponentPrevew from '../components/Setting/SettingComponentPreview'
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SettingComponentPreview from "../components/Setting/SettingComponentPreview";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ProductSelector from "../components/ProductSelector";

import { useAppQuery } from '../hooks'
import { StoreContext, actions } from '../store'
import { StoreContextType } from '../store/type'

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
    <>
      <React.Fragment>
        <br/>
        <Container>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <Card variant="outlined">{settingComponentSet}</Card>
              <SettingComponentSet />
          </Grid>
          <Grid item xs={4} >
            <Card variant="outlined">{settingComponentPreview}</Card>
            <SettingComponentPreview />
        </Grid>
          </Grid>

          {/*<Box sx={{minWidth: 275}}>*/}
          {/*  <Card variant="outlined">{selectProducts}</Card>*/}
          {/*</Box>*/}
          {/*<br/>*/}
        </Container>
      </React.Fragment>
      {/*<Grid>*/}
      {/*  <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>*/}
      {/*    */}
      {/*  </Grid.Cell>*/}
      {/*  <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>*/}
      {/*    */}
      {/*  </Grid.Cell>*/}
      {/*</Grid>*/}
    </>
  )
}

export default Setting
