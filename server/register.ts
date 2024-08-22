import type { Strapi } from '@strapi/strapi'
import { pluginId } from '../admin/src/pluginId'

const register = ({ strapi }: { strapi: Strapi }) => {
    strapi.customFields.register({
        name: 'tiptap',
        plugin: pluginId,
        type: 'richtext',
    })
}

export default register
