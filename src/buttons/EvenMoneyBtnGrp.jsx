import { Button, ButtonGroup } from '@chakra-ui/react'
import { useGameContext } from '../context/game/GameContext.jsx'
const EvenMoneyBtnGrp= () => {

    const { handleEvenMoney, checkDealerBlackjack } = useGameContext()

    return (
      <ButtonGroup>
          <Button onClick={handleEvenMoney} colorScheme="yellow" height="80px"  size="lg">Even Money</Button>;
          <Button onClick={checkDealerBlackjack} colorScheme="yellow" height="80px"  size="lg">Decline</Button>;
      </ButtonGroup>

    )
};

export default EvenMoneyBtnGrp;