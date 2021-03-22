import useSWR from 'swr'
export function useSwrLocal<T>(key: string, paramData?: T | undefined) {
  const { data, mutate } = useSWR(key, paramData ? () => paramData : null, {
    shouldRetryOnError: false,
  })

  const mutation = (mutateData: T | undefined) => {
    return mutate(mutateData, false)
  }
  return { data, mutation }
}
