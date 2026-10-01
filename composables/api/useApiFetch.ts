import type { UseFetchOptions } from 'nuxt/app'
import { useFetch, useRuntimeConfig } from 'nuxt/app'

export const useApiFetch = <DataT = unknown>(request: string, options?: UseFetchOptions<DataT>) => {
  const config = useRuntimeConfig()

  if (!config.public.apiBaseUrl) {
    throw new Error('API_BASE_URL is not set')
  }

  return useFetch(request, {
    baseURL: config.public.apiBaseUrl as string,

    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Amigo',
      ...options?.headers,
    },

    key: request + JSON.stringify(options?.params || {}),

    ...options,
  })
}
