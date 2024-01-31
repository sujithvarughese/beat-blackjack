import { Box, Container, HStack, Image, SimpleGrid, useToast, VStack, Text } from '@chakra-ui/react'
import tableIMG from "../assets/images/table-2.png"
import tableMobileIMG from "../assets/images/table-2 mobile.png"
import {Bankroll, Feedback, Player, Dealer, CurrentBet, Results} from "./";
import {Actions, PlaceBet, SettingsMenu} from "../menus"
import {useGameContext} from "../context/game/GameContext.jsx";
import { HintButton, Settings } from "../buttons";
import { useEffect, useState } from 'react'



const Table = () => {

    const {
      winner,
      determineWinner,
      resultsShown,
      placeBetOption,
      settingsMenuOpen,
      hintOption,
      hintShown,
      showFeedback
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

          { settingsMenuOpen && <SettingsMenu />}
          { showFeedback && <Feedback />}

          <VStack
            position="absolute"
            top="1%"
            left="1%"
            border="solid 6px #ECC94B"
            backgroundColor="black"
            color="white"
            fontWeight="800"
            padding={{ base: "5px", sm: "10px"}}
            borderRadius="5px"
            alignItems="flex-start"
          >
              <Bankroll />
              <CurrentBet />

          </VStack>

          <Box
            position="absolute"
            top="2%"
            right="2%"
          >
            <Settings />
          </Box>

          <Box
            position="absolute"
            top="10%"
            left="0"
            right="0"
            margin="0 auto"
            zIndex="10"
          >
            <Dealer />
          </Box>

          <Box
            position="absolute"
            left="0"
            right="0"
            bottom="10%"
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

          {
            placeBetOption &&
            <SimpleGrid
              position="absolute"
              right="3%"
              bottom="3%"
              border="solid 6px #ECC94B"
              backgroundColor="black"
              padding="12px"
              borderRadius="5px"
            >
              <PlaceBet />
            </SimpleGrid>
          }




          <HStack
            position="absolute"
            left="3%"
            bottom="3%">
            {hintOption && <HintButton />}
          </HStack>




          {
            resultsShown &&
            <Box
              position="absolute"
              top="40%"
              left="5%"
              margin="0 auto"
              border="solid 6px #ECC94B"
              backgroundColor="black"
              color="white"
              fontWeight="800"
              padding={{ base: "5px", sm: "10px" }}
              borderRadius="5px"
            >
              <Results />
            </Box>
          }






        </SimpleGrid>

    );
};

export default Table;