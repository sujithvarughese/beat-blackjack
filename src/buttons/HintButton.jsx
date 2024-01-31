import { useGameContext } from "../context/game/GameContext.jsx";
import { Button, useToast } from '@chakra-ui/react'

const HintButton = () => {

    const { hint } = useGameContext()
    const toast = useToast()
    const showHint = () => {
        toast.closeAll()
        toast({
            title: hint.charAt(0).toUpperCase() + hint.slice(1),
            position: "bottom",
            status: "info",
            duration: 2000
        })
    }

    return (
        <Button onClick={showHint} colorScheme="yellow" size="lg">Help!</Button>
    );
};

export default HintButton;