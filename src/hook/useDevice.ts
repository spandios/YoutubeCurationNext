import { useMediaQuery } from 'react-responsive'

export const Desktop = () => {
  return useMediaQuery({ minWidth: 992 })
}
export const Tablet = () => {
  return useMediaQuery({ minWidth: 768, maxWidth: 991 })
}
export const Mobile = () => {
  return useMediaQuery({ maxWidth: 767 })
}

export const SmallMobile = () => {
  return useMediaQuery({ maxWidth: 374 })
}
