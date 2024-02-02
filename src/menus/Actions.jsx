import { ButtonGroup } from '@chakra-ui/react'
import { DoubleBtn, InsuranceBtnGrp, HitBtn, SplitBtn, StayBtn, SurrenderBtn, EvenMoneyBtnGrp } from '../buttons/index.js'
import { useGameContext } from '../context/game/GameContext.jsx'

const Actions = () => {

  const { insuranceOpen } = useGameContext()

  return (
    <ButtonGroup
      position="absolute"
      bottom="3%"
      right={{ base: "revert", md: "3%" }}
      width={{ base: "100%", md: "revert" }}
      justifyContent="space-around"
      flex-wrap="wrap"
    >
      {insuranceOpen && <EvenMoneyBtnGrp /> && <InsuranceBtnGrp />}
      <SurrenderBtn />
      <SplitBtn />
      <DoubleBtn />
      <HitBtn />
      <StayBtn />
    </ButtonGroup>
  )
}

export default Actions