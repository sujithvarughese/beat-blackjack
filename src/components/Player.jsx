import classes from "./styles/Hands.module.css";
import {useGameContext} from "../context/game/GameContext.jsx";
import {useEffect} from "react";
import { Box, Container, Heading, HStack, Image, Text, useToast, VStack } from '@chakra-ui/react'
import { Score } from "./"
const Player = () => {

  const {
    playerHand,
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

  const checkPlayerBlackjacks = () => {
    let playerBlackjack
    // if player has blackjack
    if (playerHand.reduce((acc, card) => acc + card.value, 0) === 21) {
      playerBlackjack = true
    }
    // if both player's cards are aces, make the first value === 1
    if (playerHand[0].value === 11 && playerHand[1].value === 11) {
      playerHand[0].value = 1
    }
    const hint = getBookMove(playerHand, dealerFaceUpValue)
    setPlayerInitial({ playerBlackjack, playerHand, hint })
  }

  useEffect(() => {
    if (!dealerFaceUpValue) return
    checkPlayerBlackjacks()
  }, [dealerFaceUpValue])

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
  }, [playerHand, bookMove])

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
                          <Box position="absolute" bottom="5px" width="55px" textAlign="center">
                            <Score hand={playerHand}/>
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
                  <Box position="absolute" bottom="5px" width="55px" textAlign="center">
                    <Score hand={playerHand}/>
                  </Box>
              }

            </VStack>


        }



      </Box>
    );
};

export default Player;