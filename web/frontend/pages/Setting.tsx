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
import settingComponentSet from "../components/Setting/SettingComponentSet";
import settingComponentPreview from "../components/Setting/SettingComponentPreview";
import Page from "@shopify/polaris"
import Button from "@mui/material/Button";

const Setting = () => {

  const { state, dispatch} = useContext<StoreContextType>(StoreContext);
  // const setting = {};
  // const {
  //   data,
  //   refetch: refetchQuote,
  //   isLoading: isLoadingQuote,
  //   isRefetching: isRefetchingQuote,
  // } = useAppQuery({
  //   url: "/api/quote-entity",
  //     reactQueryOptions: {
  //       onSuccess: () => {
  //         if(data) {
  //           data.map((entity: any) => {
  //             switch (entity.name) {
  //               case 'name':
  //                 setting.name_title = entity.label||'';
  //                 setting.name_placeholder = entity.value||'';
  //                 break;
  //               case 'email':
  //                 setting.email_title = entity.label||'';
  //                 setting.email_placeholder = entity.value||'';
  //                 break;
  //               case 'message':
  //                 setting.massage_title = entity.label||'';
  //                 setting.massage_placeholder = entity.value||'';
  //                 break;
  //
  //               default:
  //                 setting[entity.name] = entity.value;
  //                 break;
  //             }
  //           })
  //           dispatch(actions.setInitSetting(setting));
  //         }
  //       }
  //     },
  //   });
  //
  //   console.log("data: ", data)
  const settingComponentSet = (
        <CardContent>
          <SettingComponentSet />
        </CardContent>
  );
  const settingComponentPreview = (
      <CardContent>
        <SettingComponentPreview />
      </CardContent>
  );

  return (
    <React.Fragment >
        <Container sx={{ mx:1,mt:0.5,mb:1,width:'100%'}}>
            <Box sx={{ display:"flex" ,justifyContent:"flex-end" ,alignItems :"flex-end" }}>
                {/*// <Card variant="outlined" sx={{ display:"flex" ,justifyContent:"flex-end" ,alignItems :"flex-end" }} >*/}
                <Button variant="contained" sx={{ m:0.2}}>General Setting</Button>
                <Button variant="contained" sx={{ m:0.2}}>Form Fields</Button>
                <Button variant="contained" sx={{ m:0.2}}>Thanks Page Setting</Button>
                {/*</Card>*/}
            </Box>
          <Grid container spacing={1} sx={{ mt:0.2 }}>
            <Grid item xs={7}>
              <Card variant="outlined">{settingComponentSet}</Card>
          </Grid>
          <Grid item xs={5} >
            <Card variant="outlined">{settingComponentPreview}</Card>
        </Grid>
          </Grid>
        </Container>
    </React.Fragment>
  )
}

export default Setting
