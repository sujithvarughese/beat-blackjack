import { Button, ButtonGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { useGameContext } from '../context/game/GameContext.jsx'

const ShoeEmpty = () => {


  const { setShoe, shoeEmptyShown, showSettingsMenu } = useGameContext()
  const { onClose } = useDisclosure()

  return (
    <Modal isOpen={shoeEmptyShown} onClose={onClose}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>
            Shoe is Finished
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text>The shoe is empty. What would you like to do?</Text>
            <ButtonGroup display="flex" flexDirection="column">
              <Button onClick={setShoe}>Shuffle up new shoe</Button>
              <Button onClick={()=>setShoe(true)}>Try again with same shoe</Button>
              <Button onClick={showSettingsMenu}>Settings</Button>
            </ButtonGroup>

          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}

export default ShoeEmpty