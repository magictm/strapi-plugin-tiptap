import Joi from 'joi'

const HTMLAttributesJoi = Joi.object().pattern(Joi.string(), Joi.string()).optional()

export const pluginConfigSchema = Joi.object({
    debug: Joi.boolean().default(false),
    extensions: Joi.object({
        headings: Joi.object({
            enabled: Joi.boolean().default(true),
            levels: Joi.array().items(Joi.number()).default([1, 2, 3, 4, 5, 6]),
            HTMLAttributes: HTMLAttributesJoi,
        }),
        hardBreak: Joi.object({
            enabled: Joi.boolean().default(true),
            keepMarks: Joi.boolean().default(false),
            HTMLAttributes: HTMLAttributesJoi,
        }),
        blockquote: Joi.object({
            enabled: Joi.boolean().default(true),
            HTMLAttributes: HTMLAttributesJoi,
        }),
        bulletList: Joi.object({
            enabled: Joi.boolean().default(true),
            itemTypeName: Joi.string().default('listItem'),
            keepMarks: Joi.boolean().default(false),
            keepAttributes: Joi.boolean().default(false),
            HTMLAttributes: HTMLAttributesJoi,
        }),
        orderedList: Joi.object({
            enabled: Joi.boolean().default(true),
            itemTypeName: Joi.string().default('listItem'),
            keepMarks: Joi.boolean().default(false),
            keepAttributes: Joi.boolean().default(false),
            HTMLAttributes: HTMLAttributesJoi,
        }),
        codeBlock: Joi.object({
            enabled: Joi.boolean().default(true),
            languageClassPrefix: Joi.string().default('language-'),
            exitOnTripleEnter: Joi.boolean().default(true),
            exitOnArrowDown: Joi.boolean().default(true),
            HTMLAttributes: HTMLAttributesJoi,
        }),
        horizontalRule: Joi.object({
            enabled: Joi.boolean().default(true),
            HTMLAttributes: HTMLAttributesJoi,
        }),
        image: Joi.object({
            enabled: Joi.boolean().default(true),
            inline: Joi.boolean().default(true),
            allowBase64: Joi.boolean().default(false),
            HTMLAttributes: HTMLAttributesJoi,
        }),
        listItem: Joi.object({
            enabled: Joi.boolean().default(true),
            HTMLAttributes: HTMLAttributesJoi,
        }),
        paragraph: Joi.object({
            enabled: Joi.boolean().default(true),
            HTMLAttributes: HTMLAttributesJoi,
        }),
        table: Joi.object({
            enabled: Joi.boolean().default(true),
            resizable: Joi.boolean().default(false),
            handleWidth: Joi.number().default(5),
            cellMinWidth: Joi.number().default(25),
            lastColumnResizable: Joi.boolean().default(true),
            allowTableNodeSelection: Joi.boolean().default(false),
            HTMLAttributes: HTMLAttributesJoi,
        }),
        bold: Joi.object({
            enabled: Joi.boolean().default(true),
            HTMLAttributes: HTMLAttributesJoi,
        }),
        italic: Joi.object({
            enabled: Joi.boolean().default(true),
            HTMLAttributes: HTMLAttributesJoi,
        }),
        link: Joi.object({
            enabled: Joi.boolean().default(true),
            protocols: Joi.array().items(Joi.string()).default(['http', 'https', 'mailto']),
            autolink: Joi.boolean().default(false),
            openOnClick: Joi.boolean().default(true),
            linkOnPaste: Joi.boolean().default(true),
            defaultProtocol: Joi.string().default('http'),
            HTMLAttributes: HTMLAttributesJoi,
        }),
        strike: Joi.object({
            enabled: Joi.boolean().default(true),
            HTMLAttributes: HTMLAttributesJoi,
        }),
        subscript: Joi.object({
            enabled: Joi.boolean().default(true),
            HTMLAttributes: HTMLAttributesJoi,
        }),
        superscript: Joi.object({
            enabled: Joi.boolean().default(true),
            HTMLAttributes: HTMLAttributesJoi,
        }),
        underline: Joi.object({
            enabled: Joi.boolean().default(true),
            HTMLAttributes: HTMLAttributesJoi,
        }),
        highlight: Joi.object({
            enabled: Joi.boolean().default(true),
            multicolor: Joi.boolean().default(false),
            HTMLAttributes: HTMLAttributesJoi,
        }),
        textAlign: Joi.object({
            enabled: Joi.boolean().default(true),
            types: Joi.array().items(Joi.string()).default(['paragraph', 'heading']),
            alignments: Joi.array()
                .items(Joi.string())
                .default(['left', 'center', 'right', 'justify']),
            defaultAlignment: Joi.string().default('left'),
        }),
        typography: Joi.object({
            enabled: Joi.boolean().default(true),
            types: Joi.array().items(Joi.string()).default([]),
            defaultType: Joi.string().optional(),
            emDash: Joi.alternatives(Joi.string(), Joi.boolean()).default(true),
            ellipsis: Joi.alternatives(Joi.string(), Joi.boolean()).default(true),
            openDoubleQuote: Joi.alternatives(Joi.string(), Joi.boolean()).default(true),
            closeDoubleQuote: Joi.alternatives(Joi.string(), Joi.boolean()).default(true),
            openSingleQuote: Joi.alternatives(Joi.string(), Joi.boolean()).default(true),
            closeSingleQuote: Joi.alternatives(Joi.string(), Joi.boolean()).default(true),
            leftArrow: Joi.alternatives(Joi.string(), Joi.boolean()).default(true),
            rightArrow: Joi.alternatives(Joi.string(), Joi.boolean()).default(true),
            copyright: Joi.alternatives(Joi.string(), Joi.boolean()).default(true),
            registeredTrademark: Joi.alternatives(Joi.string(), Joi.boolean()).default(true),
            trademark: Joi.alternatives(Joi.string(), Joi.boolean()).default(true),
            servicemark: Joi.alternatives(Joi.string(), Joi.boolean()).default(true),
            oneHalf: Joi.alternatives(Joi.string(), Joi.boolean()).default(true),
            oneQuarter: Joi.alternatives(Joi.string(), Joi.boolean()).default(true),
            threeQuarters: Joi.alternatives(Joi.string(), Joi.boolean()).default(true),
            plusMinus: Joi.alternatives(Joi.string(), Joi.boolean()).default(true),
            notEqual: Joi.alternatives(Joi.string(), Joi.boolean()).default(true),
            laquo: Joi.alternatives(Joi.string(), Joi.boolean()).default(true),
            raquo: Joi.alternatives(Joi.string(), Joi.boolean()).default(true),
            multiplication: Joi.alternatives(Joi.string(), Joi.boolean()).default(true),
            superscriptTwo: Joi.alternatives(Joi.string(), Joi.boolean()).default(true),
            superscriptThree: Joi.alternatives(Joi.string(), Joi.boolean()).default(true),
        }),
        history: Joi.object({
            enabled: Joi.boolean().default(true),
            depth: Joi.number().default(200),
            newGroupDelay: Joi.number().default(500),
        }),
        dropcursor: Joi.object({
            enabled: Joi.boolean().default(true),
            color: Joi.string().default('black'),
            width: Joi.number().default(1),
            class: Joi.string().optional(),
        }),
        gapcursor: Joi.object({
            enabled: Joi.boolean().default(true),
        }),
        placeholder: Joi.object({
            enabled: Joi.boolean().default(true),
            emptyEditorClass: Joi.string().default('is-editor-empty'),
            emptyNodeClass: Joi.string().default('is-empty'),
            placeholder: Joi.string().optional(),
            showOnlyWhenEditable: Joi.boolean().default(true),
            showOnlyCurrent: Joi.boolean().default(false),
            includeChildren: Joi.boolean().default(false),
        }),
        characterCount: Joi.object({
            enabled: Joi.boolean().default(false),
            limit: Joi.number().allow(null).optional(),
            mode: Joi.string().default('textSize'),
        }),
    }),
}).default({})

