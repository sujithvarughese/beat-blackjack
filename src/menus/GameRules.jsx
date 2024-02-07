
import { Box, Button, Heading, ModalBody, ModalContent, ModalHeader, Text, VStack } from '@chakra-ui/react'

const GameRules = ({ flipCard, isFlipped }) => {
  return (
    <ModalContent
      paddingTop={{ base: "12px", sm: "30px" }}
      marginX={{ base: "15px", md: "revert" }}
      top={{ base: "-3rem", sm: "revert" }}
      display={isFlipped ? "" : "none"}

    >
      <ModalHeader>
        <Heading
          fontSize="24px"
          textAlign="center"
        >Rules</Heading>
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
        <VStack
          gap="16px"
          maxHeight="525px"
          height="525px"
          whiteSpace="wrap"
          overflowY="scroll"
          scroll-behavior="smooth"
          textOverflow="hidden"
          sx={{ WebkitOverflowScrolling: "touch" }}
        >
          <Box>
            <Heading fontSize="18px">Introduction</Heading>
            <Text>{rules.introduction}</Text>
          </Box>
          <Box>
            <Heading fontSize="18px">Initial Deal</Heading>
            <Text>{rules.initialDeal}</Text>
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
  introduction: "Blackjack, known by some as “21,” is an incredibly popular card game where players aim to beat the dealer with a hand that most closely totals 21 points, without going over. While it’s mainly a game of luck and chance, Blackjack has its fair share of strategies that can help you get the most out of your bets and payouts. This app will teach you everything you need to know, including how to play and how to maximize your chances of success.",
  initialDeal: "After choosing your initial settings, start by placing a bet then pressing deal. You are then dealt two cards, and the dealer is dealt two cards. Each card is worth its face value while jacks, queens, and kings are worth 10 points. An Ace can be valued at either 11 points or 1 point. Blackjack is made when your initial two cards consist of an Ace along with any card with a value of 10 (totaling 21 points). But watch out! The dealer can also make blackjack! However , a bonus is paid if you make blackjack. If both you, and the dealer have blackjack, this is called a push, which would result in a tie and no bets lost or won",
  gameplay: "If there are no blackjacks, this is where the action starts. You can choose to add additional cards to your hand, called a hit. When you are comfortable with your hand, you ca, choose to stay. But if your hand totals to over 21 points, your hand is forfeited and all bets will be lost. Make sure you look at the dealer's face-up card to choose your actions wisely!",
  scoring: "If you are able to keep your score at 21 or less, the dealer will then reveal the hidden card. The dealer must draw more cards a hand is made that totals 17 or more points. If the dealer goes over 21 and you're still in the game, you win! If you both have 21 or less, whoever is closest to 21 wins."
}