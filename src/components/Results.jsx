import {useGameContext} from "../context/game/GameContext.jsx";
import { Alert, AlertTitle, Text } from '@chakra-ui/react'
import { convertToUSD }from "../utils/calculations.js"
const Results = () => {

    const { handWinLossAmount, playerBlackjack, dealerBlackjack } = useGameContext()

    let heading = ""
    let description = ""
    if (handWinLossAmount > 0) {
        heading = "You Win"
    } else if (handWinLossAmount > 0) {
        heading = "You Lose"
    } else {
        heading = "Push"
    }
    if (playerBlackjack) {
        heading = "Congratulations, you have blackjack!"
    }
    if (dealerBlackjack) {
        heading = "Dealer has blackjack"
    }

    return (
        <Alert
          variant='subtle'
          flexDirection="column"
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          maxWidth={{base: "90%", lg: "50%"}}
          position="absolute"
          placeSelf="center"
          placeItems="center"
          margin="auto"
          zIndex="10"
          backgroundColor="black"
          border="solid 3px #ECC94B"
          padding="12px"
          borderRadius="10px"
          opacity="75%"
          color="white"
        >

            <AlertTitle fontSize="32px" textAlign="center">{heading}</AlertTitle>
            <Text fontSize="20px" textAlign="center">Net Gain: {convertToUSD(handWinLossAmount)}</Text>



        </Alert>
    );
};

export default Results;