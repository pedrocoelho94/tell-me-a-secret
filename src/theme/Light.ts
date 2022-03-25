import { createTheme } from '@mui/material'
import { cyan, pink, purple } from '@mui/material/colors'

const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: purple,
    background: {
      default: '#f7f6f3',
      paper: '#fff'
    }
  },
  typography: {
    fontFamily: "'Poppins', sans-serif"
  }
})

export default LightTheme
