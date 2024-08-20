import type { Strapi } from '@strapi/strapi'
import { pluginId } from '../../../admin/src/pluginId'

const ConfigService = ({ strapi }: { strapi: Strapi }) => {
    const getPluginStore = () => {
        return strapi.store({
            type: 'plugin',
            name: pluginId,
        })
    }

    // Create default settings
    const createDefaultConfig = async () => {
        const pluginStore = getPluginStore()
        const value = {}
        await pluginStore.set({ key: 'settings', value })
        return pluginStore.get({ key: 'settings' })
    }

    const createConfigFromData = async (settings) => {
        const value = settings
        const pluginStore = getPluginStore()
        await pluginStore.set({ key: 'settings', value })
        return pluginStore.get({ key: 'settings' })
    }

    const getConfig = async () => {
        const pluginStore = getPluginStore()
        let config = await pluginStore.get({ key: 'settings' })
        if (!config) {
            config = await createDefaultConfig()
        }

        return config
    }

    const setConfig = async (data) => {
        return createConfigFromData(data)
    }

    return { getConfig, setConfig }
}

export default ConfigService