export interface PluginConfig {
    debug: boolean
    extensions: {
        headings: {
            enabled: boolean
            levels: number[]
            HTMLAttributes?: {
                [key: string]: string
            }
        }
        hardBreak: {
            enabled: boolean
            keepMarks: boolean
            HTMLAttributes?: {
                [key: string]: string
            }
        }
        blockquote: {
            enabled: boolean
            HTMLAttributes?: {
                [key: string]: string
            }
        }
        bulletList: {
            enabled: boolean
            itemTypeName: string
            keepMarks: boolean
            keepAttributes: boolean
            HTMLAttributes?: {
                [key: string]: string
            }
        }
        orderedList: {
            enabled: boolean
            itemTypeName: string
            keepMarks: boolean
            keepAttributes: boolean
            HTMLAttributes?: {
                [key: string]: string
            }
        }
        codeBlock: {
            enabled: boolean
            languageClassPrefix: string
            exitOnTripleEnter: boolean
            exitOnArrowDown: boolean
            HTMLAttributes?: {
                [key: string]: string
            }
        }
        horizontalRule: {
            enabled: boolean
            HTMLAttributes?: {
                [key: string]: string
            }
        }
        image: {
            enabled: boolean
            inline: boolean
            allowBase64: boolean
            HTMLAttributes?: {
                [key: string]: string
            }
        }
        listItem: {
            enabled: boolean
            HTMLAttributes?: {
                [key: string]: string
            }
        }
        paragraph: {
            enabled: boolean
            HTMLAttributes?: {
                [key: string]: string
            }
        }
        table: {
            enabled: boolean
            resizable: boolean
            handleWidth: number
            cellMinWidth: number
            lastColumnResizable: boolean
            allowTableNodeSelection: boolean
            HTMLAttributes?: {
                [key: string]: string
            }
        }
        bold: {
            enabled: boolean
            HTMLAttributes?: {
                [key: string]: string
            }
        }
        italic: {
            enabled: boolean
            HTMLAttributes?: {
                [key: string]: string
            }
        }
        link: {
            enabled: boolean
            protocols: string[]
            autolink: boolean
            openOnClick: boolean
            linkOnPaste: boolean
            defaultProtocol: string
            HTMLAttributes?: {
                [key: string]: string
            }
        }
        strike: {
            enabled: boolean
            HTMLAttributes?: {
                [key: string]: string
            }
        }
        subscript: {
            enabled: boolean
            HTMLAttributes?: {
                [key: string]: string
            }
        }
        superscript: {
            enabled: boolean
            HTMLAttributes?: {
                [key: string]: string
            }
        }
        underline: {
            enabled: boolean
            HTMLAttributes?: {
                [key: string]: string
            }
        }
        highlight: {
            enabled: boolean
            multicolor: boolean
            HTMLAttributes?: {
                [key: string]: string
            }
        }
        textAlign: {
            enabled: boolean
            types: string[]
            alignments: string[]
            defaultAlignment: string
        }
        typography: {
            enabled: boolean
            types: string[]
            defaultType: string
            emDash: string | boolean
            ellipsis: string | boolean
            openDoubleQuote: string | boolean
            closeDoubleQuote: string | boolean
            openSingleQuote: string | boolean
            closeSingleQuote: string | boolean
            leftArrow: string | boolean
            rightArrow: string | boolean
            copyright: string | boolean
            registeredTrademark: string | boolean
            trademark: string | boolean
            servicemark: string | boolean
            oneHalf: string | boolean
            oneQuarter: string | boolean
            threeQuarters: string | boolean
            plusMinus: string | boolean
            notEqual: string | boolean
            laquo: string | boolean
            raquo: string | boolean
            multiplication: string | boolean
            superscriptTwo: string | boolean
            superscriptThree: string | boolean
        }
        history: {
            enabled: boolean
            depth: number
            newGroupDelay: number
        }
        dropcursor: {
            enabled: boolean
            color: string
            width: number
            class?: string
        }
        gapcursor: {
            enabled: boolean
        }
        placeholder: {
            enabled: boolean
            emptyEditorClass: string
            emptyNodeClass: string
            placeholder: string
            showOnlyWhenEditable: boolean
            showOnlyCurrent: boolean
            includeChildren: boolean
        }
        characterCount: {
            enabled: boolean
            limit: null | number
            mode: string
        }
    }
}
