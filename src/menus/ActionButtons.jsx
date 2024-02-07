import { ButtonGroup } from '@chakra-ui/react'
import { DoubleBtn, InsuranceBtnGrp, HitBtn, SplitBtn, StayBtn, SurrenderBtn, EvenMoneyBtnGrp } from '../buttons/index.js'
import { useGameContext } from '../context/game/GameContext.jsx'

const ActionButtons = () => {

  const {
    insuranceOpen,
    playerHands,
    currentPlayerHand,
    playerDoubleDown,
    playerBlackjack,
    playerHit,
    playerStay,
    settings,
    surrender,
    splitHand,
    currentHandIndex
  } = useGameContext()

  return (
    <ButtonGroup
      position="absolute"
      bottom="3%"
      right={{ base: "revert", sm: "3%" }}
      width={{ base: "98%", sm: "revert" }}
      justifyContent="space-around"
      flex-wrap="wrap"
    >
      {insuranceOpen && playerBlackjack && <EvenMoneyBtnGrp />}
      {insuranceOpen && !playerBlackjack && <InsuranceBtnGrp />}

      {settings.surrenderAllowed && currentPlayerHand.length === 2 && !insuranceOpen && <SurrenderBtn action={surrender} />}

      {
        playerHands.length <= settings.maxNumSplits
        && currentPlayerHand.length === 2
        && (currentPlayerHand[0].value === currentPlayerHand[1].value
        && !insuranceOpen
          || currentPlayerHand[0].value === 1 && currentPlayerHand[1].value === 11) // when both cards are aces, we changed the first value to 1
        && <SplitBtn action={splitHand}/>
      }

      {currentPlayerHand.length === 2 && !insuranceOpen && <DoubleBtn action={playerDoubleDown} />}
      {!insuranceOpen && <HitBtn action={playerHit} />}
      {!insuranceOpen && <StayBtn action={playerStay} />}
    </ButtonGroup>
  )
}

export default ActionButtons