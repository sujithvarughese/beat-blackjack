import classes from "./styles/Hands.module.css";
import {useGameContext} from "../context/game/GameContext.jsx";
import cardBackIMG from "../assets/images/backs/astronaut.svg";
import {useEffect} from "react";
import { Box, Container, HStack, Image, SimpleGrid, VStack } from '@chakra-ui/react'
import { Score } from './index.js'

//const getValue = (hand) => hand.reduce((acc, card) => acc + card.value, 0)
//const hasBlackjack = (hand) => hand.length === 2 && getValue(hand) === 21
const Dealer = () => {

  const {
    dealerTurn,
    dealerHand,
    dealerCardShown,
    dealerHit,
    getResults,
    settings
  }
    = useGameContext()


  useEffect(() => {
    const score = dealerHand.reduce((acc, card) => acc + card.value, 0)
    let aceValue11Index = dealerHand.findIndex(card => card.rank === "Ace" && card.value === 11)
    if (aceValue11Index !== -1) {
      aceValue11Index = true
    }
    if (dealerTurn) {
      if (score < 17 ||
        (score === 17 && aceValue11Index === true && settings.dealerHitSoft17 === true)) {
        dealerHit()
    } else {
        getResults()
      }
    }
  }, [dealerCardShown, dealerHand]);

    return (
      <VStack>
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

        { dealerCardShown === true && dealerHand.length !== 0 &&
          <Box zIndex="100" position="absolute" top="75px" textAlign="center">
            <Score hand={dealerHand} />
          </Box>
        }
      </VStack>
    );
};

export default Dealer;