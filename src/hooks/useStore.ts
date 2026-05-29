import { useState, useEffect } from 'react'

/**
 * A custom hook to safely handle Zustand hydration with Next.js App Router.
 * It prevents hydration mismatch errors by returning undefined during SSR
 * and the initial client render, only resolving the state after mounting.
 * 
 * @param store The Zustand store hook
 * @param callback The selector function
 * @returns The resolved state from the store, or undefined during hydration
 */
export function useStore<T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
): F | undefined {
  const result = store(callback) as F
  const [data, setData] = useState<F>()

  useEffect(() => {
    setData(result)
  }, [result])

  return data
}
