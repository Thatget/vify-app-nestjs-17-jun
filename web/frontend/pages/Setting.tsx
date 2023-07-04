import React from 'react'
import SettingComponentSet from '../components/Setting/SettingComponentSet'
import SettingComponentPrevew from '../components/Setting/SettingComponentPreview'
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SettingComponentPreview from "../components/Setting/SettingComponentPreview";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ProductSelector from "../components/ProductSelector";

const Setting = () => {
  const settingComponentSet = (
      <React.Fragment>
        <CardContent>
          <SettingComponentSet />
        </CardContent>
      </React.Fragment>
  );
  const settingComponentPreview = (
      <React.Fragment>
        <CardContent>
          <SettingComponentPreview />
        </CardContent>
      </React.Fragment>
  );


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
