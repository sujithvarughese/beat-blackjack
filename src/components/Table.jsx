import { Box, Container, HStack, Image, SimpleGrid, useToast, VStack, Text } from '@chakra-ui/react'
import tableIMG from "../assets/images/table-2.png"
import tableMobileIMG from "../assets/images/table-2 mobile.png"
import { Bankroll, Feedback, Player, Dealer, CurrentBet, Results, ShoeEmpty } from './'
import {Actions, AddFunds, PlaceBet, SettingsMenu} from "../menus"
import {useGameContext} from "../context/game/GameContext.jsx";
import { HintButton, Settings } from "../buttons";


const Table = () => {

    const {
      winner,
      determineWinner,
      resultsShown,
      placeBetOption,
      settingsMenuOpen,
      hintOption,
      hintShown,
      shoeEmptyShown,
      showFeedback,
      addFundsShown
    } = useGameContext()

    return (
        <SimpleGrid
          maxWidth="1980px"
          position="relative"
        >
          <Image
            display={{ base: "block", md: "none" }}
            src={tableMobileIMG}
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

          <Box position="absolute" top="10%" left="0" right="0" margin="0 auto" zIndex="10">
            <Dealer />
          </Box>

          <Box position="absolute" left="0" right="0" bottom="10%" margin="0 auto" border="black 4px solid">
            <Player />
          </Box>

          <SimpleGrid position="absolute" bottom="3%" right="3%">
            <Actions />
          </SimpleGrid>

          {
            placeBetOption &&
            <SimpleGrid position="absolute" right="3%" bottom="3%">
              <PlaceBet />
            </SimpleGrid>
          }

          {
            hintOption &&
            <HStack position="absolute" left="3%" bottom="3%">
              <HintButton />
            </HStack>
          }

          {settingsMenuOpen && <SettingsMenu />}
          {/*showFeedback && <Feedback />*/}
          {shoeEmptyShown && <ShoeEmpty />}
          {resultsShown && <Results />}
          {addFundsShown && <AddFunds />}






        </SimpleGrid>

    );
};

export default Table;