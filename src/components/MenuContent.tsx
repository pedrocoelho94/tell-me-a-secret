import CloseOutlined from '@mui/icons-material/CloseOutlined'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import AddCircleOutlined from '@mui/icons-material/AddCircleOutlined'
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlined from '@mui/icons-material/LightModeOutlined'

import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Box } from '@mui/system'
import { useThemeContext } from '../contexts/ThemeContext'

type MenuContentProps = {
  setMobileOpen: (arg: boolean) => void
}

const menuItem = [
  {
    text: 'Segredo aleatório',
    icon: <AutoAwesomeIcon color="primary" />,
    path: '/'
  },
  {
    text: 'Novo segredo',
    icon: <AddCircleOutlined color="primary" />,
    path: '/create'
  }
]

const MenuContent = ({ setMobileOpen }: MenuContentProps) => {
  const router = useRouter()
  const { toggleTheme, selectedTheme } = useThemeContext()

  const handleToggleTheme = () => {
    toggleTheme()
  }

  const handleClickMenu = (path: string) => {
    router.push(path)
  }

  useEffect(() => {
    setMobileOpen(false)
  }, [router.pathname, setMobileOpen])

  return (
    <>
      <Toolbar sx={{ display: { sm: 'none' } }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Tell me a secret
        </Typography>
        <IconButton
          size="large"
          color="inherit"
          aria-label="close menu"
          onClick={() => setMobileOpen(false)}
        >
          <CloseOutlined />
        </IconButton>
      </Toolbar>

      {/* list / links */}
      <Box height="100vh" display="flex" flexDirection="column">
        <List sx={{ flexGrow: 1 }}>
          {menuItem.map(item => (
            <ListItemButton
              selected={router.pathname === item.path}
              key={item.text}
              onClick={() => handleClickMenu(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>

        <List>
          <ListItemButton onClick={handleToggleTheme}>
            {selectedTheme === 'light' ? (
              <>
                <ListItemIcon>
                  <DarkModeOutlined color="primary" />
                </ListItemIcon>

                <ListItemText primary={'Dark'} />
              </>
            ) : (
              <>
                <ListItemIcon>
                  {' '}
                  <LightModeOutlined color="primary" />
                </ListItemIcon>

                <ListItemText primary={'Light'} />
              </>
            )}
          </ListItemButton>
        </List>
      </Box>
    </>
  )
}

export default MenuContent
