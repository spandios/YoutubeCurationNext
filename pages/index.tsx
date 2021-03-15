import Head from 'next/head'
import MyCurationList from '../src/feature/curation/component/MyCurationList'
import { getMyCurationList, useMyCurationList } from '../src/feature/curation/api/CurationAPI'
import { setCookieFromServer } from '../src/common/MyAxios'
import styled from 'styled-components'
import theme, { DefaultButton } from '../src/common/style/theme'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useIsLogin } from '../src/hook/ussIsLogin'

export const getServerSideProps = async (context) => {
  setCookieFromServer(context)
  let myList = []
  try {
    const response = await getMyCurationList()
    myList = response.data
  } catch (e) {
    console.log(e)
  }

  return {
    props: {
      myCurationList: myList,
    },
  }
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: ${theme.paddings.base} 0;
`

const AddCuration = styled(DefaultButton)`
  width: 100%;
  margin: 16px 0;
`

export default function Home() {
  const { data, isValidating, error, mutate } = useMyCurationList()
  useEffect(() => {}, [error, isValidating])
  useEffect(() => {
    console.log(data)
  }, [data])
  const isLogin = useIsLogin()
  return (
    <Container>
      <>
        {isLogin && !isValidating && data && data.length ? <MyCurationList list={data} /> : null}
        <AddCuration>
          <Link href="/curation/create">큐레이션 생성</Link>
        </AddCuration>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/Xoom1MAKrM0"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </>
    </Container>
  )
}
