import * as yup from 'yup'

const HTMLAttributesYup = yup.object().shape({}).optional()

export const pluginConfigSchema = yup.object().shape({
    debug: yup.boolean().default(false),
    extensions: yup.object({
        headings: yup.object({
            enabled: yup.boolean().default(true),
            levels: yup.array().of(yup.number().integer().min(1).max(6)).default([1, 2, 3]),
            HTMLAttributes: yup.object().default({}),
        }),
        hardBreak: yup.object({
            enabled: yup.boolean().default(true),
            keepMarks: yup.boolean().default(false),
            HTMLAttributes: yup.object().default({}),
        }),
        blockquote: yup.object({
            enabled: yup.boolean().default(true),
            HTMLAttributes: yup.object().default({}),
        }),
        bulletList: yup.object({
            enabled: yup.boolean().default(true),
            itemTypeName: yup.string().default('listItem'),
            keepMarks: yup.boolean().default(false),
            keepAttributes: yup.boolean().default(false),
            HTMLAttributes: yup.object().default({}),
        }),
        orderedList: yup.object({
            enabled: yup.boolean().default(true),
            itemTypeName: yup.string().default('listItem'),
            keepMarks: yup.boolean().default(false),
            keepAttributes: yup.boolean().default(false),
            HTMLAttributes: yup.object().default({}),
        }),
        codeBlock: yup.object({
            enabled: yup.boolean().default(true),
            languageClassPrefix: yup.string().default('language-'),
            exitOnTripleEnter: yup.boolean().default(true),
            exitOnArrowDown: yup.boolean().default(true),
            HTMLAttributes: yup.object().default({}),
        }),
        horizontalRule: yup.object({
            enabled: yup.boolean().default(true),
            HTMLAttributes: yup.object().default({}),
        }),
        image: yup.object({
            enabled: yup.boolean().default(true),
            inline: yup.boolean().default(true),
            allowBase64: yup.boolean().default(false),
            HTMLAttributes: yup.object().default({}),
        }),
        listItem: yup.object({
            enabled: yup.boolean().default(true),
            HTMLAttributes: yup.object().default({}),
        }),
        paragraph: yup.object({
            enabled: yup.boolean().default(true),
            HTMLAttributes: yup.object().default({}),
        }),
        table: yup.object({
            enabled: yup.boolean().default(true),
            resizable: yup.boolean().default(false),
            handleWidth: yup.number().default(10),
            cellMinWidth: yup.number().default(25),
            lastColumnResizable: yup.boolean().default(true),
            allowTableNodeSelection: yup.boolean().default(false),
            HTMLAttributes: yup.object().default({}),
        }),
        bold: yup.object({
            enabled: yup.boolean().default(true),
            HTMLAttributes: yup.object().default({}),
        }),
        italic: yup.object({
            enabled: yup.boolean().default(true),
            HTMLAttributes: yup.object().default({}),
        }),
        link: yup.object({
            enabled: yup.boolean().default(true),
            protocols: yup.array().of(yup.string()).default(['http', 'https', 'mailto']),
            autolink: yup.boolean().default(false),
            openOnClick: yup.boolean().default(true),
            linkOnPaste: yup.boolean().default(true),
            defaultProtocol: yup.string().default('http'),
            HTMLAttributes: yup.object().default({}),
        }),
        strike: yup.object({
            enabled: yup.boolean().default(true),
            HTMLAttributes: yup.object().default({}),
        }),
        subscript: yup.object({
            enabled: yup.boolean().default(true),
            HTMLAttributes: yup.object().default({}),
        }),
        superscript: yup.object({
            enabled: yup.boolean().default(true),
            HTMLAttributes: yup.object().default({}),
        }),
        underline: yup.object({
            enabled: yup.boolean().default(true),
            HTMLAttributes: yup.object().default({}),
        }),
        highlight: yup.object({
            enabled: yup.boolean().default(true),
            multicolor: yup.boolean().default(false),
            HTMLAttributes: yup.object().default({}),
        }),
        textAlign: yup.object({
            enabled: yup.boolean().default(true),
            types: yup.array().of(yup.string()).default(['heading', 'paragraph', 'blockquote']),
            alignments: yup
                .array()
                .of(yup.string())
                .default(['left', 'center', 'right', 'justify']),
            defaultAlignment: yup.string().default('left'),
        }),
        typography: yup.object({
            enabled: yup.boolean().default(true),
            types: yup.array().of(yup.string()).default(['heading', 'paragraph']),
            defaultType: yup.string().default('paragraph'),
            emDash: yup.boolean().default(true),
            ellipsis: yup.boolean().default(true),
            openDoubleQuote: yup.boolean().default(true),
            closeDoubleQuote: yup.boolean().default(true),
            openSingleQuote: yup.boolean().default(true),
            closeSingleQuote: yup.boolean().default(true),
            leftArrow: yup.boolean().default(true),
            rightArrow: yup.boolean().default(true),
            copyright: yup.boolean().default(true),
            registeredTrademark: yup.boolean().default(true),
            trademark: yup.boolean().default(true),
            servicemark: yup.boolean().default(true),
            oneHalf: yup.boolean().default(true),
            oneQuarter: yup.boolean().default(true),
            threeQuarters: yup.boolean().default(true),
            plusMinus: yup.boolean().default(true),
            notEqual: yup.boolean().default(true),
            laquo: yup.boolean().default(true),
            raquo: yup.boolean().default(true),
            multiplication: yup.boolean().default(true),
            superscriptTwo: yup.boolean().default(true),
            superscriptThree: yup.boolean().default(true),
        }),
        history: yup.object({
            enabled: yup.boolean().default(true),
            depth: yup.number().integer().min(1).default(20),
            newGroupDelay: yup.number().integer().min(0).default(500),
        }),
        dropcursor: yup.object({
            enabled: yup.boolean().default(true),
            color: yup.string().default('black'),
            width: yup.number().default(1),
            class: yup.string().optional(),
        }),
        gapcursor: yup.object({
            enabled: yup.boolean().default(true),
        }),
        placeholder: yup.object({
            enabled: yup.boolean().default(true),
            emptyEditorClass: yup.string().default('is-editor-empty'),
            emptyNodeClass: yup.string().default('is-empty'),
            placeholder: yup.string().default('Write something…'),
            showOnlyWhenEditable: yup.boolean().default(true),
            showOnlyCurrent: yup.boolean().default(false),
            includeChildren: yup.boolean().default(false),
        }),
        characterCount: yup.object({
            enabled: yup.boolean().default(false),
            limit: yup.number().nullable().default(null),
            mode: yup.string().default('relaxed'),
        }),
    }),
})

export type PluginConfig = yup.InferType<typeof pluginConfigSchema>
