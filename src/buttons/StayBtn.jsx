import {useGameContext} from "../context/game/GameContext.jsx";
import { Button } from '@chakra-ui/react'

const StayBtn = () => {

    const { playerStay } = useGameContext()

    return <Button onClick={playerStay} width="100%" colorScheme="yellow" size={{ base: "md", lg: "lg" }}>Stay</Button>;
};

export default StayBtn;