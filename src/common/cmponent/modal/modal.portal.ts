import ReactDOM from 'react-dom'
import { ReactNode } from 'react'

interface ModalPortalProps {
  children: ReactNode
}

export const ModalPortal = ({ children }: ModalPortalProps) => {
  const el = document.getElementById('modal-root')
  if (el) return ReactDOM.createPortal(children, el)
  return null
}
