import {useGameContext} from "../context/game/GameContext.jsx";
import { convertToUSD } from "../utils/calculations.js";
import { HStack, Text, VStack } from '@chakra-ui/react'
import { CurrentBet } from "./"
const Bankroll = () => {

    const { playerBankroll } = useGameContext()

    return (
        <VStack
          border="solid 6px #ECC94B"
          backgroundColor="black"
          color="white"
          fontWeight="800"
          padding={{ base: "5px", sm: "10px"}}
          borderRadius="5px"
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