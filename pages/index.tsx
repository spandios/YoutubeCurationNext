import Head from 'next/head'
import MyCurationList from '../src/feature/curation/component/MyCurationList'
import { getMyCurationList, useMyCurationList } from '../src/feature/curation/api/CurationAPI'
import { setCookieFromServer } from '../src/common/MyAxios'
import { CurationResponse } from '../src/feature/curation/dto/CurationResponse'
import styled from 'styled-components'
import theme from '../src/common/style/theme'

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: ${theme.paddings.base} 0;
`

export default function Home({ myCurationList }) {
  const { isLoading, error, data, refetch } = useMyCurationList<CurationResponse[]>(myCurationList)

  return (
    <Container>
      <Head>
        <title>Youtube Curation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {!isLoading && !error && data && data.length ? <MyCurationList list={data} /> : null}
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/Xoom1MAKrM0"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </main>
    </Container>
  )
}

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
