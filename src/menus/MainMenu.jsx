import { SettingsMenu, GameRules } from "./"
import { Box, Modal, ModalOverlay } from '@chakra-ui/react'
import { useState } from 'react'
import ReactCardFlip from 'react-card-flip';
import { useGameContext } from '../context/game/GameContext.jsx'
const MainMenu = () => {
  const { settingsMenuOpen, toggleSettingsMenu } = useGameContext()

  const [isFlipped, setIsFlipped] = useState(false)
  const flipCard = () => setIsFlipped(!isFlipped)

  return (
    <Modal
      isOpen={settingsMenuOpen}
      onClose={toggleSettingsMenu}
      closeOnOverlayClick={false}
      size={{base: "sm", md: "md", lg: "lg"}}

      scrollBehavior="inside"
    >
      <ModalOverlay>
        <ReactCardFlip isFlipped={isFlipped}>
          <Box>
            <SettingsMenu flipCard={flipCard}/>
          </Box>
          <Box>
            <GameRules flipCard={flipCard}/>
          </Box>
        </ReactCardFlip>
      </ModalOverlay>

    </Modal>

  )
}

export default MainMenu