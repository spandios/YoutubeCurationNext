import { useEffect } from 'react'

export const useOverflowHidden = (visible: boolean) => {
  useEffect(() => {
    if (visible) document.body.style.overflow = 'hidden'
  }, [visible])
}

export const useOverflowVisible = () => {
  useEffect(() => {
    document.body.style.overflow = 'auto'
  }, [])
}

export const useOverflowModal = (visible: boolean) => {
  useEffect(() => {
    if (visible) document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [visible])
}
