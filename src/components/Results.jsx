import {useGameContext} from "../context/game/GameContext.jsx";
import { Alert, AlertTitle, Text } from '@chakra-ui/react'
import { convertToUSD }from "../utils/calculations.js"
import { useEffect } from 'react'
const Results = () => {

    const { netCredit, netDebit, playerBlackjack, dealerBlackjack, hideResults } = useGameContext()

    let heading = ""
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

    // show results for 2 seconds, then hide and clean up useEffect
    useEffect(() => {
        const timerID = setTimeout(() => {
            hideResults()
        }, 2000)
        return () => clearTimeout(timerID)
    }, [])

    return (
        <Alert
          variant='subtle'
          flexDirection="column"
          alignItems='center'
          gap="8px"
          justifyContent="center"
          textAlign='center'
          maxWidth="400px"
          maxHeight="100px"
          position="absolute"
          left="0"
          right="0"
          top="0"
          bottom="0"
          margin="auto"
          zIndex="10"
          backgroundColor="rgba(0, 0, 0, 0.8)"
          border="solid 3px #ECC94B"
          padding="12px"
          borderRadius="10px"
          color="white"
        >

            <AlertTitle fontSize="32px" textAlign="center">{heading}</AlertTitle>
            <Text fontSize="20px" textAlign="center">Net Gain: {convertToUSD(netCredit - netDebit)}</Text>



        </Alert>
    );
};

export default Results;