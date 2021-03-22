import styled, { css } from 'styled-components'
import { bold } from 'colorette'

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
  error: '#ff5648',
}

const device = {
  mobileS: `only screen and (max-width: ${deviceSizes.mobileS})`,
  mobileM: `only screen and (max-width: ${deviceSizes.mobileM})`,
  mobileL: `only screen and (max-width: ${deviceSizes.mobileL})`,
  tablet: `only screen and (max-width: ${deviceSizes.tablet})`,
  tabletL: `only screen and (max-width: ${deviceSizes.tabletL})`,
  desktop: `only screen and (min-width: ${deviceSizes.desktop})`,
}

export const DefaultFlex = styled.div`
  flex-direction: column;
  display: flex;
`
export interface ButtonProps {
  active?: boolean
  error?: boolean
  noDivider?: boolean
}
export const DefaultButton = styled.button<ButtonProps>`
  // background: ${(props) => (props.error ? theme.colors.error : theme.colors.white)};
  padding: ${(props) => theme.paddings.base};
  border-radius: 5px;
  border: ${(props) => (props.noDivider ? 'none' : `1px solid ${colors.border_color}`)};
  font-size: 14px;
  border-color: ${(props) => props.error && theme.colors.error};
`

export const ErrorMessage = styled.span<{ error: boolean }>`
  visibility: ${(props) => (props.error ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.error ? '1' : '0')};
  color: ${() => theme.colors.error};
  font-size: 14px;
  text-align: center;
  margin: ${() => theme.margins.base};
  transition: visibility 0.3s, opacity 0.3s ease-in-out;
`

export const DefaultButtonCss = css`
  background: ${colors.white};
  padding: ${paddings.base};
  border-radius: 5px;
  border: ${(props) => `1px solid ${colors.border_color}`};
  font-size: 14px;
`

export const Input = styled.input`
  border: none;
`

export interface DefaultTextProps {
  bold?: boolean
  fontSize?: string
  margin?: string
  padding?: string
}
export const DefaultText = styled.span<DefaultTextProps>`
  font-weight: ${(props) => props.bold && 'bold'};
  font-size: ${(props) => props.fontSize && props.fontSize};
  margin: ${(props) => props.margin && props.margin};
  padding: ${(props) => props.padding && props.padding};
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
