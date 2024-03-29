import React from 'react'
import { RiSettings5Fill } from "react-icons/ri";
import { Button } from '@chakra-ui/react'
import { useGameContext } from '../context/game/GameContext.jsx'

const SettingsBtn = () => {

  const { toggleSettingsMenu, placeBetOption } = useGameContext()

  return (
    <Button
      colorScheme="yellow"
      fontSize="48px"
      padding="6px"
      height="100%"
      onClick={toggleSettingsMenu}
      isDisabled={!placeBetOption}
    >
      <RiSettings5Fill />
    </Button>
  )
}

export default SettingsBtn