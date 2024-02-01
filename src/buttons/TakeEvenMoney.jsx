import { Button, ButtonGroup } from '@chakra-ui/react'
import { useGameContext } from '../context/game/GameContext.jsx'
const TakeEvenMoney= () => {

    const { handleEvenMoney, checkDealerBlackjack } = useGameContext()


    return (
      <ButtonGroup>
          <Button onClick={handleEvenMoney} colorScheme="yellow" size={{ base: "md", lg: "lg" }}>Take Even Money</Button>;
          <Button onClick={checkDealerBlackjack} colorScheme="yellow" size={{ base: "md", lg: "lg" }}>Decline</Button>;
      </ButtonGroup>

    )
};

export default TakeEvenMoney;