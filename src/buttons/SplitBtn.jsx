import { Button } from '@chakra-ui/react'
import { useGameContext } from '../context/game/GameContext.jsx'

const SplitBtn = () => {

    const { playerSplit, playerHand } = useGameContext()

    if (playerHand.length !== 2 && playerHand[0].value !== playerHand[1].value) return


    return <Button onClick={playerSplit} colorScheme="yellow" size={{ base: "md", lg: "lg" }}>Split</Button>;
};

export default SplitBtn;