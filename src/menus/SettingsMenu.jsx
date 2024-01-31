import {useGameContext} from "../context/game/GameContext.jsx";
import { Button, ButtonGroup, FormLabel, Switch, Select, Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, Heading, VStack, Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark, HStack, SimpleGrid, Text, ModalCloseButton } from '@chakra-ui/react'
import { HiOutlineRefresh } from "react-icons/hi";


const SettingsMenu = () => {

    const { settings, setSetting, resetSettings, settingsMenuOpen, setShoe, setShowSettingsMenu } = useGameContext()

    const handleChange = (e) => {
        //setValues({ ...values, [e.target.name]: e.target.value})
        setSetting({ [e.target.name]: e.target.value })
    }
    const handleChecked = (e) => {
        //setValues({ ...values, [e.target.name]: e.target.checked})
        setSetting({ [e.target.name]: e.target.checked })
    }

    return (
        <Modal isOpen={settingsMenuOpen} onClose={()=>setShowSettingsMenu(false)}>
            <ModalOverlay>
                <ModalContent padding="30px">
                    <ModalHeader>
                        <Heading
                          fontSize="24px"
                          textAlign="center"
                        >Game Settings</Heading>
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Button
                          colorScheme="yellow"
                          onClick={resetSettings}
                          position="absolute"
                          top="0"
                          left="0"
                          margin="10px"
                        >
                            <HiOutlineRefresh />
                        </Button>
                        <VStack gap="14px">
                            <SimpleGrid gridTemplateColumns="1fr 5fr 1fr"  width="100%" justifyItems="end" alignItems="center">
                                <FormLabel htmlFor="numDecks">Decks</FormLabel>
                                <Slider
                                  aria-label="slider"
                                  colorScheme="yellow"
                                  name="numDecks"
                                  id="numDecks"
                                  onChange={val=> setSetting({ numDecks: val })}
                                  value={settings.numDecks}
                                  min={1}
                                  max={8}
                                  step={1}
                                >
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <SliderThumb defaultValue={1}/>

                                </Slider>
                                <Text paddingLeft="4">{settings.numDecks}</Text>
                            </SimpleGrid>

                            <SimpleGrid gridTemplateColumns="1fr 5fr 1fr"  width="100%" gap="1px" justifyItems="end" alignItems="center">
                                <FormLabel htmlFor="minBet" display="flex">MinBet</FormLabel>
                                <Slider
                                  aria-label="slider"
                                  colorScheme="yellow"
                                  name="minBet"
                                  id="minBet"
                                  onChange={val=>setSetting({ minBet: val })}
                                  value={settings.minBet}
                                  min={25}
                                  max={500}
                                  step={25}
                                >
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <SliderThumb/>
                                </Slider>
                                <Text>${settings.minBet}</Text>
                            </SimpleGrid>

                            <SimpleGrid gridTemplateColumns="1fr 5fr 1fr"  width="100%" gap="5px" justifyItems="end" alignItems="center">
                                <FormLabel htmlFor="minBet">MaxBet</FormLabel>
                                <Slider
                                  aria-label="slider"
                                  colorScheme="yellow"
                                  name="maxBet"
                                  id="maxBet"
                                  onChange={val=>setSetting({ maxBet: val })}
                                  value={settings.maxBet}
                                  min={500}
                                  max={10000}
                                  step={100}
                                >
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <SliderThumb/>
                                </Slider>
                                <Text>${settings.maxBet}</Text>
                            </SimpleGrid>

                            <SimpleGrid gridTemplateColumns="1fr 5fr 1fr"  width="100%" gap="5px" justifyItems="end" alignItems="center">
                                <FormLabel htmlFor="playerBankroll">Bankroll</FormLabel>
                                <Slider
                                  aria-label="slider"
                                  colorScheme="yellow"
                                  name="playerBankroll"
                                  id="playerBankroll"
                                  onChange={val=>setSetting({ playerInitialBankroll: val })}
                                  value={settings.playerInitialBankroll}
                                  min={500}
                                  max={10000}
                                  step={100}
                                >
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <SliderThumb/>
                                </Slider>
                                <Text>${settings.playerInitialBankroll}</Text>
                            </SimpleGrid>

                            <SimpleGrid gridTemplateColumns="1fr 5fr 1fr"  width="100%" gap="1px" justifyItems="end" alignItems="center">
                                <FormLabel htmlFor="maxNumSplits" display="flex">Splits</FormLabel>
                                <Slider
                                  aria-label="slider"
                                  colorScheme="yellow"
                                  name="maxNumSplits"
                                  id="maxNumSplits"
                                  onChange={val=>setSetting({ maxNumSplits: val })}
                                  value={settings.maxNumSplits}
                                  min={0}
                                  max={6}
                                  step={1}
                                >
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <SliderThumb/>
                                </Slider>
                                <Text>{settings.maxNumSplits}</Text>
                            </SimpleGrid>

                            <HStack width="100%" justifyContent="space-between">
                                <FormLabel htmlFor="dealerHitSoft17">Dealer Hit Soft 17</FormLabel>
                                <Switch

                                  id="dealerHitSoft17"
                                  type="checkbox"
                                  name="dealerHitSoft17"
                                  value={settings.dealerHitSoft17}
                                  isChecked={settings.dealerHitSoft17}
                                  onChange={handleChecked}
                                />
                            </HStack>

                            <HStack width="100%" justifyContent="space-between">
                                <FormLabel htmlFor="insuranceAllowed">Insurance</FormLabel>
                                <Switch
                                  name="insuranceAllowed"
                                  id="insuranceAllowed"
                                  value={settings.insuranceAllowed}
                                  isChecked={settings.insuranceAllowed}
                                  onChange={handleChecked}
                                >
                                </Switch>
                            </HStack>

                            <HStack width="100%" justifyContent="space-between">
                                <FormLabel htmlFor="evenMoneyAllowed">Even Money on Blackjack</FormLabel>
                                <Switch
                                  name="evenMoneyAllowed"
                                  id="evenMoneyAllowed"
                                  value={settings.evenMoneyAllowed}
                                  isChecked={settings.evenMoneyAllowed}
                                  onChange={handleChecked}
                                >
                                </Switch>
                            </HStack>

                            <HStack width="100%" justifyContent="space-between">
                                <FormLabel htmlFor="surrenderAllowed">Surrender</FormLabel>
                                <Switch
                                  name="surrenderAllowed"
                                  id="surrenderAllowed"
                                  value={settings.surrenderAllowed}
                                  isChecked={settings.surrenderAllowed}
                                  onChange={handleChecked}
                                >
                                </Switch>
                            </HStack>

                            <HStack width="100%" justifyContent="space-between">
                                <FormLabel htmlFor="feedback">Live Feedback</FormLabel>
                                <Switch
                                  name="feedback"
                                  id="feedback"
                                  value={settings.feedback}
                                  isChecked={settings.feedback}
                                  onChange={handleChecked}
                                >
                                </Switch>
                            </HStack>

                            <HStack width="100%" justifyContent="space-between">
                                <FormLabel htmlFor="hints">Hints</FormLabel>
                                <Switch
                                  name="hints"
                                  id="hints"
                                  value={settings.hints}
                                  isChecked={settings.hints}
                                  onChange={handleChecked}
                                >
                                </Switch>
                            </HStack>

                            <SimpleGrid gridTemplateColumns="1fr 1fr" width="100%" alignItems="flex-end">
                                <FormLabel htmlFor="blackjackPayout">Blackjack Payout</FormLabel>
                                <Select
                                  name="blackjackPayout"
                                  id="blackjackPayout"
                                  value={settings.blackjackPayout}
                                  onChange={handleChange}
                                >
                                    <option value={3/2}>3:2</option>
                                    <option value={6/5}>6:5</option>
                                    <option value={1}>No Bonus</option>
                                </Select>
                            </SimpleGrid>



                            <ButtonGroup colorScheme="yellow">
                                <Button onClick={setShoe}>Start Game</Button>
                            </ButtonGroup>
                        </VStack>

                    </ModalBody>
                </ModalContent>
            </ModalOverlay>



        </Modal>
    );
};

export default SettingsMenu;