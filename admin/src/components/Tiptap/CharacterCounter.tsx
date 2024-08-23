import { Box, Flex, Typography } from '@strapi/design-system'
import React from 'react'

interface CharacterCounterProps {
    editor: any
    characterLimit: number
}

const CharacterCounter: React.FC<CharacterCounterProps> = ({ editor, characterLimit }) => {
    let percentage = Math.round((100 / characterLimit) * editor.storage.characterCount.characters())

    const characterLimitReached = editor.storage.characterCount.characters() === characterLimit

    return (
        <Box
            marginTop={2}
            className={['character-count', characterLimitReached ? 'character-count--warning' : '']}
        >
            <Flex justifyContent="flex-end">
                <div
                    className={`character-count ${editor.storage.characterCount.characters() === characterLimit ? 'character-count--warning' : ''}`}
                >
                    <Flex alignItems="start">
                        {characterLimit > 0 && (
                            <Box marginRight={2}>
                                <svg
                                    height="20"
                                    width="20"
                                    viewBox="0 0 20 20"
                                    className="character-count__graph"
                                >
                                    <circle
                                        className="character-count__background-cirle"
                                        r="10"
                                        cx="10"
                                        cy="10"
                                        fill="currentColor"
                                    />
                                    <circle
                                        r="5"
                                        cx="10"
                                        cy="10"
                                        fill="transparent"
                                        stroke="currentColor"
                                        strokeWidth="10"
                                        strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
                                        transform="rotate(-90) translate(-20)"
                                    />
                                    <circle r="6" cx="10" cy="10" fill="white" />
                                </svg>
                            </Box>
                        )}
                        <Flex>
                            <Typography>
                                {editor.storage.characterCount.characters()}{' '}
                                {characterLimit > 0 && { characterLimit }}
                                characters
                            </Typography>
                            <Box marginLeft={2}>
                                <Typography>
                                    {editor.storage.characterCount.words()} words
                                </Typography>
                            </Box>
                        </Flex>
                    </Flex>
                </div>
            </Flex>
        </Box>
    )
}

export default CharacterCounter
