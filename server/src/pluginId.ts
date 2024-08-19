import pluginPkg from '../../package.json'

const pluginId = pluginPkg.strapi.name
const pluginConfigId = `plugin.${pluginId}`

export { pluginId, pluginConfigId }
