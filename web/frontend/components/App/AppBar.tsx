import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

export default function AppBarTest () {
  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit">
              hello
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}