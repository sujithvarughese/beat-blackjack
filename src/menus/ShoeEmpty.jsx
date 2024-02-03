import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import { useGameContext } from '../context/game/GameContext.jsx'
import { useEffect } from 'react'

const ShoeEmpty = () => {

  const { setShoe, toggleSettingsMenu, shoeEmptyMenuOpen, toggleShoeEmptyMenu } = useGameContext()
  const { onClose } = useDisclosure()

  return (
    <Modal isOpen={shoeEmptyMenuOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay>
        <ModalContent textAlign="center" paddingBottom="3">
          <ModalHeader>
            Shoe is Finished
          </ModalHeader>
          <ModalBody>
              <Text m="4">The shoe is empty. What would you like to do?</Text>
              <ButtonGroup colorScheme="yellow">
                <VStack  gap="20px">
                <Button
                  width="240px"
                  onClick={() => {
                    setShoe()
                    toggleShoeEmptyMenu()
                  }}
                >
                  Shuffle up new shoe</Button>
                <Button
                  width="240px"
                  onClick={() => {
                    setShoe(true)
                    toggleShoeEmptyMenu()
                  }}
                >
                  Try again with same shoe</Button>
                <Button
                  width="240px"
                  onClick={() => {
                    toggleSettingsMenu()
                    onClose()
                  }}
                >
                  Settings</Button>
                </VStack>
              </ButtonGroup>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}

export default ShoeEmpty