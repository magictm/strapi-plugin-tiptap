import { prefixPluginTranslations } from '@strapi/helper-plugin'

import pluginPkg from '../../package.json'
import { pluginId } from './pluginId'
import Initializer from './components/Initializer'
import { PluginIcon } from './components/PluginIcon'
import { getTranslation } from './utils/getTranslation'
import * as yup from 'yup'

const name = pluginPkg.strapi.name

const settingsPageComponent = async () => {
    const component = await import(
        /* webpackChunkName: "strapi-tiptip-editor-settings-page" */ './pages/App'
    )

    return component
}

export default {
    register(app: any) {
        app.createSettingSection(
            {
                id: pluginId,
                intlLabel: {
                    id: getTranslation('settings.menu.label'),
                    defaultMessage: 'TipTap Editor by MagicTM',
                },
            },
            [
                // {
                //     intlLabel: {
                //         id: getTranslation('settings.menu.overview'),
                //         defaultMessage: 'Overview',
                //     },
                //     id: 'settings',
                //     to: '/settings/tiptap-editor/overview',
                //     Component: overviewPageComponent,
                //     permissions: [],
                // },
                {
                    intlLabel: {
                        id: getTranslation('settings.menu.settings'),
                        defaultMessage: 'Settings',
                    },
                    id: 'settings',
                    to: '/settings/' + pluginId,
                    Component: settingsPageComponent,
                    permissions: [],
                },
            ]
        )

        app.customFields.register({
            name: 'tiptap',
            type: 'richtext',
            pluginId,
            icon: PluginIcon,
            intlLabel: {
                id: getTranslation('field.label'),
                defaultMessage: 'Tiptap Editor',
            },
            intlDescription: {
                id: getTranslation('field.description'),
                defaultMessage: 'The rich text editor for every use case.',
            },
            components: {
                Input: async () =>
                    import(/* webpackChunkName: "input-component" */ './components/Tiptap'),
            },
            options: {
                base: [
                    {
                        intlLabel: {
                            id: getTranslation('preset.label'),
                            defaultMessage: 'Choose editor version',
                        },
                        description: {
                            id: getTranslation('preset.description'),
                            defaultMessage: 'Do you need more or less features?',
                        },
                        name: 'options.preset',
                        type: 'select',
                        options: [
                            {
                                key: 'light',
                                value: 'light',
                                metadatas: {
                                    intlLabel: {
                                        id: getTranslation('preset.light.label'),
                                        defaultMessage: 'Light version',
                                    },
                                },
                            },
                            {
                                key: 'standard',
                                value: 'standard',
                                metadatas: {
                                    intlLabel: {
                                        id: getTranslation('preset.standard.label'),
                                        defaultMessage: 'Standard version',
                                    },
                                },
                            },
                            {
                                key: 'rich',
                                value: 'rich',
                                metadatas: {
                                    intlLabel: {
                                        id: getTranslation('preset.rich.label'),
                                        defaultMessage: 'Rich version',
                                    },
                                },
                            },
                        ],
                    },
                    {
                        intlLabel: {
                            id: getTranslation('output.label'),
                            defaultMessage: 'Choose output type',
                        },
                        description: {
                            id: getTranslation('output.description'),
                            defaultMessage:
                                'Decide, whether you want to get your output in HTML or JSON',
                        },
                        name: 'options.output',
                        type: 'select',
                        defaultValue: 'HTML',
                        options: [
                            {
                                key: 'html',
                                value: 'HTML',
                                metadatas: {
                                    intlLabel: {
                                        id: getTranslation('output.html.label'),
                                        defaultMessage: 'HTML',
                                    },
                                },
                            },
                            {
                                key: 'json',
                                value: 'JSON',
                                metadatas: {
                                    intlLabel: {
                                        id: getTranslation('output.json.label'),
                                        defaultMessage: 'JSON',
                                    },
                                },
                            },
                        ],
                    },
                ],
                advanced: [
                    {
                        sectionTitle: null,
                        items: [
                            {
                                name: 'required',
                                type: 'checkbox',
                                intlLabel: {
                                    id: getTranslation('required.label'),
                                    defaultMessage: 'Required field',
                                },
                                description: {
                                    id: getTranslation('required.description'),
                                    defaultMessage:
                                        "You won't be able to create an entry if this field is empty",
                                },
                            },
                            // Note: We can't call it simply "maxLength" because then Strapi
                            // applies this to the length of HTML string automatically.
                            // We want to apply this to the number of characters in the editor,
                            // hence – a unique name.
                            {
                                name: 'options.maxLengthCharacters',
                                type: 'checkbox-with-number-field',
                                intlLabel: {
                                    id: getTranslation('maxLength.label'),
                                    defaultMessage: 'Maximum length (characters)',
                                },
                            },
                        ],
                    },
                ],
                validator: (args: any) => ({
                    preset: yup.string().required({
                        id: getTranslation('preset.error.required'),
                        defaultMessage: 'Editor preset is required',
                    }),
                }),
            },
        })

        app.registerPlugin({
            id: pluginId,
            initializer: Initializer,
            name,
        })
    },

    bootstrap(app: any) {},

    async registerTrads(app: any) {
        const { locales } = app

        const importedTranslations = await Promise.all(
            (locales as string[]).map((locale) => {
                return import(`./translations/${locale}.json`)
                    .then(({ default: data }) => {
                        return {
                            data: prefixPluginTranslations(data, pluginId),
                            locale,
                        }
                    })
                    .catch(() => {
                        return {
                            data: {},
                            locale,
                        }
                    })
            })
        )

        return importedTranslations
    },
}
