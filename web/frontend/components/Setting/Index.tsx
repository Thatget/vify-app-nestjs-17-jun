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
    isLoading: isLoadingSetting
  } = useAppQuery({
    url: "/api/setting",
      reactQueryOptions: {
        onSuccess: () => {
          // setIsLoading(false);
          setSetting(data);
        }
      },
    });
  const handleUpdateSetting = (type: string, value: boolean) => {
    setSetting((prevSetting) =>  {
      switch (type) {
        case "hide_price":
          return {
            ...prevSetting,
            hide_price: value,
          };
          break;
        case "hide_add_to_cart":
          return {
            ...prevSetting,
            hide_add_to_cart: value,
          };
          break;
        case "hide_by_now":
          return {
            ...prevSetting,
            hide_by_now: value,
          };
          break;
        case "hide_request_to_quote":
          return {
            ...prevSetting,
            hide_request_to_quote: value,
          };
          break;
        default:
          break;
      }
    });
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <SettingComponentSet setting={setting} handleUpdateSetting={handleUpdateSetting} />
        </Grid>
        <Grid item xs={12} md={8}>
          <SettingComponentPrevew setting={setting} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SettingComponent
