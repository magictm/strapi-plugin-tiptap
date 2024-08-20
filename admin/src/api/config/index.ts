import { useFetchClient } from '@strapi/helper-plugin'
import { pluginId } from '../../pluginId'

const config = {
    get: async () => {
        const { get } = useFetchClient()

        const data = await get(`/${pluginId}/config`)
        return data
    },
    set: async (data: any) => {
        const { post } = useFetchClient()

        return await post(`/${pluginId}/config`, {
            data,
        })
    },
}
export default config
