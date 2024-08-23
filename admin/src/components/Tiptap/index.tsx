import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Wrapper from './style'

import { Box, Field, FieldLabel, Flex, Stack, Typography } from '@strapi/design-system'
import React, { useIntl } from 'react-intl'
import MenuBar from './MenuBar'

import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'

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
import Highlight from '@tiptap/extension-highlight'
// import TextStyleExtension from '@tiptap/extension-text-style'
import UnderlineExtension from '@tiptap/extension-underline'
import CharacterCounter from './CharacterCounter'

import { ColorHighlighter } from '../../extensions/color-highlighter'
import MenuBarTable from './MenuBarTable'
import MediaLib from '../MediaLib'

// Floating bubble menu for table
const BubbleTableMenu = ({ editor }) => {
    if (!editor) return null

    let menuBars = []

    if (editor.isActive('table')) {
        menuBars.push(MenuBarTable({ editor }))
    }

    return (
        <BubbleMenu editor={editor} tippyOptions={{ zIndex: 2, duration: 100, maxWidth: '450px' }}>
            {menuBars.length ? (
                <Flex padding={1} className="menubar floating" style={{ flexWrap: 'wrap' }}>
                    {/* Render menu bars */}
                    {menuBars}
                </Flex>
            ) : null}
        </BubbleMenu>
    )
}

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
    // Media library handling
    const [forceInsert, setForceInsert] = useState(false)

    const [showMediaLibDialog, setShowMediaLibDialog] = useState(false)
    const handleToggleMediaLibDialog = () => {
        setShowMediaLibDialog(!showMediaLibDialog)
    }

    // Debug
    const [debug, setDebug] = useState(false)
    const [hasDebug, setHasDebug] = useState(false)
    // Content
    const [content, setContent] = useState('')

    const characterLimit = attribute?.maxLength || 0

    const extensions = [
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
        Highlight.configure({ multicolor: false }),
        TextAlignExtension.configure({
            types: ['heading', 'paragraph'],
        }),
        // Table
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
        ColorHighlighter,
    ]

    const editor = useEditor({
        extensions,
        parseOptions: {
            preserveWhitespace: 'full',
        },
        onBeforeCreate({ editor }) {},

        onUpdate({ editor }) {
            // if (debug) console.log('onUpdate')
            const saveFormat = 'json'

            const contentToSave =
                saveFormat === 'json' ? JSON.stringify(editor.getJSON()) : editor.getHTML()

            onChange({ target: { name, value: contentToSave } })
        },
    })

    const getUpdatedImage = (asset) => ({
        src: asset.url,
        alt: asset.alt,
        ...(asset.width && { width: asset.width }),
        ...(asset.height && { height: asset.height }),
        ...(asset.url?.includes('lazy') || (asset.caption === 'lazy' && { loading: 'lazy' })),
    })

    const handleChangeAssets = (assets) => {
        if (!forceInsert && editor?.isActive('image')) {
            assets.map((asset) => {
                if (asset.mime.includes('image')) {
                    editor.chain().focus().setImage(getUpdatedImage(asset)).run()
                }
            })
        } else {
            assets.map((asset) => {
                if (asset.mime.includes('image')) {
                    editor?.commands.setImage(getUpdatedImage(asset))
                }
            })
        }

        setForceInsert(false)
        handleToggleMediaLibDialog()
    }

    useEffect(() => {
        if (!editor) return

        if (content === '') {
            try {
                // If content is saved as json, parse it
                const json = JSON.parse(value)
                setContent(value)
                editor.commands.setContent(json, false)
            } catch (e) {
                // Use value as is, the content hasn't been converted to json.
                setContent(value)
                editor.commands.setContent(value, false)
            }
        }
    }, [editor])

    return (
        <Field name={name} required={required}>
            <Stack spacing={1}>
                <Box>
                    <FieldLabel action={labelAction}> {formatMessage(intlLabel)}</FieldLabel>
                </Box>
                <Wrapper>
                    <Flex gap={1} alignItems={'flex-start'}>
                        <Box hasRadius overflow={'hidden'} style={{ flex: '1' }}>
                            <MenuBar editor={editor} toggleMediaLib={handleToggleMediaLibDialog} />
                            <BubbleTableMenu editor={editor} />

                            <Box
                                className="editor-content-wrapper"
                                padding={2}
                                background="neutral0"
                                maxHeight={'600px'}
                                minHeight={'100px'}
                                style={{ resize: 'vertical', overflow: 'auto' }}
                            >
                                <EditorContent key="editor" editor={editor} />
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
            {showMediaLibDialog && (
                <MediaLib
                    isOpen={showMediaLibDialog}
                    onChange={handleChangeAssets}
                    onToggle={handleToggleMediaLibDialog}
                />
            )}
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
