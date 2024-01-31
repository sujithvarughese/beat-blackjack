import { useState } from "react";
import { useGameContext } from "../context/game/GameContext.jsx";
import {
    Button,
    FormLabel, HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Slider, SliderFilledTrack, SliderThumb, SliderTrack,
    useDisclosure, VStack
} from '@chakra-ui/react'

const AddFunds = () => {

  const { addFundsShown, addFunds } = useGameContext()
  const { onClose } = useDisclosure()
  const [reloadState, setReloadState] = useState(500)

  return (
    <Modal isOpen={addFundsShown} onClose={onClose}>
      <ModalOverlay label="Reload Amount">
        <ModalContent>
          <ModalHeader textAlign="center">
            Add Funds
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <VStack gap="40px" alignItems="left">
                <HStack justifyContent="space-between">
                    <FormLabel htmlFor="reloadState">Amount</FormLabel>
                    <NumberInput
                        type="number"
                        name="reloadState"
                        value={reloadState}
                        min={100}
                        max={10000}
                        step={25}
                        onChange={(val)=>setReloadState(val)}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper _active={{ bg: 'yellow.500' }}/>
                            <NumberDecrementStepper _active={{ bg: 'yellow.500' }} />
                        </NumberInputStepper>
                    </NumberInput>
                </HStack>

                <Slider
                    aria-label="slider"
                    colorScheme="yellow"
                    name="reloadState"
                    id="reloadState"
                    type="number"
                    onChange={val=> setReloadState(val)}
                    value={reloadState}
                    min={100}
                    max={10000}
                    step={25}
                >

                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb/>
                </Slider>
                <Button
                    onClick={()=>addFunds(reloadState)}
                    colorScheme="yellow"
                    alignSelf="center"
                >
                    Add Funds
                </Button>
            </VStack>
          </ModalBody>
        </ModalContent>


      </ModalOverlay>

    </Modal>
  );
};

export default AddFunds;