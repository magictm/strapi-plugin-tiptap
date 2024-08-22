import { prefixFileUrlWithBackendUrl, useLibrary } from '@strapi/helper-plugin'
import React from 'react'

type MediaLibProps = {
    isOpen?: boolean
    onChange?: (files: any[]) => void
    onToggle?: () => void
}

const MediaLib: React.FC<MediaLibProps> = ({ isOpen, onChange, onToggle }) => {
    const { components } = useLibrary()
    const MediaLibraryDialog = components['media-library']

    const handleSelectAssets = (files: any[]) => {
        const formattedFiles = files.map((f) => ({
            alt: f.alternativeText || f.name,
            url: f.url,
            // url: prefixFileUrlWithBackendUrl(f.url),
            mime: f.mime,
        }))

        onChange?.(formattedFiles)
    }

    if (!isOpen) {
        return null
    }

    return <MediaLibraryDialog onClose={onToggle} onSelectAssets={handleSelectAssets} />
}

MediaLib.defaultProps = {
    isOpen: false,
    onChange: () => {},
    onToggle: () => {},
}

export default MediaLib
