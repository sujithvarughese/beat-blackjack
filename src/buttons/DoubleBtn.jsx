import { Button } from '@chakra-ui/react'
import {useGameContext} from "../context/game/GameContext.jsx";

const DoubleBtn = () => {

    const { playerHand, playerDoubleDown } = useGameContext()

    if (playerHand.length !== 2) return

    return <Button onClick={playerDoubleDown} colorScheme="yellow" size={{ base: "md", lg: "lg" }}>Double</Button>;
};

export default DoubleBtn;