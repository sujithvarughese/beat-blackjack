import { Button, ButtonGroup } from '@chakra-ui/react'
import { useGameContext } from '../context/game/GameContext.jsx'
const InsuranceBtnGrp = () => {

  const { playerBlackjack, handleInsurance, checkDealerBlackjack } = useGameContext()

  if (playerBlackjack) return

  return (
    <ButtonGroup>
      <Button onClick={handleInsurance} colorScheme="yellow" size={{ base: "md", lg: "lg" }}>Get Insurance</Button>;
      <Button onClick={checkDealerBlackjack} colorScheme="yellow" size={{ base: "md", lg: "lg" }}>Decline</Button>;
    </ButtonGroup>
  )
};

export default InsuranceBtnGrp;