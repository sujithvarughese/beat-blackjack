import { Button, ButtonGroup, FormLabel, HStack, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, VStack } from '@chakra-ui/react'
import { useGameContext } from '../context/game/GameContext.jsx'
import { useEffect } from 'react'

const PlaceBet = () => {

  const { resultsShown, settings, playerBankroll, bet, setBet, dealHands, showAddFunds, shoe, toggleShoeEmptyMenu } = useGameContext()

  useEffect(() => {
    if (shoe.length < 16) {
      toggleShoeEmptyMenu()
    }
    if (playerBankroll < settings.minBet) {
      showAddFunds()
    }
  }, [resultsShown])
  console.log(shoe)
  console.log(playerBankroll)

  return (
      <ButtonGroup
        border="solid 3px #ECC94B"
        backgroundColor="black"
        padding="12px"
        borderRadius="10px"
        zIndex="10"
      >
        <HStack alignItems="flex-end" gap="1rem">

          <VStack>
            <HStack
              alignItems="flex-end"
              padding="5px"
              borderRadius="5px"
              backgroundColor="white"

            >
              <FormLabel htmlFor={bet} fontWeight="600">Bet Amount</FormLabel>
              <NumberInput
                maxW='100px'
                name="bet"
                id="bet"
                type="number"
                value={bet}
                onChange={val=> setBet(Number(val))}
                min={settings.minBet}
                max={settings.maxBet > playerBankroll ? playerBankroll : settings.maxBet}
                step={25}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper _active={{ bg: 'yellow.500' }}/>
                  <NumberDecrementStepper _active={{ bg: 'yellow.500' }} />
                </NumberInputStepper>
              </NumberInput>
            </HStack>
            <Button
                colorScheme="yellow"
                fontSize="24px"
                fontWeight="700"
                border="solid #ECC94B 12px"
                size="lg"
                onClick={dealHands}
                isDisabled={playerBankroll < bet}
            >Deal<
            /Button>
          </VStack>

          <Slider
            aria-label="slider"
            orientation="vertical"
            colorScheme="yellow"
            name="bet"
            height="120px"
            id="bet"
            type="number"
            onChange={val=> setBet(val)}
            value={bet}
            min={settings.minBet}
            max={settings.maxBet > playerBankroll ? playerBankroll : settings.maxBet}
            step={25}
          >

            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb/>
          </Slider>
        </HStack>
      </ButtonGroup>

  )
}

export default PlaceBet