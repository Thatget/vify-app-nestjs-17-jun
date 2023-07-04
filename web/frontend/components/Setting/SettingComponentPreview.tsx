import React from 'react'
import ConfigSettingPreview from './ConfigSettingPreview'
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

// interface SettingComponentPrevewProps {
//   setting: Setting;
// }

// const SettingComponentPrevew: React.FC<SettingComponentPrevewProps>  = ({setting}) => {
//   return (
//     <div>
      
//     </div>
//   )
// }

const SettingComponentPreview = () => {
  return (
    <div>
        <React.Fragment>
            <br/>
            <Container>
                <Box sx={{minWidth: 275}}>
                    <ConfigSettingPreview />
                </Box>
                <br/>
            </Container>
        </React.Fragment>
    </div>
  )
}

export default SettingComponentPreview
