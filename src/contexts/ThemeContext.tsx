import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { ThemeProvider } from '@mui/material/styles'

import LightTheme from '../theme/Light'
import DarkTheme from '../theme/Dark'

import { useCookies } from 'react-cookie'
import ClientOnly from '../components/ClientOnly'

type ThemeContextData = {
  selectedTheme: 'light' | 'dark'
  toggleTheme: () => void
  myTheme?: any
}

const ThemeContext = createContext({} as ThemeContextData)

const PREFERENCE_COOKIE_NAME = 'myTheme'

const getActiveTheme = (themeMode: 'light' | 'dark') => {
  return themeMode === 'light' ? LightTheme : DarkTheme
}

export const AppThemeProvider: React.FC = ({ children }) => {
  const [activeTheme, setActivetheme] = useState(LightTheme)
  const [cookieTheme, setCookieTheme] = useCookies([PREFERENCE_COOKIE_NAME])

  const preferredTheme =
    cookieTheme && cookieTheme[PREFERENCE_COOKIE_NAME]
      ? cookieTheme[PREFERENCE_COOKIE_NAME]
      : 'light'

  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>(
    preferredTheme
  )

  const toggleTheme = useCallback(() => {
    
    const desiredTheme = selectedTheme === 'light' ? 'dark' : 'light'
    setSelectedTheme(selectedTheme === 'light' ? 'dark' : 'light')
    setCookieTheme(PREFERENCE_COOKIE_NAME, desiredTheme)
  }, [selectedTheme, setCookieTheme])

  // const theme = useMemo(() => {
  //   if (themeName === 'light') return LightTheme

  //   return DarkTheme
  // }, [themeName])

  useEffect(() => {
    setActivetheme(getActiveTheme(selectedTheme))
  }, [selectedTheme])

  return (
    <ThemeContext.Provider value={{ selectedTheme, toggleTheme }}>
      <ClientOnly>
        <ThemeProvider theme={activeTheme}>{children}</ThemeProvider>
      </ClientOnly>
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)
