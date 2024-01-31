import {useGameContext} from "../context/game/GameContext.jsx";
import { Button } from '@chakra-ui/react'

const Stay = () => {

    const { playerStay } = useGameContext()

    return <Button onClick={playerStay} colorScheme="yellow" size="lg">Stay</Button>;
};

export default Stay;