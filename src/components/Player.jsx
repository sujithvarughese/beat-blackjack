import classes from "./styles/Hands.module.css";
import {useGameContext} from "../context/game/GameContext.jsx";
import {useEffect} from "react";
import { Box, HStack, Image, useToast, VStack } from '@chakra-ui/react'

const Player = () => {

  const {
    playerHand,
    doubledHand,
    splitHand,
    splitHands,
    splitCount,
    playNextSplitHand,
    actionTaken,
    bookMove
  } = useGameContext()

  const toast = useToast()

  const options = actionTaken === bookMove ?
    {
      title: "Good Move!",
      position: "top",
      status: "success",
      duration: 1000

    }
    :
    {
      title: `The correct play was to ${bookMove}.`,
      position: "top",
      status: "warning",
      duration: 1000
    }


  useEffect(() => {
    if (!playerHand.length) return
    toast.closeAll()
    toast(options)
  }, [playerHand])

  useEffect(() => {
    if (!splitHand) return
    playNextSplitHand()
  }, [splitCount])

    return (
      <VStack>
        {
          splitHand ?
            <HStack
              width="100%"
              justifyContent="space-evenly"
            >
              {
                splitHands.map((hand, index) => {
                  return (
                    <VStack
                      key={index}
                      flexDirection="column-reverse"
                    >
                      {
                        hand.map((card, index) =>
                          (doubledHand && index === 2)
                            ?
                            <Image key={index}
                                   className={classes.cardDoubleDown}
                                   src={card.img}
                                   alt={card.value}
                            />
                            :
                            <Image
                              key={index}
                              className={classes.card}
                              src={card.img}
                              alt={card.value}
                              position="absolute"
                              top={`calc(-50px * ${index})`}

                            />
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