import { useEffect, useState } from 'react'

type UseRequestProps<T> = (abortController: AbortController) => Promise<T>
export const useRequest = <T>(request: UseRequestProps<T>) => {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  useEffect(() => {
    const abortController = new AbortController()
    setLoading(true)
    request(abortController)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))

    return () => {
      abortController.abort()
    }
  }, [])

  return { data, loading, error }
}
