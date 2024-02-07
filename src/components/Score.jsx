import { Heading } from '@chakra-ui/react'


const Score = ({ hand }) => {

    const score = hand.reduce((acc, card) => acc + card.value, 0)
    let text = score

    if (score === 21 && hand.length === 2) {
        text = "Blackjack"
    }
    if (score > 21) {
        text = "BUST"
    }

    return (
        <Heading
            backgroundColor="rgba(0, 0, 0, 0.8)"
            color="#ECC94B"
            border="#ECC94B solid 2px"
            borderRadius="8px"
            padding="7px"
            zIndex="10"
            minWidth="70px"

        >
            {text}
        </Heading>
    )
}

export default Score