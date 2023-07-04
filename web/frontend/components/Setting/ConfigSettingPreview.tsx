// import React, { useContext } from 'react'
import * as React from 'react';
// import { StoreContext } from '../../store'
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { StoreContext } from '../../store';

const ConfigSettingPreview = () => {
  // const [state] = useContext(StoreContext);
  // const testData = state.currentSetting.hide_price || false;
  const test = (
      <>
          <Typography variant="body1" >
            <b>Test Data </b>
          </Typography>
          <br/>
      </>
  );

  const {state} = React.useContext(StoreContext);
  const testData = state.currentSetting.hide_price || false;
  return (
      <>
      <React.Fragment>
        <br/>
          <Box sx={{minWidth: 275}}>
              <Typography variant="body1" >
                  <b>Test Data </b>
              </Typography>
          </Box>
          <br/>
      </React.Fragment>
      </>
  )
}

export default ConfigSettingPreview
