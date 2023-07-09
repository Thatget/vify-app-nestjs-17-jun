import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SettingComponentSet from './SettingComponentSet';
// import SettingComponentPrevew from './SettingComponentPreview';
import SettingComponentPreview from "./SettingComponentPreview";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const SettingComponent = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Item>
            <SettingComponentSet />
          </Item>
        </Grid>
        <Grid item xs={12} md={8} >
          <SettingComponentPreview />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SettingComponent
