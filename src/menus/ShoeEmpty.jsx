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

  return (
    <Modal isOpen={shoeEmptyMenuOpen} onClose={toggleShoeEmptyMenu} closeOnOverlayClick={false} size="sm">
      <ModalOverlay>
        <ModalContent textAlign="center" paddingBottom="3">
          <ModalHeader>
            Shoe is Finished
          </ModalHeader>
          <ModalBody>
            <VStack  gap="20px">
              <Text>The shoe is empty. What would you like to do?</Text>
              <ButtonGroup colorScheme="yellow" orientation="vertical">
                <Button
                  width="240px"
                  onClick={() => {
                    setShoe(true, false)
                    toggleShoeEmptyMenu()
                  }}
                >
                  Shuffle up new shoe</Button>
                <Button
                  width="240px"
                  onClick={() => {
                    setShoe(false, false)
                    toggleShoeEmptyMenu()
                  }}
                >
                  Try again with same shoe</Button>
                <Button
                  width="240px"
                  onClick={() => {
                    toggleSettingsMenu()
                    toggleShoeEmptyMenu()
                  }}
                >
                  Settings</Button>
              </ButtonGroup>
            </VStack>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}

export default ShoeEmpty