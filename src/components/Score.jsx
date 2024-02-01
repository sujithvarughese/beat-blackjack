import { Heading } from '@chakra-ui/react'


const Score = ({ hand }) => {

    return (
        <Heading
            backgroundColor="black"
            color="#ECC94B"
            border="#ECC94B solid 2px"
            borderRadius="8px"
            padding="2px"
            zIndex="10"

        >
            {hand.reduce((acc, card) => acc + card.value, 0)}
        </Heading>
    )
}

export default Score