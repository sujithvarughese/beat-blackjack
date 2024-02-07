import { Box, Container, HStack, Image, SimpleGrid, VStack, Text } from '@chakra-ui/react'
import tableIMG from "../assets/images/table-2.png"
import tableMobileIMG from "../assets/images/table-2 mobile.png"
import { Bankroll, Player, Dealer, Results } from './'
import {ActionButtons, AddFunds, PlaceBet, SettingsMenu, ShoeEmpty, MainMenu } from "../menus"
import {useGameContext} from "../context/game/GameContext.jsx";
import { HintButton, SettingsBtn } from "../buttons";
import Stats from './Stats.jsx'


const Table = () => {

  const {
    settingsMenuOpen,
    shoeEmptyMenuOpen,
    addFundsMenuOpen,
    playerTurn,
    insuranceOpen,
    resultsShown,
    placeBetOption,
  } = useGameContext()

  return (
    <SimpleGrid
      maxWidth="1980px"
      position="relative"
    >
      <Image
        display={{ base: "block", md: "none" }}
        src={tableMobileIMG}
        width="100%"
        height="100%"
      ></Image>
      <Image
        display={{ base: "none", md: "block" }}
        src={tableIMG}
      ></Image>

      <SimpleGrid
        position="absolute"
        top="1%"
        left="1%"
        display="flex"
        flexDir="column"
        gap="5px"
      >
        <Bankroll />
        <Stats />
      </SimpleGrid>


      <VStack position="absolute" top="2%" right="2%" alignItems="flex-end">
        <SettingsBtn />
        {playerTurn && <HintButton />}
      </VStack>

      <Box
          position="absolute"
          top={{ base: "15%", md: "10%" }}
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          left="0"
          right="0"
          zIndex="10"
      >
        <Dealer />
      </Box>

      <Box
          position="absolute"
          left="0"
          right="0"
          bottom="22%"
          margin="0 auto"
      >
        <Player />
      </Box>

      {(playerTurn || insuranceOpen) && <ActionButtons />}

      {
        placeBetOption &&
        <SimpleGrid
            position="absolute"
            display="flex"
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            right={{ base: "0", md: "3%" }}
            bottom={{ base: "1%", md: "3%" }}
            left={{ base: "0", md: "revert" }}
            margin="0 auto"

        >
          <PlaceBet />
        </SimpleGrid>
      }



      {/*settingsMenuOpen && <SettingsMenu />*/}
      {settingsMenuOpen && <MainMenu />}
      {shoeEmptyMenuOpen && <ShoeEmpty />}
      {addFundsMenuOpen && <AddFunds />}
      {resultsShown && <Results />}







    </SimpleGrid>

  );
};

export default Table;