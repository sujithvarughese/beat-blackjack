import {useGameContext} from "../context/game/GameContext.jsx";
import { Alert, AlertTitle, Text } from '@chakra-ui/react'
import { convertToUSD }from "../utils/calculations.js"
const Results = () => {

    const { netCredit, netDebit, playerBlackjack, dealerBlackjack } = useGameContext()

    console.log(netCredit)
    console.log(netDebit)

    let heading = ""
    let description = ""
    if (netCredit > netDebit) {
        heading = "You Win"
    } else if (netCredit < netDebit) {
        heading = "Dealer Win"
    } else {
        heading = "Push"
    }
    if (playerBlackjack) {
        heading = "Blackjack!"
    }
    if (dealerBlackjack) {
        heading = "Dealer blackjack"
    }

    return (
        <Alert
          variant='subtle'
          flexDirection="column"
          alignItems='center'
          gap="8px"
          justifyContent='center'
          textAlign='center'
          maxWidth="400px"
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
            <Text fontSize="20px" textAlign="center">Net Gain: {convertToUSD(netCredit)}</Text>



        </Alert>
    );
};

export default Results;