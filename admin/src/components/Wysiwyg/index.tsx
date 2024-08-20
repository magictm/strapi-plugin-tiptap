import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Wrapper from './style'

import { Box, Field, FieldLabel, Flex, Stack, Typography } from '@strapi/design-system'
import { useIntl } from 'react-intl'
import MenuBar from './MenuBar'

import { EditorContent, useEditor } from '@tiptap/react'

// Tiptap Extensions
import BlockquoteExtension from '@tiptap/extension-blockquote'
import BoldExtension from '@tiptap/extension-bold'
import BulletListExtension from '@tiptap/extension-bullet-list'
import CharacterCountExtension from '@tiptap/extension-character-count'
import CodeExtension from '@tiptap/extension-code'
import CodeBlockExtension from '@tiptap/extension-code-block'
import DocumentExtension from '@tiptap/extension-document'
import GapcursorExtension from '@tiptap/extension-gapcursor'
import HardBreakExtension from '@tiptap/extension-hard-break'
import HeadingExtension from '@tiptap/extension-heading'
import HistoryExtension from '@tiptap/extension-history'
import HorizontalRuleExtension from '@tiptap/extension-horizontal-rule'
import ImageExtension from '@tiptap/extension-image'
import ItalicExtension from '@tiptap/extension-italic'
import LinkExtension from '@tiptap/extension-link'
import ListItemExtension from '@tiptap/extension-list-item'
import OrderedListExtension from '@tiptap/extension-ordered-list'
import ParagraphExtension from '@tiptap/extension-paragraph'
import PlaceholderExtension from '@tiptap/extension-placeholder'
import StrikeExtension from '@tiptap/extension-strike'
import TableExtension from '@tiptap/extension-table'
import TableCellExtension from '@tiptap/extension-table-cell'
import TableHeaderExtension from '@tiptap/extension-table-header'
import TableRowExtension from '@tiptap/extension-table-row'
import TextExtension from '@tiptap/extension-text'
import TextAlignExtension from '@tiptap/extension-text-align'
// import TextStyleExtension from '@tiptap/extension-text-style'
import UnderlineExtension from '@tiptap/extension-underline'
import CharacterCounter from './CharacterCounter'

const Wysiwyg = (opts: any) => {
    const {
        hint,
        disabled,
        error,
        intlLabel,
        labelAction,
        name,
        onChange,
        placeholder,
        value,
        required,
        playground,
        description,
        attribute,
    } = opts

    // Debug
    // console.log('opts', opts)

    const { formatMessage } = useIntl()
    const [mediaLibVisible, setMediaLibVisible] = useState(false)
    const [debug, setDebug] = useState(false)
    const [hasDebug, setHasDebug] = useState(false)
    const [content, setContent] = useState(value || '')

    const characterLimit = attribute?.maxLength || 0

    const handleToggleMediaLib = () => setMediaLibVisible((prev) => !prev)

    const editor = useEditor({
        extensions: [
            DocumentExtension,
            ParagraphExtension,
            TextExtension,
            BoldExtension,
            StrikeExtension,
            ItalicExtension,
            GapcursorExtension,
            ListItemExtension,
            BulletListExtension,
            OrderedListExtension,
            HeadingExtension,
            UnderlineExtension,
            LinkExtension,
            ImageExtension,
            TextAlignExtension.configure({
                types: ['heading', 'paragraph'],
            }),
            TableExtension.configure({
                allowTableNodeSelection: true,
            }),
            TableRowExtension,
            TableCellExtension,
            TableHeaderExtension,
            // TextStyleExtension,
            BlockquoteExtension,
            CodeBlockExtension,
            CodeExtension,
            HardBreakExtension,
            HorizontalRuleExtension,
            CharacterCountExtension.configure({
                limit: characterLimit,
            }),

            PlaceholderExtension.configure({
                placeholder: ({ node }) => {
                    if (node.type.name === 'heading') {
                        // console.log('node heading')
                        return 'Write awesome title...'
                    }

                    // console.log(node)

                    return 'Write something awesome...'
                },
            }),
            HistoryExtension,
        ],

        content,

        parseOptions: {
            preserveWhitespace: 'full',
        },

        onBeforeCreate({ editor }) {},

        onUpdate({ editor }) {
            // if (debug) console.log('onUpdate')

            onChange({ target: { name, value: editor.getHTML() } })
        },
    })

    useEffect(() => {
        if (!editor) return

        if (content === '') {
            setContent(value)
            editor.commands.setContent(value, false)
        }
    }, [editor])

    return (
        <Field required={required}>
            <Stack spacing={1}>
                <Box>
                    <FieldLabel action={labelAction}> {formatMessage(intlLabel)}</FieldLabel>
                </Box>
                <Wrapper>
                    <Flex gap={1} alignItems={'flex-start'}>
                        <Box hasRadius overflow={'hidden'} style={{ flex: '1' }}>
                            <MenuBar
                                editor={editor}
                                debug={debug}
                                setDebug={setDebug}
                                playground={playground}
                            />
                            <Box
                                className="editor-content-wrapper"
                                padding={2}
                                background="neutral0"
                                maxHeight={'600px'}
                                minHeight={'100px'}
                                style={{ resize: 'vertical', overflow: 'auto' }}
                            >
                                <EditorContent editor={editor} />
                            </Box>

                            {editor && (
                                <CharacterCounter editor={editor} characterLimit={characterLimit} />
                            )}
                        </Box>
                    </Flex>
                </Wrapper>
                {error && (
                    <Typography variant="pi" textColor="danger600">
                        {formatMessage({ id: error, defaultMessage: error })}
                    </Typography>
                )}
                {description && <Typography variant="pi">{formatMessage(description)}</Typography>}
            </Stack>
        </Field>
    )
}

Wysiwyg.defaultProps = {
    disabled: false,
    playground: false,
    error: '',
    labelAction: undefined,
    placeholder: null,
    required: false,
    value: '',
    hint: '',
    description: null,
}

Wysiwyg.propTypes = {
    hint: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    disabled: PropTypes.bool,
    playground: PropTypes.bool,
    error: PropTypes.string,
    intlLabel: PropTypes.shape({
        id: PropTypes.string.isRequired,
        defaultMessage: PropTypes.string.isRequired,
        values: PropTypes.object,
    }).isRequired,
    labelAction: PropTypes.element,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.shape({
        id: PropTypes.string.isRequired,
        defaultMessage: PropTypes.string.isRequired,
        values: PropTypes.object,
    }),
    required: PropTypes.bool,
    value: PropTypes.string,
    description: PropTypes.shape({
        id: PropTypes.string,
        defaultMessage: PropTypes.string,
    }),
}

export default Wysiwyg
