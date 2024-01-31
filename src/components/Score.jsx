import { Heading } from '@chakra-ui/react'


const Score = ({ playerHand }) => {

    return (
        <Heading
            zIndex="100"
            backgroundColor="black"
            color="#ECC94B"
            border="#ECC94B solid 2px"
            borderRadius="8px"
            padding="4px"
        >
            {playerHand.reduce((acc, card) => acc + card.value, 0)}
        </Heading>
    )
}

export default Score