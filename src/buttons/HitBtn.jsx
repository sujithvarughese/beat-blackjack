import { Button } from '@chakra-ui/react'
import {useGameContext} from "../context/game/GameContext.jsx";

const HitBtn = () => {

    const { playerHit } = useGameContext()

    return <Button onClick={playerHit} width="100%" colorScheme="yellow" size={{ base: "md", lg: "lg" }}>Hit</Button>;
};

export default HitBtn;