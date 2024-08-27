import { Flex } from '@strapi/design-system'
import styled from 'styled-components'

const IconBox = styled(Flex)`
    /* Hard code color values */
    /* to stay consistent between themes */
    background-color: #f0f0ff; /* primary100 */
    border: 1px solid #d9d8ff; /* primary200 */

    svg > path {
        fill: #4945ff; /* primary600 */
    }
`

export const PluginIcon = () => {
    return (
        <IconBox
            justifyContent="center"
            alignItems="center"
            width={7}
            height={6}
            hasRadius
            aria-hidden
        >
            <MyIcon />
        </IconBox>
    )
}

const MyIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        id="recktangle_logo"
        data-name="recktangle logo"
        viewBox="0 0 675.91 495.67"
        {...props}
    >
        <defs>
            <style>{'.cls-1{fill:#010101;stroke-width:0}'}</style>
        </defs>
        <path
            d="M189.42 178.76h38.9v-38.9h63.25l-50.02 233.38h-52.12v38.9h155.59v-38.9h-43.8l50.02-233.38h71.57v38.9h38.9v-77.79H189.42v77.79Z"
            className="cls-1"
        />
        <path
            d="M462.3 265.61v146.53h-19.54V265.61h-58.61v-19.54h136.76v19.54H462.3Z"
            className="cls-1"
        />
    </svg>
)
