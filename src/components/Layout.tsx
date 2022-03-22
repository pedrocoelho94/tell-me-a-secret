import Menu from '@mui/icons-material/Menu'

import AppBar from '@mui/material/AppBar'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { Box, styled } from '@mui/system'
import { css } from '@emotion/react'

import { format } from 'date-fns'
import { useState } from 'react'
import MenuContent from './MenuContent'

const drawerWidth = 240

type LayoutProps = {
  children: React.ReactNode
}

// const Page = styled('div')(({ theme }) => ({
//   backgroundColor: '#f9f9f9',
//   width: '100%',
//   paddingTop: theme.spacing(3),
//   paddingBottom: theme.spacing(3)
// }))

const Page = styled('main')`
  ${({ theme }) => css`
    background-color: #f9f9f9;
    width: 100%;
    min-height: 100vh;
    padding-top: ${theme.spacing(3)};
    padding-bottom: ${theme.spacing(3)};
  `}
`

const ToobalHeight = styled(Toolbar)``

const Layout = ({ children }: LayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleMenu = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <>
      <AppBar elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleMenu}
            sx={{ display: { sm: 'none' } }}
          >
            <Menu />
          </IconButton>

          <Typography noWrap sx={{ ml: 'auto' }}>
            Today is the {format(new Date(), 'do MMMM Y')}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="side menu"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={toggleMenu}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
        >
          <MenuContent setMobileOpen={setMobileOpen} />
        </Drawer>
      </Box>

      <Box display="flex">
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="side menu"
        >
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },

              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                top: 64,
                bottom: 0,
                height: `calc(100% - 64px)`
              }
            }}
            open
          >
            <MenuContent setMobileOpen={setMobileOpen} />
          </Drawer>
        </Box>

        <Page>
          <ToobalHeight />
          {children}
        </Page>
      </Box>
    </>
  )
}

export default Layout
