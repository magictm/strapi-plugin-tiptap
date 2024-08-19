import type { Strapi } from '@strapi/strapi'
import { pluginConfigId, pluginId } from './pluginId'

export interface PluginConfig {
    minDepth: number
    maxDepth: number
    skipCreatorFields: boolean
    debug: boolean
    allowedModels: string[]
    ignore: string[]
}

const bootstrap = ({ strapi }: { strapi: Strapi }) => {
    // Get the plugin config
    const { debug }: PluginConfig = strapi.config.get(pluginConfigId)
}

export default bootstrap
