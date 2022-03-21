import { AddCircleOutlined, SubjectOutlined } from '@mui/icons-material'
import {
  AppBar,
  Avatar,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material'
import { Box, styled } from '@mui/system'
import { useRouter } from 'next/router'
import { css } from '@emotion/react'

import { format } from 'date-fns'

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

const Page = styled('div')`
  ${({ theme }) => css`
    background-color: #f9f9f9;
    width: 100%;
    padding-top: ${theme.spacing(3)};
    padding-bottom: ${theme.spacing(3)};
  `}
`

const ToobalHeight = styled(Toolbar)``

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter()
  const menuItem = [
    {
      text: 'My Notes',
      icon: <SubjectOutlined color="primary" />,
      path: '/'
    },
    {
      text: 'Create Note',
      icon: <AddCircleOutlined color="primary" />,
      path: '/create'
    }
  ]

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar elevation={0} sx={{ width: `calc(100% - ${drawerWidth}px)` }}>
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>
            Today is the {format(new Date(), 'do MMMM Y')}
          </Typography>
          <Typography>Pedro</Typography>
          <Avatar sx={{ marginLeft: 2 }} />
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <div>
          <Typography variant="h5" p={2}>
            Ninja Notes
          </Typography>
        </div>

        {/* list / links */}
        <List>
          {menuItem.map(item => (
            <ListItemButton
              selected={router.pathname === item.path}
              key={item.text}
              onClick={() => router.push(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Page>
        <ToobalHeight />
        {children}
      </Page>
    </Box>
  )
}

export default Layout
