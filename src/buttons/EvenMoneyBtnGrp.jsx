import { Button, ButtonGroup } from '@chakra-ui/react'
import { useGameContext } from '../context/game/GameContext.jsx'
const EvenMoneyBtnGrp= () => {

    const { handleEvenMoney, checkDealerBlackjack } = useGameContext()

    return (
      <ButtonGroup width="100%">
          <Button onClick={handleEvenMoney} colorScheme="yellow" height="80px" width="200px"  size="lg">Take Even Money</Button>;
          <Button onClick={checkDealerBlackjack} colorScheme="yellow" height="80px" width="200px"  size="lg">Decline</Button>;
      </ButtonGroup>

    )
};

export default EvenMoneyBtnGrp;