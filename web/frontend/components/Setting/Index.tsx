import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SettingComponentSet from './SettingComponentSet';
import SettingComponentPrevew from './SettingComponentPrevew';
import Setting from '../../types/Setting';
import { useAppQuery } from '../../hooks';

const SettingComponent = () => {
  const [setting, setSetting] = React.useState<Setting>({})
  const {
    data,
    refetch: refetchQuote,
    isLoading: isLoadingQuote,
    isRefetching: isRefetchingQuote,
  } = useAppQuery({
    url: "/api/setting",
      reactQueryOptions: {
        onSuccess: () => {
          // setIsLoading(false);
        }
      },
    });
    console.log(data)
  const handleSubmit: () => any = () => {
    console.log(setting)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <SettingComponentSet setting={setting} handleSubmit={() => handleSubmit()} />
        </Grid>
        <Grid item xs={12} md={8}>
          <SettingComponentPrevew setting={setting} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SettingComponent
