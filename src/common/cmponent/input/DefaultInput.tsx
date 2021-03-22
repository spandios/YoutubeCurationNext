import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AiOutlineSearch } from 'react-icons/ai'
import theme, { Input } from 'src/common/style/theme'

const Container = styled.div`
  display: flex;
  align-items: center;
  // border: 1px solid ${theme.colors.border_color};
  padding: ${theme.paddings.small};
`

interface MyProps {
  onChangeKeyword?: (keyword: string) => void
  placeholder?: string
  style?: any
  innerStyle?: any
  labelText?: string
  id?: string
  defaultText?: string
  readonly?: boolean
  props?: any
}

const InputText = ({
  onChangeKeyword,
  placeholder = '',
  style,
  labelText,
  id,
  defaultText = '',
  readonly = false,
  innerStyle = { width: '100%' },
  props,
}: MyProps) => {
  const [keyword, setKeyword] = useState(defaultText)
  const mOnChangeKeyword = (keyword: string) => {
    setKeyword(keyword)
    if (onChangeKeyword) onChangeKeyword(keyword)
  }
  return (
    <Container style={style}>
      {/*{labelText && <label>{labelText}</label>}*/}
      <Input
        id={id}
        type={'text'}
        value={keyword}
        placeholder={placeholder}
        onChange={(e) => mOnChangeKeyword(e.target.value)}
        style={innerStyle}
        readOnly={readonly}
        {...props}
      />
    </Container>
  )
}

export default InputText
