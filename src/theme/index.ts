import { createTheme } from '@mui/material/styles'
import { orange, purple, red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  custom: {
    orange: orange[500],
    darkOrange: orange[800]
  },
  palette: {
    mode: 'light',
    primary: purple,
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    }
  },
  typography: {
    fontFamily: "'Poppins', sans-serif"
  }
})

export default theme
