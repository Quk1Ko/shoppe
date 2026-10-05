import { useApiFetch } from '@/composables/api/useApiFetch'
import type { Product } from '~/types/api'

export const useGetAllProducts = () => {
  return useApiFetch<Product[]>('/products', {
    server: false,
  })
}
