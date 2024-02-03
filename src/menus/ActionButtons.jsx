import { ButtonGroup } from '@chakra-ui/react'
import { DoubleBtn, InsuranceBtnGrp, HitBtn, SplitBtn, StayBtn, SurrenderBtn, EvenMoneyBtnGrp } from '../buttons/index.js'
import { useGameContext } from '../context/game/GameContext.jsx'

const ActionButtons = () => {

  const {
    insuranceOpen,
    playerHand,
    playerDoubleDown,
    playerBlackjack,
    playerHit,
    playerStay,
    settings,
    surrender,
    playerSplit,
    totalSplits,
  } = useGameContext()

  return (
    <ButtonGroup
      position="absolute"
      bottom="3%"
      right={{ base: "revert", md: "3%" }}
      width={{ base: "100%", md: "revert" }}
      justifyContent="space-around"
      flex-wrap="wrap"
    >
      {insuranceOpen && playerBlackjack && <EvenMoneyBtnGrp />}
      {insuranceOpen && !playerBlackjack && <InsuranceBtnGrp />}

      {settings.surrenderAllowed && <SurrenderBtn action={surrender} />}

      {
        settings.maxNumSplits > 0
        && totalSplits < settings.maxNumSplits
        && playerHand.length === 2
        && (playerHand[0].value === playerHand[1].value
          || playerHand[0].value === 1 && playerHand[1].value === 11) // when both cards are aces, we changed the first value to 1
        && <SplitBtn action={playerSplit}/>
      }

      {playerHand.length === 2 && <DoubleBtn action={playerDoubleDown} />}
      <HitBtn action={playerHit} />
      <StayBtn action={playerStay} />
    </ButtonGroup>
  )
}

export default ActionButtons