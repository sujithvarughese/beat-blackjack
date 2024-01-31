import React from 'react'
import { RiSettings5Fill } from "react-icons/ri";
import { Button } from '@chakra-ui/react'
import { useGameContext } from '../context/game/GameContext.jsx'

const Settings = () => {

  const { setShowSettingsMenu } = useGameContext()

  return (
    <Button colorScheme="yellow" fontSize="36px" padding="6px" onClick={()=>setShowSettingsMenu(true)}>
      <RiSettings5Fill />
    </Button>
  )
}

export default Settings