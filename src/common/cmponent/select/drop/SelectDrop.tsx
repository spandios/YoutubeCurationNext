import React, { forwardRef, ReactNode, useEffect, useRef } from 'react'
import styled from 'styled-components'
import theme from '../../../style/theme'
import { useOutsiderClick } from '../../../../hook/useOutsiderClick'

const Container = styled.div<{ active: boolean }>`
  position: absolute;
  z-index: 100;
  border: 1px solid ${theme.colors.border_color};
  background: white;
  height: auto;
  top: 0;
  right: 0;
  display: ${(props) => (props.active ? 'block' : 'none')};
  .tooltip {
    display: ${(props) => (props.active ? 'block' : 'none')};
  }
`

export const SelectDropContainer = styled.div`
  height: 1px;
  width: 100%;
  background: ${theme.colors.border_color};
`
export const SelectDropItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 16px;
`

export interface SelectDrop {
  children: ReactNode[]
  id?: any
  active: boolean
  setActive: (flag: boolean) => void
}

const SelectDropComponent = ({ children, active, setActive }) => {
  const { ref, isVisible, setVisible } = useOutsiderClick(active)
  useEffect(() => {
    setVisible(active)
  }, [active])

  useEffect(() => {
    if (!isVisible) {
      setActive(false)
    }
  }, [isVisible])

  return (
    <Container active={isVisible && active} ref={ref}>
      {children && (
        <div className="tooltip">
          {children.map((c, index) => (
            <SelectDropItem key={index}>{c}</SelectDropItem>
          ))}
        </div>
      )}
    </Container>
  )
}

export default SelectDropComponent
