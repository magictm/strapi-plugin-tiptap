import { pluginConfigSchema } from './schema'

export default {
    default: {
        // Debug mode
        debug: false,
        // Tiptap extensions
        extensions: {
            // Nodes
            headings: {
                enabled: true,
                levels: [1, 2, 3, 4, 5, 6],
            },
            hardBreak: {
                enabled: true,
                keepMarks: true,
            },
            blockquote: {
                enabled: true,
            },
            bulletList: {
                enabled: true,
                itemTypeName: 'listItem',
                keepMarks: false,
                keepAttributes: false,
            },
            orderedList: {
                enabled: true,
                itemTypeName: 'listItem',
                keepMarks: false,
                keepAttributes: false,
            },
            codeBlock: {
                enabled: true,
                languageClassPrefix: 'language-',
                exitOnTripleEnter: true,
                exitOnArrowDown: true,
            },
            horizontalRule: {
                enabled: true,
            },
            image: {
                enabled: true,
                inline: false,
                allowBase64: false,
            },
            listItem: {
                enabled: true,
            },
            paragraph: {
                enabled: true,
            },

            table: {
                enabled: true,
                resizable: false,
                handleWidth: 5,
                cellMinWidth: 25,
                lastColumnResizable: true,
                allowTableNodeSelection: false,
                // View: TableView,
            },

            // Marks
            bold: {
                enabled: true,
            },
            italic: {
                enabled: true,
            },
            link: {
                enabled: true,
                // Additional custom protocols you would like to be recognized as links.
                protocols: [],
                // If enabled, it adds links as you type.
                autolink: true,
                // If enabled, links will be opened on click.
                openOnClick: true,
                // Adds a link to the current selection if the pasted content only contains an url.
                linkOnPaste: true,
                // The default protocol used by linkOnPaste and autolink when no protocol is defined.
                defaultProtocol: 'http',
                // A function that validates every autolinked link. If it exists, it will be called with the link href as argument. If it returns false, the link will be removed.
                // validate: (href) => /^https?:\/\//.test(href),
            },
            strike: {
                enabled: true,
            },
            subscript: {
                enabled: false,
            },
            superscript: {
                enabled: false,
            },
            underline: {
                enabled: true,
            },
            highlight: {
                enabled: true,
                multicolor: false,
            },

            // Functionality
            textAlign: {
                enabled: true,
                types: [],
                alignments: ['left', 'center', 'right', 'justify'],
                defaultAlignment: 'left',
            },
            typography: {
                enabled: true,
                types: [],
                defaultType: 'paragraph',
                emDash: true,
                ellipsis: true,
                openDoubleQuote: true,
                closeDoubleQuote: true,
                openSingleQuote: true,
                closeSingleQuote: true,
                leftArrow: true,
                rightArrow: true,
                copyright: true,
                registeredTrademark: true,
                trademark: true,
                servicemark: true,
                oneHalf: true,
                oneQuarter: true,
                threeQuarters: true,
                plusMinus: true,
                notEqual: true,
                laquo: true,
                raquo: true,
                multiplication: true,
                superscriptTwo: true,
                superscriptThree: true,
            },
            history: {
                enabled: true,
                depth: 100,
                newGroupDelay: 500,
            },
            dropcursor: {
                enabled: true,
                color: 'currentColor',
                width: 1,
            },
            gapcursor: {
                enabled: true,
            },
            placeholder: {
                enabled: true,
                emptyEditorClass: 'is-editor-empty',
                emptyNodeClass: 'is-empty',
                // Can be function
                placeholder: 'Write something …',
                showOnlyWhenEditable: true,
                showOnlyCurrent: true,
                includeChildren: false,
            },
            characterCount: {
                enabled: true,
            },
        },
    },
    validator(config) {
        pluginConfigSchema.validateSync(config)
    },
}
