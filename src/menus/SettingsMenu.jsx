import {useGameContext} from "../context/game/GameContext.jsx";
import { Button, ButtonGroup, FormLabel, Switch, Select, Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, Heading, VStack, Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark, HStack, SimpleGrid, Text, ModalCloseButton, Tabs, TabList, Tab } from '@chakra-ui/react'
import { HiOutlineRefresh } from "react-icons/hi";
import { GameRules } from "../components"
import { useEffect, useState } from 'react'

const SettingsMenu = ({ flipCard, isFlipped }) => {

    const { settings, setSetting, resetSettings, setShoe, toggleSettingsMenu, placeBetOption } = useGameContext()
    const [blackjackPayoutIndex, setBlackjackPayoutIndex] = useState(0)
    const [blackjackPayout, setBlackjackPayout] = useState(1.5)

    const handleChange = (e) => {
        //setValues({ ...values, [e.target.name]: e.target.value})
        setSetting({ [e.target.name]: e.target.value })
    }
    const handleChecked = (e) => {
        //setValues({ ...values, [e.target.name]: e.target.checked})
        setSetting({ [e.target.name]: e.target.checked })
    }
    useEffect(() => {
        switch (blackjackPayoutIndex) {
            case 0:
                setBlackjackPayout(1.5)
                break
            case 1:
                setBlackjackPayout(1.2)
                break
            case 2:
                setBlackjackPayout(1)
                break
            default:
                break
        }
        setSetting({ blackjackPayout: blackjackPayout })
    }, [blackjackPayoutIndex])

    return (
        <ModalContent
          padding={{ base: "12px", md: "30px" }}
          marginX={{ base: "15px", md: "revert" }}
          top={{ base: "-3rem", sm: "revert" }}
          display={isFlipped ? "none" : ""}
          maxHeight="700px"
        >
            <ModalHeader>
                <Heading
                  fontSize="24px"
                  textAlign="center"
                >Settings</Heading>
            </ModalHeader>

            <ModalBody>
                <Button
                    colorScheme="yellow"
                    position="absolute"
                    top="0"
                    left="0"
                    margin="10px"
                    onClick={flipCard}
                >
                    Rules
                </Button>
                <Button
                  colorScheme="yellow"
                  onClick={resetSettings}
                  position="absolute"
                  top="0"
                  right="0"
                  margin="10px"
                >
                    <HiOutlineRefresh />
                </Button>
                <VStack gap={{ base: "4px", sm: "14px" }}>
                    <SimpleGrid gridTemplateColumns="1fr 5fr 1fr"  width="100%" gap="16px" justifyItems="flex-start" justifyContent="flex-start" alignItems="center">
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

                    <SimpleGrid gridTemplateColumns="1fr 5fr 1fr"  width="100%" gap="9px" justifyItems="flex-start" alignItems="center">
                        <FormLabel htmlFor="minBet" display="flex">MinBet</FormLabel>
                        <Slider
                          aria-label="slider"
                          colorScheme="yellow"
                          name="minBet"
                          id="minBet"
                          type="number"
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

                    <SimpleGrid gridTemplateColumns="1fr 5fr 1fr"  width="100%" gap="4px" justifyItems="flex-start" alignItems="center">
                        <FormLabel htmlFor="maxBet">MaxBet</FormLabel>
                        <Slider
                          aria-label="slider"
                          colorScheme="yellow"
                          name="maxBet"
                          id="maxBet"
                          type="number"
                          onChange={val=>setSetting({ maxBet: val })}
                          value={settings.maxBet}
                          min={500}
                          max={5000}
                          step={100}
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb/>
                        </Slider>
                        <Text>${settings.maxBet}</Text>
                    </SimpleGrid>

                    <SimpleGrid gridTemplateColumns="1fr 5fr 1fr"  width="100%" justifyItems="flex-start" alignItems="center">
                        <FormLabel htmlFor="playerInitialBankroll">Bankroll</FormLabel>
                        <Slider
                          width="210px"
                          aria-label="slider"
                          colorScheme="yellow"
                          name="playerInitialBankroll"
                          id="playerInitialBankroll"
                          type="number"
                          onChange={val=>setSetting({ playerInitialBankroll: val })}
                          value={settings.playerInitialBankroll}
                          min={500}
                          max={5000}
                          step={100}
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb/>
                        </Slider>
                        <Text>${settings.playerInitialBankroll}</Text>
                    </SimpleGrid>

                    <SimpleGrid gridTemplateColumns="1fr 5fr 1fr"  width="100%" gap="18px" justifyItems="flex-start" alignItems="center">
                        <FormLabel htmlFor="maxNumSplits" display="flex">Splits</FormLabel>
                        <Slider
                          width="210px"
                          aria-label="slider"
                          colorScheme="yellow"
                          name="maxNumSplits"
                          id="maxNumSplits"
                          onChange={val=>setSetting({ maxNumSplits: val })}
                          value={settings.maxNumSplits}
                          min={0}
                          max={3}
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
                          colorScheme="orange"
                          id="dealerHitSoft17"
                          type="checkbox"
                          name="dealerHitSoft17"
                          value={settings.dealerHitSoft17}
                          isChecked={settings.dealerHitSoft17}
                          onChange={handleChecked}
                        />
                    </HStack>

                    <HStack width="100%" justifyContent="space-between">
                        <FormLabel htmlFor="insuranceAllowed">Insurance Available</FormLabel>
                        <Switch
                          colorScheme="orange"
                          name="insuranceAllowed"
                          id="insuranceAllowed"
                          value={settings.insuranceAllowed}
                          isChecked={settings.insuranceAllowed}
                          onChange={handleChecked}
                        >
                        </Switch>
                    </HStack>

                    <HStack width="100%" justifyContent="space-between">
                        <FormLabel htmlFor="evenMoneyAllowed">Even Money Available</FormLabel>
                        <Switch
                          colorScheme="orange"
                          name="evenMoneyAllowed"
                          id="evenMoneyAllowed"
                          value={settings.evenMoneyAllowed}
                          isChecked={settings.evenMoneyAllowed}
                          onChange={handleChecked}
                        >
                        </Switch>
                    </HStack>

                    <HStack width="100%" justifyContent="space-between">
                        <FormLabel htmlFor="surrenderAllowed">Surrender Allowed</FormLabel>
                        <Switch
                          colorScheme="orange"
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
                          colorScheme="orange"
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
                          colorScheme="orange"
                          name="hints"
                          id="hints"
                          value={settings.hints}
                          isChecked={settings.hints}
                          onChange={handleChecked}
                        >
                        </Switch>
                    </HStack>

                    {/*<SimpleGrid gridTemplateColumns="1fr 1fr" width="100%" alignItems="flex-end">
                        <FormLabel htmlFor="blackjackPayout">Blackjack Payout</FormLabel>
                        <Select
                          name="blackjackPayout"
                          id="blackjackPayout"
                          value={settings.blackjackPayout}
                          onChange={handleChange}
                        >
                            <option value={1.5}>3:2</option>
                            <option value={1.2}>6:5</option>
                            <option value={1}>No Bonus</option>
                        </Select>
                    </SimpleGrid>*/}

                    <HStack width="100%" justifyContent="space-between" alignItems="center">
                        <FormLabel htmlFor="blackjackPayout">Blackjack Payout</FormLabel>
                        <Tabs
                          defaultIndex={0}
                          size="sm"
                          colorScheme="orange"
                          variant="soft-rounded"
                          onChange={index => setBlackjackPayoutIndex(index)}
                        >
                            <TabList>
                                <Tab>3:2</Tab>
                                <Tab>6:5</Tab>
                                <Tab>None</Tab>
                            </TabList>

                        </Tabs>
                    </HStack>

                    <ButtonGroup colorScheme="yellow">
                        {placeBetOption && <Button onClick={toggleSettingsMenu}>Resume</Button>}
                        <Button onClick={() => setShoe(true, true)}>New Game</Button>
                    </ButtonGroup>
                </VStack>

            </ModalBody>
        </ModalContent>

    );
};

export default SettingsMenu;