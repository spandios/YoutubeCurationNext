import { useEffect, useRef, useState } from 'react'

export function useOutsiderClick(active: boolean) {
  const [isVisible, setVisible] = useState(active)
  const ref = useRef(null)
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false)
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  return { ref, isVisible, setVisible }
}
