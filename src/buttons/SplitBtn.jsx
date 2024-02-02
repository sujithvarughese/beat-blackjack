import { Button } from '@chakra-ui/react'
import { useGameContext } from '../context/game/GameContext.jsx'

const SplitBtn = () => {

    const { playerSplit, totalSplits, playerHand, settings } = useGameContext()

    if (
      settings.maxNumSplits === 0 ||
      totalSplits >= settings.maxNumSplits ||
      playerHand.length !== 2 /*||
      playerHand[0].value !== playerHand[1].value ||
      playerHand[0].value === 1 && playerHand[1].value === 11 */// when both cards are aces, we changed the first value to 1
    ) return


    return <Button onClick={playerSplit} width="100%" colorScheme="yellow" size={{ base: "md", lg: "lg" }}>Split</Button>;
};

export default SplitBtn;