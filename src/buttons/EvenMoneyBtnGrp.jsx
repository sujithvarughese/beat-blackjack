import { Button, ButtonGroup } from '@chakra-ui/react'
import { useGameContext } from '../context/game/GameContext.jsx'
const EvenMoneyBtnGrp= () => {

    const { playerBlackjack, handleEvenMoney, checkDealerBlackjack } = useGameContext()

    if (!playerBlackjack) return

    return (
      <ButtonGroup>
          <Button onClick={handleEvenMoney} colorScheme="yellow" size={{ base: "md", lg: "lg" }}>Even Money</Button>;
          <Button onClick={checkDealerBlackjack} colorScheme="yellow" size={{ base: "md", lg: "lg" }}>Decline</Button>;
      </ButtonGroup>

    )
};

export default EvenMoneyBtnGrp;