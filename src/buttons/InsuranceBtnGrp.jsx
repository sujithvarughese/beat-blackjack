import { Button, ButtonGroup } from '@chakra-ui/react'
import { useGameContext } from '../context/game/GameContext.jsx'
const InsuranceBtnGrp = () => {

  const { handleInsurance, checkDealerBlackjack } = useGameContext()

  return (
    <ButtonGroup>
      <Button onClick={handleInsurance} colorScheme="yellow" height="80px"  size="lg">Get Insurance</Button>;
      <Button onClick={checkDealerBlackjack} colorScheme="yellow" height="80px"  size="lg">Decline</Button>;
    </ButtonGroup>
  )
};

export default InsuranceBtnGrp;