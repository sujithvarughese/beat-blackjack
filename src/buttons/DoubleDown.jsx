import { Button } from '@chakra-ui/react'
import {useGameContext} from "../context/game/GameContext.jsx";

const DoubleDown = () => {

    const { playerDoubleDown } = useGameContext()

    return <Button onClick={playerDoubleDown} colorScheme="yellow" size={{ base: "md", lg: "lg" }}>Double</Button>;
};

export default DoubleDown;