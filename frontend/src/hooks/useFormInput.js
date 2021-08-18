import { useRef, useState } from "react"

export const useFormInput = (condition) => {
  const [hasError, setHasError] = useState(false)
  const inputRef = useRef()

  const validate = () => {
    const currvalue = inputRef.current.value

    if (condition(currvalue)) {
      setHasError(false)
      return true
    } else {
      setHasError(true)
      return false
    }
  }

  return [hasError, validate, inputRef]
}