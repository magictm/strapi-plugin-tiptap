import { useFetchClient, useNotification } from '@strapi/helper-plugin'
import { useMutation, useQuery } from 'react-query'
import { pluginId } from '../pluginId'

const endpoint = `/${pluginId}/config`
const queryKey = [pluginId, 'config']

export const useConfig = () => {
    const toggleNotification = useNotification()
    const { get, put } = useFetchClient()

    const config = useQuery(
        queryKey,
        async () => {
            const res = await get(endpoint)

            return res.data
        },
        {
            onError() {
                return toggleNotification({
                    type: 'warning',
                    message: { id: 'notification.error' },
                })
            },
            /**
             * We're cementing that we always expect an object to be returned.
             */
            select: (data) => (!data ? {} : data),
        }
    )

    const putMutation = useMutation(
        async (body) => {
            await put(endpoint, body)
        },
        {
            onSuccess() {
                config.refetch()
            },
            onError() {
                return toggleNotification({
                    type: 'warning',
                    message: { id: 'notification.error' },
                })
            },
        }
    )

    return {
        config,
        mutateConfig: putMutation,
    }
}
