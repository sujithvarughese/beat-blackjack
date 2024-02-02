import {useGameContext} from "../context/game/GameContext.jsx";
import { Button } from '@chakra-ui/react'

const StayBtn = () => {

    const { playerStay, playerHand } = useGameContext()

    return <Button onClick={playerStay} colorScheme="yellow" size={{ base: "md", lg: "lg" }}>Stay</Button>;
};

export default StayBtn;