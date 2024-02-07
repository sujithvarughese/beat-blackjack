
import { Box, Button, Container, Heading, ModalBody, ModalContent, ModalHeader, Text, VStack } from '@chakra-ui/react'

const GameRules = ({ flipCard, isFlipped }) => {
  return (
    <ModalContent
      paddingTop={{ base: "12px", sm: "30px" }}
      marginX={{ base: "15px", md: "revert" }}
      top={{ base: "-3rem", sm: "revert" }}
      display={isFlipped ? "" : "none"}
    >
      <ModalHeader>
        <Heading fontSize="24px" textAlign="center">Rules</Heading>
      </ModalHeader>
      <ModalBody>
        <Button
          colorScheme="yellow"
          position="absolute"
          top="0"
          left="0"
          margin="10px"
          onClick={flipCard}
        >
          Settings
        </Button>
        <VStack gap={{ base: "14px", sm: "16px" }} fontSize={{ base: "15px", sm: "16px" }}>
          <Box>
            <Heading fontSize="18px">Introduction</Heading>
            <Text>{rules.introduction}</Text>
          </Box>
          <Box>
            <Heading fontSize="18px">Card Values</Heading>
            <Text>{rules.cardValues}</Text>
          </Box>
          <Box>
            <Heading fontSize="18px">Gameplay</Heading>
            <Text>{rules.gameplay}</Text>
          </Box>
          <Box>
            <Heading fontSize="18px">Scoring</Heading>
            <Text>{rules.scoring}</Text>
          </Box>
        </VStack>
      </ModalBody>

    </ModalContent>
  )
}

export default GameRules

const rules = {
  introduction: "Blackjack, also known as “21,” is an incredibly popular card game that is mainly luck and chance, but has its fair share of strategies to maximize your chances of success.",
  cardValues: "Each card is worth its face value while jacks, queens, and kings are worth 10 points. An Ace can be valued at either 11 points or 1 point.",
  gameplay: "Your goal is to make a hand that scores as close to 21 points, without going over. If your hand goes over 21, your hand is forfeited and all bets will be lost. Make sure you look at the dealer's face-up card to choose your actions wisely!",
  scoring: "If the dealer goes over 21 and you're still in the game, you win! If you both have 21 or less, whoever is closest to 21 wins the round.",
  info: "While it’s mainly a game of luck and chance, Blackjack has its fair share of strategies that can help you get the most out of your bets and payouts. This app will teach you everything you need to know, including how to play and how to maximize your chances of success."
}