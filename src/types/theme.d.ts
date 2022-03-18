import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      orange: string
      darkOrange: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    custom?: {
      orange?: string
      darkOrange?: string
    }
  }
}
