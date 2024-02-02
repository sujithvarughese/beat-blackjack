import { Button } from '@chakra-ui/react'
import { useGameContext } from '../context/game/GameContext.jsx'
const SurrenderBtn = () => {

    const { surrender } = useGameContext()

    return <Button onClick={surrender} colorScheme="yellow" size={{ base: "md", lg: "lg" }}>Surrender</Button>;
};

export default SurrenderBtn;