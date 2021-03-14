import styled, { css } from 'styled-components'

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

const fontSizes = {
  small: '8px',
  base: '16px',
  lg: '18px',
  xl: '20px',
  xxl: '24px',
}

const paddings = {
  small: '8px',
  base: '16px',
  lg: '18px',
  xl: '20px',
  xxl: '24px',
}

const margins = {
  small: '8px',
  base: '16px',
  lg: '18px',
  xl: '20px',
  xxl: '24px',
}

const deviceSizes = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '450px',
  tablet: '768px',
  tabletL: '1024px',
  desktop: '1100px',
}

const colors = {
  black: '#000000',
  white: '#FFFFFF',
  gray_1: '#222222',
  gray_2: '#767676',
  green_1: '#3cb46e',
  border_color: '#ced4da',
}

const device = {
  mobileS: `only screen and (max-width: ${deviceSizes.mobileS})`,
  mobileM: `only screen and (max-width: ${deviceSizes.mobileM})`,
  mobileL: `only screen and (max-width: ${deviceSizes.mobileL})`,
  tablet: `only screen and (max-width: ${deviceSizes.tablet})`,
  tabletL: `only screen and (max-width: ${deviceSizes.tabletL})`,
  desktop: `only screen and (min-width: ${deviceSizes.desktop})`,
}

export const DefaultButton = styled.button<{ active?: boolean }>`
  background: ${(props) => theme.colors.white};
  padding: ${(props) => theme.paddings.small};
  border-radius: 5px;
  border: ${(props) => `1px solid ${colors.border_color}`};
  font-size: 14px;
`

export const DefaultButtonCss = css`
  background: ${colors.white};
  padding: ${paddings.small};
  border-radius: 5px;
  border: ${(props) => `1px solid ${colors.border_color}`};
  font-size: 14px;
`

export const Input = styled.input`
  border: none;
`
const theme = {
  fontSizes,
  colors,
  deviceSizes,
  device,
  paddings,
  margins,
  flexCenter,
}

export default theme
