import { createTheme } from '@mui/material'
import { cyan, pink, purple } from '@mui/material/colors'

const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: pink,

    background: {
      default: '#202124',
      paper: '#303134'
    }
  },
  typography: {
    fontFamily: "'Poppins', sans-serif"
  }
})

export default DarkTheme
