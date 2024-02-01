import { Button, ButtonGroup } from '@chakra-ui/react'
import { useGameContext } from '../context/game/GameContext.jsx'
const TakeInsurance = () => {

    const { handleInsurance, checkDealerBlackjack } = useGameContext()

    return (
        <ButtonGroup>
            <Button onClick={handleInsurance} colorScheme="yellow" size={{ base: "md", lg: "lg" }}>Get Insurance</Button>;
            <Button onClick={checkDealerBlackjack} colorScheme="yellow" size={{ base: "md", lg: "lg" }}>Decline</Button>;
        </ButtonGroup>
    )
};

export default TakeInsurance;