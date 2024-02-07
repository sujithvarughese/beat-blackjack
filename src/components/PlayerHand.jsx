import { Box, Image, keyframes, VStack } from '@chakra-ui/react'
import classes from './styles/Hands.module.css'
import { Score } from './index.js'

const PlayerHand = ({ playerHand, doubledHand, isCurrentHand, playerTurn }) => {

  return (
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
              transform={`translate(calc(30px * ${index}))`}
            />
        )
      }
      {playerHand.length !== 0 &&
        <Box position="absolute" bottom="-45px" textAlign="center">
          <Score hand={playerHand} />
          {isCurrentHand && playerTurn && <CurrentHandIndicator />}
        </Box>
      }

    </VStack>
  )
}

const CurrentHandIndicator = () => {

  const blink = keyframes`
    0% { background-color: black }
    49% { background-color: black }
    50% { background-color: goldenrod }
    100% { background-color: goldenrod }
  `
  const blinkAnimation = `${blink} infinite 1s`
  return (
    <Box
      height="30px"
      width="30px"
      borderRadius="50%"
      margin="10px"
      animation={blinkAnimation}
    >
    </Box>
    )
}



export default PlayerHand