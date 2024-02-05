import classes from "./styles/Hands.module.css";
import {useGameContext} from "../context/game/GameContext.jsx";
import {useEffect} from "react";
import { Box, Container, Heading, HStack, Image, Text, useToast, VStack } from '@chakra-ui/react'
import { Score } from "./"
const Player = () => {

  const {
    currentPlayerHand,
    dealerFaceUpValue,
    setPlayerInitial,

    doubledHand,
    splitHand,
    splitHands,
    splitCount,
    playNextSplitHand,
    actionTaken,
    bookMove,
    settings,
    getBookMove
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
    if (!bookMove || settings.feedback === false) return
    toast.closeAll()
    toast(options)
  }, [currentPlayerHand, bookMove])

  useEffect(() => {
    if (!splitHand) return
    console.log("12")
    playNextSplitHand()
  }, [splitCount])

    return (
      <Box>
        {
          splitHand ?
            <HStack
              width="100%"
              justifyContent="space-around"
            >
              {
                splitHands.map((currentPlayerHand, index) => {
                  return (
                    <VStack key={index}>
                      <VStack
                          flexDirection="column-reverse"
                      >
                        {
                          currentPlayerHand.map((card, index) =>
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
                      {currentPlayerHand.length !== 0 &&
                          <Box position="absolute" bottom="5px" width="55px" textAlign="center">
                            <Score hand={currentPlayerHand}/>
                          </Box>
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
                currentPlayerHand.map((card, index) =>
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
              {currentPlayerHand.length !== 0 &&
                  <Box position="absolute" bottom="5px" width="55px" textAlign="center">
                    <Score hand={currentPlayerHand}/>
                  </Box>
              }

            </VStack>


        }



      </Box>
    );
};

export default Player;