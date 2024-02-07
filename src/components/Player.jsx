import classes from "./styles/Hands.module.css";
import {useGameContext} from "../context/game/GameContext.jsx";
import {useEffect} from "react";
import { Box, Container, Heading, HStack, Image, Text, useToast, VStack } from '@chakra-ui/react'
import { PlayerHand, Score } from './'
import playerHand from './PlayerHand.jsx'
const Player = () => {

  const {
    playerHands,
    feedback,
    doubledHands,
    currentHandIndex,
    playerTurn,
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

  useEffect(() => {
    if (!bookMove || settings.feedback === false) return
    toast.closeAll()
    toast(feedback)
  }, [feedback])



  return (
    <HStack
      justifyContent="space-around"
      width="100%"
    >
      {
        playerHands?.map((playerHand, index) =>
          <PlayerHand
            key={Math.random()}
            playerHand={playerHand}
            doubledHand={doubledHands[index]}
            isCurrentHand={index === currentHandIndex}
            playerTurn={playerTurn}
          />)
      }
    </HStack>
  );
};

export default Player;