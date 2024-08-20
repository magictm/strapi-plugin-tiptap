import type { Strapi } from '@strapi/strapi'
import { pluginId } from '../../../admin/src/pluginId'

const ConfigController = ({ strapi }: { strapi: Strapi }) => {
    const configService = strapi.plugin(pluginId).service('config')

    const getConfig = (ctx) => {
        try {
            return configService.getConfig()
        } catch (err) {
            ctx.throw(500, err)
        }
    }

    const setConfig = (ctx) => {
        ctx.body = {}
    }

    return {
        getConfig,
        setConfig,
    }
}

export default ConfigController
