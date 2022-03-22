import CloseOutlined from '@mui/icons-material/CloseOutlined'
import SubjectOutlined from '@mui/icons-material/SubjectOutlined'
import AddCircleOutlined from '@mui/icons-material/AddCircleOutlined'

import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type MenuContentProps = {
  setMobileOpen: (arg: boolean) => void
}

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

const MenuContent = ({ setMobileOpen }: MenuContentProps) => {
  const router = useRouter()

  const handleClickMenu = (path: string) => {
    router.push(path)
  }

  useEffect(() => {
    setMobileOpen(false)
  }, [router.pathname, setMobileOpen])

  return (
    <>
      <Toolbar sx={{ display: { sm: 'none' } }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Ninja Notes
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
      <List>
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
    </>
  )
}

export default MenuContent
