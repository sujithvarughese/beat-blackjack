import { Button, ButtonGroup } from '@chakra-ui/react'
import { useGameContext } from '../context/game/GameContext.jsx'
const InsuranceBtnGrp = () => {

  const { handleInsurance, checkDealerBlackjack } = useGameContext()

  return (
    <ButtonGroup width="100%">
      <Button onClick={handleInsurance} colorScheme="yellow" height="80px" width="200px" size="lg">Take Insurance</Button>;
      <Button onClick={checkDealerBlackjack} colorScheme="yellow" height="80px" width="200px"  size="lg">Decline</Button>;
    </ButtonGroup>
  )
};

export default InsuranceBtnGrp;