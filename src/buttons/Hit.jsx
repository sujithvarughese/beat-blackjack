import { Button } from '@chakra-ui/react'
import {useGameContext} from "../context/game/GameContext.jsx";

const Hit = () => {

    const { playerHit } = useGameContext()

    return <Button onClick={playerHit} colorScheme="yellow" size={{ base: "md", lg: "lg" }}>Hit</Button>;
};

export default Hit;