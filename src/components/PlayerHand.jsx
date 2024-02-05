import { Box, Image, VStack } from '@chakra-ui/react'
import classes from './styles/Hands.module.css'
import { Score } from './index.js'

const PlayerHand = ({ playerHand, doubledHand }) => {

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
              sx={{ transform: `translate(calc(30px * ${index}))` }}
            />
        )
      }
      {playerHand.length !== 0 &&
        <Box position="absolute" bottom="5px" textAlign="center">
          <Score hand={playerHand}/>
        </Box>
      }
    </VStack>
  )
}

export default PlayerHand