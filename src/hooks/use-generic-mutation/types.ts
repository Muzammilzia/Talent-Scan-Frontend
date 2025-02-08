import { QueryKey } from '@tanstack/react-query'

export interface GenericType<T, S> {
  /** The api service function */
  serviceFunction: (data: T) => Promise<S>
  /** The query keys to invalidate data when success, keep it undefined if you don't want to invalidate any query */
  queryKey?: QueryKey
  /** The success handler */
  onSuccess?: (data: S, variables: T, route?: string) => void
  /** Custom updater function for optimistic update */
  updater?: ((oldData: S, newData: S) => S) | undefined
  /** The route the user will be redirect if request is successful */
  successRoute?: string
  /** The query keys to refetch data when success, keep it undefined if you don't want to refetch any query */
  refetchKeys?: Array<QueryKey>
  /** The number of retries when request is failed */
  retry?: boolean | ((count: number, error: any) => boolean)
}
