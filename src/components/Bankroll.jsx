import {useGameContext} from "../context/game/GameContext.jsx";
import { convertToUSD } from "../utils/calculations.js";
import { HStack, Text, VStack } from '@chakra-ui/react'
import { CurrentBet } from "./"
const Bankroll = () => {

    const { playerBankroll } = useGameContext()

    return (
        <VStack
          border="solid 3px #ECC94B"
          backgroundColor="rgba(0, 0, 0, 0.8)"
          color="white"
          fontSize={{ base: "14px", sm: "16"}}
          fontWeight={{base: "500", sm: "800"}}
          padding={{ base: "5px", sm: "10px"}}
          borderRadius="10px"
          alignItems="flex-start"
        >
          <HStack>
            <Text>Bankroll:</Text>
            <Text>{convertToUSD(playerBankroll)}</Text>
          </HStack>
           <CurrentBet />
        </VStack>
    );
};

export default Bankroll;