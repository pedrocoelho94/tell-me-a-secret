import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'

import createEmotionCache from '../helpers/createEmotionCache'
import Layout from '../components/Layout'

import '../styles/globals.css'
import { AppThemeProvider } from '../contexts/ThemeContext'

import NextNProgress from 'nextjs-progressbar'
import { pink } from '@mui/material/colors'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <AppThemeProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Layout>
            <NextNProgress
              color="white"
              startPosition={0.3}
              stopDelayMs={200}
              height={3}
              showOnShallow={true}
            />
            <Component {...pageProps} />
          </Layout>
        </AppThemeProvider>
      </CacheProvider>
    </>
  )
}
