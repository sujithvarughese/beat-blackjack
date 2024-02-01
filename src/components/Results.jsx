import {useGameContext} from "../context/game/GameContext.jsx";
import { Alert, AlertTitle, Box } from '@chakra-ui/react'
const Results = () => {

    const { winner, playerBlackjack, dealerBlackjack } = useGameContext()

    let text
    let type
    if (winner === 1) {
        text = "You Win"
    } else if (winner === -1) {
        text = "You Lose"
    } else {
        text = "Push"
    }
    if (playerBlackjack) {
        text = "Congratulations, you have blackjack!"
    }
    if (dealerBlackjack) {
        text = "Sorry, dealer has blackjack"
    }

    return (
        <Alert
          variant='subtle'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          height={{base: "50px", lg: "100px"}}
          width={{base: "90%", lg: "50%"}}
          position="absolute"
          top="12%"
          left="0"
          right="0"
          margin="auto"
          zIndex="10"
          backgroundColor="black"
          border="solid 3px #ECC94B"
          padding="12px"
          borderRadius="10px"
          opacity="75%"
        >
            <Box>
                <AlertTitle
                    color="white"
                    fontSize="32px"
                    lineHeight="1.5"
                >{text}
                </AlertTitle>
            </Box>


        </Alert>
    );
};

export default Results;