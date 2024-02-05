import { useGameContext } from "../context/game/GameContext.jsx";
import { Button, useToast } from '@chakra-ui/react'

const HintButton = () => {

    const { bookMove } = useGameContext()
    const toast = useToast()
    const showHint = () => {
        toast.closeAll()
        toast({
            title: bookMove.charAt(0).toUpperCase() + bookMove.slice(1),
            position: "bottom",
            status: "info",
            duration: 2000
        })
    }

    return (
        <Button onClick={showHint} colorScheme="yellow" size={{ base: "md", lg: "lg" }}>Help!</Button>
    );
};

export default HintButton;