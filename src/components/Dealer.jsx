import classes from "./styles/Hands.module.css";
import {useGameContext} from "../context/game/GameContext.jsx";
import cardBackIMG from "../assets/images/backs/astronaut.svg";
import {useEffect} from "react";
import { Box, HStack, Image, VStack } from '@chakra-ui/react'

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


    return (
        <VStack>
            <HStack position="relative" gap="2px">
                {
                    dealerHand.map((card, index) =>
                        (index === 1 && !dealerCardShown)
                            ?
                            <Image key={index} className={classes.card} src={cardBackIMG} alt="card-back"
                                   position="absolute"
                                   right="50px"
                                   zIndex="-10"
                            />
                            :
                            <Image key={index} className={classes.card} src={card.img} alt={card.value} />
                    )
                }
            </HStack>
            <Box className={classes.score}>
                {dealerCardShown && dealerHand.reduce((acc, card) => acc + card.value, 0)}
            </Box>
        </VStack>
    );
};

export default Dealer;