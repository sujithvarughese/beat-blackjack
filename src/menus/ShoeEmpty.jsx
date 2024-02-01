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

const ShoeEmpty = () => {


  const { setShoe, shoeEmptyShown, showSettingsMenu } = useGameContext()
  const { onClose } = useDisclosure()

  return (
    <Modal isOpen={shoeEmptyShown} onClose={onClose}>
      <ModalOverlay>
        <ModalContent textAlign="center" paddingBottom="3">
          <ModalHeader>
            Shoe is Finished
          </ModalHeader>
          <ModalBody>
              <Text m="4">The shoe is empty. What would you like to do?</Text>
              <ButtonGroup colorScheme="yellow">
                <VStack  gap="20px">
                <Button width="240px" onClick={setShoe}>Shuffle up new shoe</Button>
                <Button width="240px" onClick={()=>setShoe(true)}>Try again with same shoe</Button>
                <Button width="240px" onClick={showSettingsMenu}>Settings</Button>
                </VStack>
              </ButtonGroup>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}

export default ShoeEmpty