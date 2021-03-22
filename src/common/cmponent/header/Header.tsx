import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useIsLogin } from '../../../hook/ussIsLogin'
import { BiUser } from 'react-icons/bi'
import MyGoogleLogin from '../../../feature/auth/component/MyGoogleLogin'
import InputSearch from '../input/InputSearch'

const Header = styled.div`
  width: 100%;
  box-shadow: 0 1px 2px 0 rgb(40 50 60 / 6%);
  margin: 0;
  z-index: 999;
  position: fixed;
  top: 0;
  right: 0;
  border-radius: 0;
  height: 56px;
  background: white;
`
const Container = styled.div`
  @media only screen and (min-width: 1100px) {
    width: 1060px;
    padding: 0;
  }
  padding: 0 16px;
  height: 100%;
  margin: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Left = styled.button`
  display: flex;
  font-size: 16px;
`
const Center = styled.div``

const Right = styled.div``

const HeaderComponent = () => {
  const isLogin = useIsLogin()
  const onSearch = (keyword: string) => {
    if (keyword) {
      console.log(keyword)
    }
  }
  return (
    <Header>
      <Container>
        <Left>
          <Link href="/">YoutubeCuration</Link>
        </Left>
        <Center>
          <InputSearch onChangeKeyword={onSearch} />
        </Center>
        <Right>
          {!isLogin ? (
            <MyGoogleLogin />
          ) : (
            <>
              <BiUser size={28} cursor={'pointer'} />
            </>
          )}
        </Right>
      </Container>
    </Header>
  )
}

export default HeaderComponent
