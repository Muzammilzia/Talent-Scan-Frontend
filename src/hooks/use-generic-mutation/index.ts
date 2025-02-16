import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { GenericType } from './types'
import toast from 'react-hot-toast'

/**
 * T = Request type
 * S = Response type
 * Optimistic Updates wrapper for useMutation
 * @param options The options that the useGenericMutation hook accepts
 * @returns The mutation object
 */
export const useGenericMutation = <T, S>({
  serviceFunction,
  queryKey,
  onSuccess,
  updater,
  successRoute,
  refetchKeys,
  retry,
}: GenericType<T, S>) => {
  const queryClient = useQueryClient()

  // @ts-ignore
  return useMutation<S, AxiosError<BackendErrorType>, T>({
    mutationFn: serviceFunction,
    onMutate: async (data) => {
      if (!queryKey) {
        return null
      }
      await queryClient.cancelQueries({queryKey, exact: true})
      const previousData = queryClient.getQueryData<S>(queryKey)

      if (previousData) {
        const newData = updater
          ? updater(previousData, data as unknown as S)
          : ({ ...previousData, ...data } as S)
        queryClient.setQueryData(queryKey, newData)
      }

      return { previousData }
    },
    onError: (err) => {
      console.log(err)
      if(err.status === 409){
        toast.error(err.response?.data.detail)
      }
      if(err.status === 404){
        toast.error(err.response?.data.detail)
      }
      if(err.status === 500){
        toast.error("something went wrong")
      }
      else {
        toast.error(err.response?.data.detail)
      }
    },
    // onError: (_err, _, context: { previousData?: S }) => {

    //   if (!queryKey) {
    //     return null
    //   }

    //   queryClient.setQueryData(queryKey, context.previousData)
    // },
    onSuccess: (data, variables) => {

      if (queryKey) {
        queryClient.invalidateQueries({queryKey})
      }

      if (onSuccess) {
        onSuccess(data, variables, successRoute)
      }

      if (refetchKeys) {
        refetchKeys.forEach((key: QueryKey) => {
          queryClient.refetchQueries({ queryKey: key })
        })
      }
    },
    onSettled: () => {
      return null
    },
    retry: (failureCount, error) => {
      if (!retry) {
        if (failureCount >= 3) {
          return false
        }

        return error.response?.status == 401
      }

      if (typeof retry === 'function') {
        return retry(failureCount, error)
      }

      return retry
    },
    retryDelay: (retryAttempt) => 3000 * retryAttempt,
  })
}
