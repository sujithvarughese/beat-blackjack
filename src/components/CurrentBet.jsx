import { convertToUSD } from "../utils/calculations.js";
import {useGameContext} from "../context/game/GameContext.jsx";
import { Box, HStack, Text } from '@chakra-ui/react'

const CurrentBet = () => {

    const { bet } = useGameContext()

    return (
        <>
            {bet ?
              <HStack gap="23px">
                  <Text>Wager: </Text>
                  <Text>{convertToUSD(bet)}</Text>
              </HStack>

              : $0
            }

        </>
    );
};

export default CurrentBet;