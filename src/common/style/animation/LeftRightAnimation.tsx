import styled, { css } from 'styled-components'

export const LeftRightAnimation = styled.div<{ error: boolean }>`
  text-align: center;
  ${(props) =>
    props.error &&
    css`
      animation: example 0.5s ease-in-out;
      position: relative;
    `}

  @keyframes example {
    0%,
    100% {
      left: -8px;
    }

    50% {
      left: 8px;
    }
  }
`
