import styled from 'styled-components'
import { Box } from '@strapi/design-system'

// ${({ theme }) => {
//     // Debug
//     // console.log(theme)
// }}
export default styled(Box)`
    .editor-content-wrapper {
        border-width: 1px;
        border-color: ${({ theme }) => theme.colors.neutral200};
        border-style: solid;
        border-bottom-right-radius: ${({ theme }) => theme.spaces[1]};
        border-bottom-left-radius: ${({ theme }) => theme.spaces[1]};
    }

    .character-count {
        color: ${({ theme }) => theme.colors.primary500};

        &--warning {
            color: ${({ theme }) => theme.colors.danger500};
        }

        &__background-cirle {
            color: ${({ theme }) => theme.colors.neutral200};
        }
    }

    .menubar {
        border-width: 1px;
        border-bottom: 0;
        border-top-right-radius: ${({ theme }) => theme.spaces[1]};
        border-top-left-radius: ${({ theme }) => theme.spaces[1]};

        svg {
            color: currentColor;
        }
        .is-active {
            background: ${({ theme }) => theme.colors.primary200};
            color: ${({ theme }) => theme.colors.neutral0};
        }
        .button-group {
            border: 0.25em solid ${({ theme }) => theme.colors.neutral100};
        }
        &.floating {
            border: 1px solid ${({ theme }) => theme.colors.neutral200};
            background: ${({ theme }) => theme.colors.neutral100};
            box-shadow:
                rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
                rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
        }

        button {
            &.medium-icon {
                padding: 7px;
                svg {
                    height: 100%;
                    width: 100%;
                }
            }
            &.large-icon {
                padding: 6px;
                svg {
                    height: 100%;
                    width: 100%;
                }
            }
        }

        .debug-button {
            > span {
                margin-right: 0.5rem;
            }
        }
    }

    .debug-wrapper {
        position: relative;
        .tab-wrapper {
        }
        .json-preview,
        .html-preview {
            pre {
                code {
                    position: relative;
                    font-family: monospace;
                    font-size: 1rem;
                    display: block;
                    background: none;
                    white-space: pre;
                    -webkit-overflow-scrolling: touch;
                    overflow-x: scroll;
                    overflow-y: scroll;
                    max-width: 100%;
                    min-width: 100px;
                    padding: 0;
                }
            }
        }
    }

    .ProseMirror {
        outline: none;
        line-height: 1.25rem;
        color: ${({ theme }) => theme.colors.neutral800};
        min-height: 80px;

        > :first-child {
            margin-top: 0 !important;
        }

        > * + * {
            margin-top: 0.75em;
        }
        .ProseMirror-selectednode {
            border: 5px solid ${({ theme }) => theme.colors.neutral800};
            box-sizing: border-box;
        }
        a {
            color: ${({ theme }) => theme.colors.primary500};
            text-decoration: underline;
            font-weight: 500;
            strong {
                color: 'inherit';
            }
        }
        strong {
            font-weight: bold;
        }
        em {
            font-style: italic;
        }
        ul,
        ol {
            margin-left: 1rem;
            padding: 0 1rem;
            li {
                margin-bottom: 0.5rem;
                &:last-child {
                    margin-bottom: 0rem;
                }
            }
        }
        ul {
            li {
                list-style: disc;
            }
        }
        ol {
            li {
                list-style: decimal;
            }
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            line-height: 1.1;
            margin-top: 2.5rem;
            text-wrap: pretty;
            font-weight: bold;
        }
        h1,
        h2 {
            margin-top: 3.5rem;
            margin-bottom: 1.5rem;
        }
        h1 {
            font-size: 1.4rem;
        }
        h2 {
            font-size: 1.2rem;
        }
        h3 {
            font-size: 1.1rem;
        }
        h4,
        h5,
        h6 {
            font-size: 1rem;
        }

        code {
            padding: 0.2em 0.4em;
            margin: 0;
            font-size: 0.85rem;
            white-space: break-spaces;
            border-radius: 0.4rem;
            background-color: ${({ theme }) => theme.colors.primary200};
            box-decoration-break: clone;
        }
        pre {
            background: ${({ theme }) => theme.colors.neutral100};
            color: ${({ theme }) => theme.colors.neutral1000};
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
            font-family:
                'JetBrainsMono',
                ui-monospace,
                SFMono-Regular,
                SF Mono,
                Menlo,
                Consolas,
                Liberation Mono,
                monospace;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            code {
                color: inherit;
                padding: 0;
                background: none;
                font-size: 0.8rem;
            }
        }

        img {
            max-width: 100%;
            height: auto;
            display: block;
        }
        blockquote {
            border-left: 5px solid ${({ theme }) => theme.colors.neutral200};
            font-style: italic;
            margin-left: 0;
            margin-right: 0;
            overflow: hidden;
            padding-left: 1em;
            padding-right: 1.5em;
        }
        hr {
            border: none;
            border-top: 2px solid ${({ theme }) => theme.colors.neutral200};
            margin: 2rem 0;
        }
        table {
            border-collapse: collapse;
            margin: 0;
            overflow: hidden;
            table-layout: fixed;
            width: 100%;
            border: 1px solid ${({ theme }) => theme.colors.neutral600};
            th,
            td {
                box-sizing: border-box;
                min-width: 1em;
                position: relative;
                vertical-align: top;
                border: 1px solid ${({ theme }) => theme.colors.neutral600};
                padding: ${({ theme }) => theme.spaces[2]};
                &.selectedCell {
                    background: ${({ theme }) => theme.colors.primary500};
                }
                > * {
                    margin-bottom: 0;
                }
            }
            th {
                background: ${({ theme }) => theme.colors.neutral300};
                vertical-align: middle;
                font-weight: bold;
                text-align: left;
            }

            .selectedCell:after {
                background: ${({ theme }) => theme.colors.neutral200};
                content: '';
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                pointer-events: none;
                position: absolute;
                z-index: 2;
            }
            .column-resize-handle {
                background: ${({ theme }) => theme.colors.primary500};
                bottom: -2px;
                pointer-events: none;
                position: absolute;
                right: -2px;
                top: 0;
                width: 4px;
            }
        }

        .tableWrapper {
            margin: 1.5rem 0;
            overflow-x: auto;
        }

        &.resize-cursor {
            cursor: ew-resize;
            cursor: col-resize;
        }

        /* Placeholder (at the top) */
        p.is-editor-empty:first-child::before,
        h1.is-empty:first-child::before {
            color: ${({ theme }) => theme.colors.neutral500};
            content: attr(data-placeholder);
            float: left;
            height: 0;
            pointer-events: none;
        }

        /* Placeholder (on every new line) */
        /*.ProseMirror p.is-empty::before {
        color: ${({ theme }) => theme.colors.neutral500};
        content: attr(data-placeholder);
        float: left;
        height: 0;
        pointer-events: none;
        }*/

        .color {
            white-space: nowrap;

            &::before {
                background-color: var(--color);
                border: 1px solid ${({ theme }) => theme.colors.neutral300};
                border-radius: 4px;
                content: ' ';
                display: inline-block;
                height: 1em;
                margin-bottom: 0.15em;
                margin-right: 0.1em;
                vertical-align: middle;
                width: 1em;
            }
        }
    }
`
