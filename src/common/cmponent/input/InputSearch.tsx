import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AiOutlineSearch } from 'react-icons/ai'
import theme, { Input } from 'src/common/style/theme'

const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${theme.colors.border_color};
  padding: ${theme.paddings.small};
  margin-left: 4px;
`

interface MyProps {
  onChangeKeyword: (keyword: string) => void
}

const InputSearch = ({ onChangeKeyword }: MyProps) => {
  const [keyword, setKeyword] = useState('')
  const mOnChangeKeyword = (keyword: string) => {
    setKeyword(keyword)
    onChangeKeyword(keyword)
  }
  return (
    <Container>
      <AiOutlineSearch size={18} />
      <Input type={'text'} value={keyword} onChange={(e) => mOnChangeKeyword(e.target.value)} />
    </Container>
  )
}

export default InputSearch
