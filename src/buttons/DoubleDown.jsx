import { Button } from '@chakra-ui/react'
import {useGameContext} from "../context/game/GameContext.jsx";

const DoubleDown = () => {

    const { playerDoubleDown } = useGameContext()

    return <Button onClick={playerDoubleDown} colorScheme="yellow" size="lg">Double Down</Button>;
};

export default DoubleDown;