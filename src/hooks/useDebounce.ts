import { useEffect, useState } from 'react'

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)
    // React会在执行当前effect之前对上一个effect进行清除
    // https://react.docschina.org/docs/hooks-effect.html
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
