import { ButtonGroup } from '@chakra-ui/react'
import { DoubleDown, TakeInsurance, Hit, Split, Stay, Surrender, TakeEvenMoney } from '../buttons/index.js'
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
  } = useGameContext()

  return (
    <ButtonGroup>
      {doubleDownOption && <DoubleDown />}
      {splitOption && <Split />}
      {evenMoneyOption && <TakeEvenMoney />}
      {insuranceOption && <TakeInsurance />}
      {surrenderOption && <Surrender />}
      {hitOption && <Hit />}
      {stayOption && <Stay />}
    </ButtonGroup>
  )
}

export default Actions