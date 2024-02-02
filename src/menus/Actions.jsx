import { ButtonGroup } from '@chakra-ui/react'
import { DoubleBtn, InsuranceBtnGrp, HitBtn, SplitBtn, StayBtn, SurrenderBtn, EvenMoneyBtnGrp } from '../buttons/index.js'
import { useGameContext } from '../context/game/GameContext.jsx'

const Actions = () => {

  const {
    hitOption,
    stayOption,
    doubleDownOption,
    splitOption,
    insuranceOption,
    evenMoneyOption,
    surrenderOption,

    playerTurn,
    insuranceOpen
  } = useGameContext()

  return (
    <ButtonGroup
      justifyContent="space-around" flex-wrap="wrap"
    >
      {splitOption && <SplitBtn />}
      {evenMoneyOption && <EvenMoneyBtnGrp />}
      {insuranceOption && <InsuranceBtnGrp />}
      {surrenderOption && <SurrenderBtn />}
      {doubleDownOption && <DoubleBtn />}
      {hitOption && <HitBtn />}
      {stayOption && <StayBtn />}
    </ButtonGroup>
  )
}

export default Actions