import { useToast } from '@chakra-ui/react'
import { useGameContext } from '../context/game/GameContext.jsx'
import { useEffect } from 'react'

const Feedback = () => {

  const { actionTaken, bookMove, playerHand } = useGameContext()
  const toast = useToast()

  const options = actionTaken === bookMove ?
    {
      title: "Good Move!",
      position: "top",
      status: "success",
      duration: 1000

    }
    :
    {
      title: `The correct play was to ${bookMove}.`,
      position: "top",
      status: "warning",
      duration: 1000
    }


  useEffect(() => {
    toast.closeAll()
    toast(options)
  }, [playerHand])

  return false

}

export default Feedback