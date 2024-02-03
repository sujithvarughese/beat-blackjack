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
    setDealerInitial,
    dealerCardShown,
    dealerHit,
    determineWinner
  }
    = useGameContext()

  const checkDealerBlackjacks = () => {
    // if dealer has blackjack or 21 with Ace under (action goes differently for each)
    let dealerBlackjack, dealer21, dealerFaceUpValue
    if (dealerHand[0].value === 11 && dealerHand[1] === 10) {
      dealerBlackjack = true
    } else if (dealerHand[0].value === 10 && dealerHand[1] === 11){
      dealer21 = true
    }
    // dealer's face up card to see if insurance or even money should be offered
    dealerFaceUpValue = dealerHand[0].value
    setDealerInitial({ dealerBlackjack, dealer21, dealerFaceUpValue })
  }

  // if dealer hand length is not 2, then return
  // set Dealer blackjack, dealer 21(21 with Ace as hidden card) and dealer's face up value
  useEffect(() => {
    if (dealerHand.length !== 2) return
    checkDealerBlackjacks()
  }, [dealerHand])

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

    return (
      <SimpleGrid>
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
          <Box zIndex="100" position="absolute" left="0" right="0" width="55px" top="75px" textAlign="center" margin="auto">
            <Score hand={dealerHand} />
          </Box>
        }
      </SimpleGrid>
    );
};

export default Dealer;