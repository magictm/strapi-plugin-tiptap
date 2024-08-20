import {
    Box,
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    Flex,
    IconButton,
    IconButtonGroup,
    Option,
    Select,
    Stack,
    Switch,
    TextInput,
    Typography,
} from '@strapi/design-system'
import {
    Bold as BoldIcon,
    BulletList as BulletListIcon,
    Code as CodeIcon,
    Italic as ItalicIcon,
    Link as LinkIcon,
    NumberList as NumberListIcon,
    StrikeThrough as StrikeThroughIcon,
    Underline as UnderlineIcon,
} from '@strapi/icons'
import { useState } from 'react'
import {
    AiOutlineAlignCenter,
    AiOutlineAlignLeft,
    AiOutlineAlignRight,
    AiOutlineLine,
    AiOutlineTable,
} from 'react-icons/ai'
import { BiCodeBlock as BiCodeBlockIcon } from 'react-icons/bi'
import { FaRemoveFormat as RemoveFormatIcon } from 'react-icons/fa'
import { GrBlockQuote as GrBlockQuoteIcon } from 'react-icons/gr'
import { HiArrowUturnRight as RedoIcon, HiArrowUturnLeft as UndoIcon } from 'react-icons/hi2'

const onHeadingChange = (editor, type) => {
    switch (type) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
            editor
                .chain()
                .focus()
                .toggleHeading({ level: parseInt(type.replace('h', '')) })
                .run()
            break
        case 'paragraph':
            editor.chain().focus().setParagraph().run()
            break
    }
}

