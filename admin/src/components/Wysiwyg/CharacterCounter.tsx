import { Box, Flex, Typography } from '@strapi/design-system'

interface CharacterCounterProps {
    editor: any
    characterLimit: number
}

// Use the interface in the component

const CharacterCounter: React.FC<CharacterCounterProps> = ({ editor, characterLimit }) => {
    let percentage = Math.round((100 / characterLimit) * editor.storage.characterCount.characters())

    const characterLimitReached = editor.storage.characterCount.characters() === characterLimit

    return (
        <Box
            marginTop={2}
            className={['character-count', characterLimitReached ? 'character-count--warning' : '']}
        >
            <Flex>
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
                <Box>
                    {characterLimit > 0 && (
                        <>
                            <Typography>
                                {editor.storage.characterCount.characters()}/{characterLimit}{' '}
                                characters
                            </Typography>
                            <br />
                        </>
                    )}

                    <Typography>{editor.storage.characterCount.words()} words</Typography>
                </Box>
            </Flex>
        </Box>
    )
}

export default CharacterCounter
