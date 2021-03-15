import React from 'react'
import store from 'src/store'
import { Provider } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components'
import theme from '../src/common/style/theme'
import HeaderComponent from '../src/common/cmponent/header/Header'
import '../src/common/style/font/NotoSansCJKkr_font.css'
import GlobalStyle from 'src/common/style/GlobalStyle'
import CommonComponent from '../src/common/cmponent/CommonComponent'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { SWRConfig } from 'swr'
const Container = styled.div`
  padding: 56px 28px;
  margin: 0 auto;
  @media only screen and (min-width: 1100px) {
    width: 1060px;
    padding: 56px 0px;
  }

  z-index: 2;
`

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <SWRConfig value={{ revalidateOnFocus: false }}>
          <title>YoutubeCuration</title>
          <CommonComponent />
          <HeaderComponent />
          <Container>
            <Component {...pageProps} />
          </Container>
        </SWRConfig>
      </ThemeProvider>
    </Provider>
  )
}

MyApp.getInitialProps = async (context) => {
  const { ctx, Component } = context
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = (await Component.getInitialProps(ctx)) || {}
  }
  return { pageProps }
}
