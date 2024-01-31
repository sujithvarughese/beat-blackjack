import classes from "./styles/Hands.module.css";
import {useGameContext} from "../context/game/GameContext.jsx";
import {useEffect} from "react";
import { Box, HStack, Image, VStack } from '@chakra-ui/react'

const Player = () => {

    const { playerHand, doubledHand, splitHand, splitHands, splitCount } = useGameContext()

    useEffect(() => {

    }, [splitCount])


    return (
        <VStack>

          {
            splitHand ?
              <HStack>
                {
                  splitHands.map((hand, index) => {
                    return (
                      <VStack key={index}>
                        {
                          hand.map((card, index) =>
                            (doubledHand && index === 2)
                              ?
                              <Image key={index} className={classes.cardDoubleDown} src={card.img} alt={card.value} />
                              :
                              <Image key={index} className={classes.card} src={card.img} alt={card.value} />
                          )
                        }
                      </VStack>
                    )
                  })
                }
              </HStack>
              :
              <HStack gap="2px" flexWrap="wrap">
                {
                  playerHand.map((card, index) =>
                    (doubledHand && index === 2)
                      ?
                      <Image key={index} className={classes.cardDoubleDown} src={card.img} alt={card.value} />
                      :
                      <Image key={index} className={classes.card} src={card.img} alt={card.value} />
                  )
                }
              </HStack>
          }

          <Box className={classes.score}>
            {playerHand.length !== 0 && playerHand.reduce((acc, card) => acc + card.value, 0)}
          </Box>

        </VStack>
    );
};

export default Player;