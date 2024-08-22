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
import { PiSquareHalf, PiSquareHalfBottom,PiRectangle  } from 'react-icons/pi'
import { Fragment } from 'react/jsx-runtime'
const MenuBarTable = ({ editor }) => {
    return (
        <Fragment key="tableMenubar">
            <IconButtonGroup className="button-group">
                <IconButton
                    label="Toggle Header Column"
                    className={['large-icon']}
                    icon={<PiSquareHalf />}
                    onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
                    disabled={!editor.can().toggleHeaderColumn()}
                />
                <IconButton
                    label="Toggle Header Row"
                    className={['large-icon']}
                    icon={<PiSquareHalfBottom />}
                    onClick={() => editor.chain().focus().toggleHeaderRow().run()}
                    disabled={!editor.can().toggleHeaderRow()}
                />
                <IconButton
                    label="Toggle Header Cell"
                    className={['large-icon']}
                    icon={<PiRectangle />}
                    onClick={() => editor.chain().focus().toggleHeaderCell().run()}
                    disabled={!editor.can().toggleHeaderCell()}
                />
            </IconButtonGroup>
            <IconButtonGroup className="button-group">
                <IconButton
                    icon={<AiOutlineInsertRowLeft />}
                    className={['large-icon']}
                    label="Add column before"
                    onClick={() => editor.chain().focus().addColumnBefore().run()}
                    disabled={!editor.can().addColumnBefore()}
                />
                <IconButton
                    icon={<AiOutlineInsertRowRight />}
                    className={['large-icon']}
                    label="Add column after"
                    onClick={() => editor.chain().focus().addColumnAfter().run()}
                    disabled={!editor.can().addColumnAfter()}
                />
                <IconButton
                    icon={<AiOutlineDeleteColumn />}
                    className={['large-icon']}
                    label="Delete column"
                    onClick={() => editor.chain().focus().deleteColumn().run()}
                    disabled={!editor.can().deleteColumn()}
                />
            </IconButtonGroup>
            <IconButtonGroup className="button-group">
                <IconButton
                    icon={<AiOutlineInsertRowAbove />}
                    className={['large-icon']}
                    label="Add row before"
                    onClick={() => editor.chain().focus().addRowBefore().run()}
                    disabled={!editor.can().addRowBefore()}
                />
                <IconButton
                    icon={<AiOutlineInsertRowBelow />}
                    className={['large-icon']}
                    label="Add row after"
                    onClick={() => editor.chain().focus().addRowAfter().run()}
                    disabled={!editor.can().addRowAfter()}
                />
                <IconButton
                    icon={<AiOutlineDeleteRow />}
                    className={['large-icon']}
                    label="Delete row"
                    onClick={() => editor.chain().focus().deleteRow().run()}
                    disabled={!editor.can().deleteRow()}
                />
            </IconButtonGroup>

            <IconButtonGroup className="button-group">
                <IconButton
                    icon={<AiOutlineMergeCells />}
                    className={['large-icon']}
                    label="Merge cells"
                    onClick={() => editor.chain().focus().mergeCells().run()}
                />
                <IconButton
                    icon={<AiOutlineSplitCells />}
                    className={['large-icon']}
                    label="Split cells"
                    onClick={() => editor.chain().focus().splitCell().run()}
                />
            </IconButtonGroup>

            <IconButtonGroup className="button-group">
                <IconButton
                    icon={<AiOutlineDelete />}
                    className={['large-icon']}
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
