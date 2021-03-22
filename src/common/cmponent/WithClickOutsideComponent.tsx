import { useEffect, useRef, useState } from 'react'

export default function WithClickOutside(WrappedComponent) {
  const Component = (props) => {
    const [active, setActive] = useState(false)

    const ref = useRef()

    useEffect(() => {
      const handleClickOutside = (event) => {
        // @ts-ignore
        if (ref && ref.current && !ref.current.contains(event.target)) {
          setActive(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])

    return <WrappedComponent {...props} active={active} setActive={setActive} ref={ref} />
  }

  return Component
}
