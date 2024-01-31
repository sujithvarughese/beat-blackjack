import {useGameContext} from "../context/game/GameContext.jsx";
import { convertToUSD } from "../utils/calculations.js";
import { HStack, Text } from '@chakra-ui/react'

const Bankroll = () => {

    const { playerBankroll } = useGameContext()

    return (
        <HStack>
            <Text>Bankroll:</Text>
            <Text>{convertToUSD(playerBankroll)}</Text>
        </HStack>
    );
};

export default Bankroll;