import type { UseFetchOptions } from 'nuxt/app'
import { useFetch } from 'nuxt/app'
import { useRuntimeConfig } from 'nuxt/app'
import { useCookie } from 'nuxt/app'

export const useApiFetch = <DataT = unknown>(request: string, options?: UseFetchOptions<DataT>) => {
  const config = useRuntimeConfig()
  const authToken = useCookie('authToken')

  if (!config.public.apiBaseUrl) {
    throw new Error('API_BASE_URL is not set')
  }

  const defaults: UseFetchOptions<DataT> = {
    baseURL: config.public.apiBaseUrl as string,
    key: request + JSON.stringify(options?.params || {}), // нужно для кеширования
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken.value ? `Bearer ${authToken.value}` : 'amigo',
      ...options?.headers,
    },
  }

  const params = { ...defaults, ...options }

  return useFetch(request, params)
}
