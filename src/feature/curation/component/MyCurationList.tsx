import React from 'react'
import { CurationResponse } from '../dto/CurationResponse'
import styled from 'styled-components'
import theme, { DefaultButton } from '../../../common/style/theme'
import Link from 'next/link'

interface CurationProps {
  list: CurationResponse[]
}
const Container = styled.div``

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Title = styled.b`
  font-size: ${theme.fontSizes.xxl};
`
const List = styled.ul`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-top: 16px;
`

const Item = styled.li`
  padding: 0 16px 24px 0;
  flex: 0;
  flex-basis: calc(100% / 2);
  display: flex;
  flex-direction: column;
  position: relative;
  @media ${theme.device.desktop} {
    flex-basis: calc(100% / 3);
    //&:nth-child(3n) {
    //  padding: 0 0 24px 0;
    //}
  }

  @media ${theme.device.mobileL} {
    //&:nth-child(2n) {
    //  padding: 0 0 24px 0;
    //}
  }

  .title {
    font-size: 18px;
  }
  .viewCnt {
  }
  .commentCnt {
  }
`

const Thumbnail = styled.img`
  width: 100%;
  margin-bottom: 8px;
`

const ViewAllButton = styled(DefaultButton)`
  width: 100%;
`

const MyCurationList = ({ list }: CurationProps) => {
  return (
    <Container>
      <Title>내 큐레이팅</Title>
      <List>
        {list.map((r) => (
          <Link key={r.id} href={'/my_curation/' + r.id} as={`/my_curation/` + r.id}>
            <Item>
              <Thumbnail src={r.youtube.thumbnail} width={'100%'} />
              <b className="title">{r.title}</b>
              <span className="viewCnt">{r.viewCnt}회 조회</span>
              <span className="commentCnt">{r.commentCnt}개의 댓글</span>
            </Item>
          </Link>
        ))}
      </List>
      <ViewAllButton>모두 보기</ViewAllButton>
    </Container>
  )
}

export default MyCurationList
