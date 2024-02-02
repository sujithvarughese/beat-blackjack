import { Box, Container, HStack, Image, SimpleGrid, useToast, VStack, Text } from '@chakra-ui/react'
import tableIMG from "../assets/images/table-2.png"
import tableMobileIMG from "../assets/images/table-2 mobile.png"
import { Bankroll, Feedback, Player, Dealer, CurrentBet, Results, ShoeEmpty } from './'
import {Actions, AddFunds, PlaceBet, SettingsMenu} from "../menus"
import {useGameContext} from "../context/game/GameContext.jsx";
import { HintButton, Settings } from "../buttons";
import { useEffect } from 'react'
import GameStats from './GameStats.jsx'


const Table = () => {

  const {
    resultsShown,
    placeBetOption,
    settingsMenuOpen,
    hintOption,
    shoeEmptyShown,
    addFundsShown,
  } = useGameContext()



  return (
    <SimpleGrid
      maxWidth="1980px"
      position="relative"
      margin="auto"
    >
      <Image
        display={{ base: "block", md: "none" }}
        src={tableMobileIMG}
        height="100vh"
      ></Image>
      <Image
        display={{ base: "none", md: "block" }}
        src={tableIMG}
        filter="blur(3px)"
      ></Image>

      <Box position="absolute" top="1%" left="1%">
        <Bankroll />
      </Box>

      <Box position="absolute" top="2%" right="2%">
        <Settings />
      </Box>

      <Box
          position="absolute"
          top={{ base: "20%", md: "10%" }}
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
          bottom="18%"
          margin="0 auto"
      >
        <Player />
      </Box>

      <SimpleGrid
        position="absolute"
        bottom="3%"
        right="3%"
      >
        <Actions />
      </SimpleGrid>

      <SimpleGrid>
        <GameStats />
      </SimpleGrid>

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

      {
        hintOption &&
        <HStack
            position="absolute"
            left={{ md: "3%" }}
            right={{ base: "2%", md: "revert" }}
            bottom={{ md: "3%" }}
            top={{ base: "13%", md: "revert" }}
        >
          <HintButton />
        </HStack>
      }

      {settingsMenuOpen && <SettingsMenu />}
      {shoeEmptyShown && <ShoeEmpty />}
      {/*resultsShown && <Results />*/}
      {addFundsShown && <AddFunds />}






    </SimpleGrid>

  );
};

export default Table;