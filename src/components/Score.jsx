import { Heading } from '@chakra-ui/react'


const Score = ({ hand }) => {

    const score = hand.reduce((acc, card) => acc + card.value, 0)
    let text = score

    if (score === 21 && hand.length === 2) {
        text = "blackjack"
    }
    if (score > 21) {
        text = "BUST"
    }

    return (
        <Heading
            backgroundColor="black"
            color="#ECC94B"
            border="#ECC94B solid 2px"
            borderRadius="8px"
            padding="2px"
            zIndex="10"
        >
            {text}
        </Heading>
    )
}

export default Score