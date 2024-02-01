import { Button } from '@chakra-ui/react'
import { useGameContext } from '../context/game/GameContext.jsx'

const Split = () => {

    const { playerSplit } = useGameContext()

    return <Button onClick={playerSplit} colorScheme="yellow" size={{ base: "md", lg: "lg" }}>Split</Button>;
};

export default Split;