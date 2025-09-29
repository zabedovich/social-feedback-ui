export type RequestOptions = {
  headers?: Record<string, string>
  abortController?: AbortController
}

export const createBaseApi = () => {
  const apiUrl = 'http://localhost:4000/external'

  const unwrap = async (req: Promise<Response>) => {
    const unwrapped = await req
    if (!unwrapped.ok) {
      switch (unwrapped.status) {
        case 404:
          throw new Error('Not found')
        case 400:
          throw new Error('Bad request')
        default:
          throw new Error('Unknown error')
      }
    }
    return (await req).json()
  }
  return {
    post: async <R, B extends object>(
      path: string,
      body: B,
      options?: RequestOptions
    ): Promise<R> => {
      try {
        return unwrap(
          fetch(`${apiUrl}${path}`, {
            method: 'POST',
            body: JSON.stringify(body),
            signal: options?.abortController?.signal ?? null,
            headers: {
              'Content-Type': 'application/json',
              ...(options?.headers ?? {}),
            },
          })
        )
      } catch (e) {
        console.log(e)
        throw e // todo fix error and send metric
      }
    },
    get: async <R>(path: string, options?: RequestOptions): Promise<R> => {
      try {
        return unwrap(
          fetch(`${apiUrl}${path}`, {
            method: 'GET',
            signal: options?.abortController?.signal ?? null,
            headers: {
              'Content-Type': 'application/json',
              ...(options?.headers ?? {}),
            },
          })
        )
      } catch (e) {
        console.log(e)
        throw e // todo fix error and send metric
      }
    },
  }
}
