import { IconButton, IconButtonGroup } from '@strapi/design-system'
import {
    AiOutlineTable,
    AiOutlineInsertRowBelow,
    AiOutlineInsertRowAbove,
    AiOutlineInsertRowRight,
    AiOutlineInsertRowLeft,
    AiOutlineDeleteColumn,
    AiOutlineDeleteRow,
    AiOutlineDelete,
    AiOutlineMergeCells,
    AiOutlineSplitCells,
} from 'react-icons/ai'
import { Fragment } from 'react/jsx-runtime'

const MenuBarTable = ({ editor }) => {
    return (
        <Fragment key="tableMenubar">
            <IconButtonGroup className="button-group">
                <IconButton
                    icon={<AiOutlineInsertRowLeft />}
                    label="Add column before"
                    onClick={() => editor.chain().focus().addColumnBefore().run()}
                    disabled={!editor.can().addColumnBefore()}
                />
                <IconButton
                    icon={<AiOutlineInsertRowRight />}
                    label="Add column after"
                    onClick={() => editor.chain().focus().addColumnAfter().run()}
                    disabled={!editor.can().addColumnAfter()}
                />
                <IconButton
                    icon={<AiOutlineDeleteColumn />}
                    label="Delete column"
                    onClick={() => editor.chain().focus().deleteColumn().run()}
                    disabled={!editor.can().deleteColumn()}
                />
            </IconButtonGroup>
            <IconButtonGroup className="button-group">
                <IconButton
                    icon={<AiOutlineInsertRowAbove />}
                    label="Add row before"
                    onClick={() => editor.chain().focus().addRowBefore().run()}
                    disabled={!editor.can().addRowBefore()}
                />
                <IconButton
                    icon={<AiOutlineInsertRowBelow />}
                    label="Add row after"
                    onClick={() => editor.chain().focus().addRowAfter().run()}
                    disabled={!editor.can().addRowAfter()}
                />
                <IconButton
                    icon={<AiOutlineDeleteRow />}
                    label="Delete row"
                    onClick={() => editor.chain().focus().deleteRow().run()}
                    disabled={!editor.can().deleteRow()}
                />
            </IconButtonGroup>

            <IconButtonGroup className="button-group">
                <IconButton
                    icon={<AiOutlineMergeCells />}
                    label="Merge cells"
                    onClick={() => editor.chain().focus().mergeCells().run()}
                />
                <IconButton
                    icon={<AiOutlineSplitCells />}
                    label="Split cells"
                    onClick={() => editor.chain().focus().splitCell().run()}
                />
            </IconButtonGroup>

            <IconButtonGroup className="button-group">
                <IconButton
                    icon={<AiOutlineDelete />}
                    label="Delete table"
                    disabled={!editor.can().deleteTable()}
                    onClick={() => {
                        if (window.confirm('Are you sure you want to delete the table?')) {
                            editor.chain().focus().deleteTable().run()
                        }
                    }}
                />
            </IconButtonGroup>
        </Fragment>
    )
}

export default MenuBarTable
