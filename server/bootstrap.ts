import type { Strapi } from '@strapi/strapi'
import { pluginConfigId, pluginId } from '../admin/src/pluginId'
import { PluginConfig } from './config/schema'

const bootstrap = ({ strapi }: { strapi: Strapi }) => {
    // Get the plugin config
    const { debug }: PluginConfig = strapi.config.get(pluginConfigId)
}

export default bootstrap
