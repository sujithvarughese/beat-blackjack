import classes from "./styles/Hands.module.css";
import {useGameContext} from "../context/game/GameContext.jsx";
import cardBackIMG from "../assets/images/backs/astronaut.svg";
import {useEffect} from "react";
import { Box, Container, HStack, Image, VStack } from '@chakra-ui/react'
import { Score } from './index.js'

//const getValue = (hand) => hand.reduce((acc, card) => acc + card.value, 0)
//const hasBlackjack = (hand) => hand.length === 2 && getValue(hand) === 21
const Dealer = () => {

  const { dealerTurn, dealerHand, dealerCardShown, dealerHit, determineWinner } = useGameContext()

  useEffect(() => {
    const score = dealerHand.reduce((acc, card) => acc + card.value, 0)
    if (dealerTurn) {
      if (score < 17) {
        dealerHit()
    } else {
        determineWinner()
      }
    }
  }, [dealerCardShown, dealerHand]);
  console.log(dealerHand)

    return (
      <Container>
        { dealerCardShown === true && dealerHand.length !== 0 &&
          <Box zIndex="100" position="absolute" top="-50%" left="0" right="0" width="46px" margin="auto">
            <Score hand={dealerHand} />
          </Box>
        }

        <HStack position="relative" justifyContent="center" width="100%" sx={{ transform: `translate(70px)` }}>
          {
            dealerHand.map((card, index) =>
              (index === 1 && !dealerCardShown)
                ?
                <Image
                    key={index}
                    className={classes.card}
                    src={cardBackIMG} alt="card-back"
                    sx={{ transform: `translate(-70px)` }}
                    zIndex="-10"


                />
                :
                <Image
                    key={index}
                    className={classes.card}
                    src={card.img}
                    alt={card.value}
                    sx={{ transform: `translate(calc(-70px * ${index}))` }}
                />
            )
          }
        </HStack>
      </Container>
    );
};

export default Dealer;