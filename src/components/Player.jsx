import classes from "./styles/Hands.module.css";
import {useGameContext} from "../context/game/GameContext.jsx";
import {useEffect} from "react";
import { Box, Container, Heading, HStack, Image, Text, useToast, VStack } from '@chakra-ui/react'
import { Score } from "./"
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
    if (!bookMove) return
    toast.closeAll()
    toast(options)
  }, [playerHand, bookMove])

  useEffect(() => {
    if (!splitHand) return
    playNextSplitHand()
  }, [splitCount])

    return (
      <Box>
        {
          splitHand ?
            <HStack
              width="100%"
              justifyContent="center"
              gap="250px"
            >
              {
                splitHands.map((playerHand, index) => {
                  return (
                    <VStack key={index}>
                      <VStack
                          flexDirection="column-reverse"
                      >
                        {
                            playerHand.map((card, index) =>
                                (doubledHand && index === 2)
                              ?
                              <Image key={index}
                                     className={classes.cardDoubleDown}
                                     src={card.img}
                                     alt={card.value}
                                     position="absolute"
                                     bottom="85px"
                              />
                              :
                              <Image
                                key={index}
                                className={classes.card}
                                src={card.img}
                                alt={card.value}
                                position="absolute"
                                bottom={`calc(30px * ${index})`}
                                sx={{ transform: `translate(calc(20px * ${index}))` }}
                              />
                          )
                        }
                      </VStack>
                      {playerHand.length !== 0 &&
                          <Score playerHand={playerHand}/>
                      }
                    </VStack>
                  )
                })
              }
            </HStack>
            :
            <VStack>
                <VStack>
                    {
                        playerHand.map((card, index) =>
                            (doubledHand && index === 2)
                                ?
                                <Image
                                    key={index}
                                    className={classes.cardDoubleDown}
                                    src={card.img}
                                    alt={card.value}
                                    position="absolute"
                                    bottom="85px"
                                />
                                :
                                <Image
                                    key={index}
                                    className={classes.card}
                                    src={card.img}
                                    alt={card.value}

                                    position="absolute"
                                    bottom={`calc(20px * ${index})`}
                                    sx={{ transform: `translate(calc(30px * ${index}))` }}
                                />


                        )
                    }

                </VStack>
              {playerHand.length !== 0 &&
                  <Score playerHand={playerHand} zIndex="10"/>
              }

            </VStack>


        }



      </Box>
    );
};

export default Player;