const MenuBar = ({ editor, debug, setDebug, playground }) => {
    const [isVisibleLinkDialog, setIsVisibleLinkDialog] = useState(false)
    const [linkInput, setLinkInput] = useState('')
    const [linkTargetInput, setLinkTargetInput] = useState('')

    const onInsertLink = () => {
        // Empty
        if (linkInput === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
        } else {
            // Update link
            editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: linkInput, target: linkTargetInput })
                .run()
        }

        // Reset dialog
        setIsVisibleLinkDialog(false)
        setLinkInput('')
        setLinkTargetInput('')
    }

    const openLinkDialog = () => {
        const previousUrl = editor.getAttributes('link').href
        const previousTarget = editor.getAttributes('link').target

        // Update fields before showing dialog
        if (previousUrl) setLinkInput(previousUrl)
        if (previousTarget) setLinkTargetInput(previousTarget)

        setIsVisibleLinkDialog(true)
    }

    if (!editor) {
        return null
    }

    let selectedTextStyle = 'none'

    if (editor.isActive('heading', { level: 1 })) selectedTextStyle = 'h1'
    if (editor.isActive('heading', { level: 2 })) selectedTextStyle = 'h2'
    if (editor.isActive('heading', { level: 3 })) selectedTextStyle = 'h3'
    if (editor.isActive('heading', { level: 4 })) selectedTextStyle = 'h4'
    if (editor.isActive('heading', { level: 5 })) selectedTextStyle = 'h5'
    if (editor.isActive('heading', { level: 6 })) selectedTextStyle = 'h6'
    if (editor.isActive('paragraph')) selectedTextStyle = 'paragraph'

    return (
        <Box
            padding={2}
            background="neutral100"
            borderStyle="solid"
            borderColor="neutral200"
            className="menubar"
        >
            <Flex justifyContent="space-between">
                <Flex style={{ flexWrap: 'wrap' }}>
                    <Box className="button-group">
                        <Select
                            required
                            size="S"
                            placeholder="Text style"
                            onChange={(val) => onHeadingChange(editor, val)}
                            value={selectedTextStyle}
                        >
                            <Option value={'paragraph'}>Paragraph</Option>
                            <Option value={'h1'}>Heading 1</Option>
                            <Option value={'h2'}>Heading 2</Option>
                            <Option value={'h3'}>Heading 3</Option>
                            <Option value={'h4'}>Heading 4</Option>
                            <Option value={'h5'}>Heading 5</Option>
                            <Option value={'h6'}>Heading 6</Option>
                        </Select>
                    </Box>

                    <IconButtonGroup className="button-group">
                        <IconButton
                            icon={<BoldIcon />}
                            label="Bold"
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            disabled={!editor.can().chain().focus().toggleBold().run()}
                            className={['large-icon', editor.isActive('bold') ? 'is-active' : '']}
                        />
                        <IconButton
                            icon={<ItalicIcon />}
                            label="Italic"
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            disabled={!editor.can().chain().focus().toggleItalic().run()}
                            className={['large-icon', editor.isActive('italic') ? 'is-active' : '']}
                        />
                        <IconButton
                            icon={<StrikeThroughIcon />}
                            label="Strikethrough"
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            disabled={!editor.can().chain().focus().toggleStrike().run()}
                            className={['large-icon', editor.isActive('strike') ? 'is-active' : '']}
                        />
                        <IconButton
                            icon={<UnderlineIcon />}
                            label="Underline"
                            className={[
                                'large-icon',
                                editor.isActive('underline') ? 'is-active' : '',
                            ]}
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            disabled={!editor.can().chain().focus().toggleUnderline().run()}
                        />
                    </IconButtonGroup>

                    <IconButtonGroup className="button-group">
                        <IconButton
                            icon={<AiOutlineAlignLeft />}
                            label="Align left"
                            className={'large-icon'}
                            onClick={() => editor.chain().focus().setTextAlign('left').run()}
                            disabled={!editor.can().chain().focus().setTextAlign('left').run()}
                        />
                        <IconButton
                            icon={<AiOutlineAlignCenter />}
                            label="Align center"
                            className={'large-icon'}
                            onClick={() => editor.chain().focus().setTextAlign('center').run()}
                            disabled={!editor.can().chain().focus().setTextAlign('center').run()}
                        />
                        <IconButton
                            icon={<AiOutlineAlignRight />}
                            label="Align right"
                            className={'large-icon'}
                            onClick={() => editor.chain().focus().setTextAlign('right').run()}
                            disabled={!editor.can().chain().focus().setTextAlign('right').run()}
                        />
                    </IconButtonGroup>

                    <IconButtonGroup className="button-group">
                        <IconButton
                            icon={<BulletListIcon />}
                            label="Bullet list"
                            className={[
                                'large-icon',
                                editor.isActive('bulletList') ? 'is-active' : '',
                            ]}
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                        />
                        <IconButton
                            icon={<NumberListIcon />}
                            label="Ordered list"
                            className={[
                                'large-icon',
                                editor.isActive('orderedList') ? 'is-active' : '',
                            ]}
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        />
                    </IconButtonGroup>

                    <IconButtonGroup className="button-group">
                        <IconButton
                            icon={<CodeIcon />}
                            label="Code"
                            className={['large-icon', editor.isActive('code') ? 'is-active' : '']}
                            onClick={() => editor.chain().focus().toggleCode().run()}
                            disabled={!editor.can().chain().focus().toggleCode().run()}
                        />
                        <IconButton
                            icon={<BiCodeBlockIcon />}
                            label="Code Block"
                            className={[
                                'large-icon',
                                editor.isActive('codeBlock') ? 'is-active' : '',
                            ]}
                            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        />

                        <IconButton
                            icon={<GrBlockQuoteIcon />}
                            label="Blockquote"
                            className={[
                                'large-icon',
                                editor.isActive('blockquote') ? 'is-active' : '',
                            ]}
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        />

                        <IconButton
                            icon={<AiOutlineTable />}
                            label="Table"
                            className={['large-icon', editor.isActive('table') ? 'is-active' : '']}
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .insertTable({
                                        cols: 3,
                                        row: 3,
                                        withHeaderRow: false,
                                    })
                                    .run()
                            }
                        />

                        <IconButton
                            icon={<AiOutlineLine />}
                            label="Horizontal line"
                            className={['large-icon']}
                            onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        />

                        <IconButton
                            icon={<LinkIcon />}
                            label="Link"
                            className={['medium-icon', editor.isActive('link') ? 'is-active' : '']}
                            onClick={() => openLinkDialog()}
                        />
                        <IconButton
                            icon={<RemoveFormatIcon />}
                            label="Remove formating"
                            className={['large-icon']}
                            onClick={() => {
                                editor.chain().focus().clearNodes().run()
                            }}
                        />
                    </IconButtonGroup>

                    {/* UNDO / REDO */}
                    <IconButtonGroup className="button-group">
                        <IconButton
                            icon={<UndoIcon />}
                            label="Undo"
                            className={['large-icon']}
                            onClick={() => editor.chain().focus().undo().run()}
                            disabled={!editor.can().chain().focus().undo().run()}
                        />
                        <IconButton
                            icon={<RedoIcon />}
                            label="Redo"
                            className={['large-icon']}
                            onClick={() => editor.chain().focus().redo().run()}
                            disabled={!editor.can().chain().focus().redo().run()}
                        />
                    </IconButtonGroup>
                </Flex>
                {playground && (
                    <Flex className={'debug-button'}>
                        <Typography>Debug: </Typography>
                        <Switch
                            label="Toggle debug mode"
                            selected={debug}
                            onChange={() => setDebug((x) => !x)}
                            visibleLabels={false}
                        />
                        {/* <Button>Get JSON</Button>
                        <Button>Get HTML</Button> */}
                    </Flex>
                )}
            </Flex>

            <Dialog
                onClose={() => setIsVisibleLinkDialog(false)}
                title="Insert link"
                isOpen={isVisibleLinkDialog}
            >
                <DialogBody>
                    <Stack spacing={2}>
                        <TextInput
                            label="Link URL"
                            placeholder="Write or paste the url here"
                            name="url"
                            onChange={(e) => setLinkInput(e.target.value)}
                            value={linkInput}
                            aria-label="URL"
                        />
                        <Select
                            id="linkTargetSelect"
                            label="Link target"
                            required
                            placeholder="Select link target"
                            value={linkTargetInput}
                            onChange={setLinkTargetInput}
                        >
                            <Option value={'_self'}>Self</Option>
                            <Option value={'_blank'}>Blank</Option>
                            <Option value={'_parent'}>Parent</Option>
                            <Option value={'_top'}>Top</Option>
                        </Select>
                    </Stack>
                </DialogBody>
                <DialogFooter
                    startAction={
                        <Button
                            onClick={() => {
                                setLinkInput('')
                                setLinkTargetInput('')
                                setIsVisibleLinkDialog(false)
                            }}
                            variant="tertiary"
                        >
                            Cancel
                        </Button>
                    }
                    endAction={
                        <Button onClick={() => onInsertLink()} variant="success-light">
                            Insert link
                        </Button>
                    }
                />
            </Dialog>
        </Box>
    )
}

export default MenuBar
