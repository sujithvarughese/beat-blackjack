import { Stats } from "./"
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Container, SimpleGrid } from '@chakra-ui/react'

const StatsMobileWrapper = () => {
  return (
    <Accordion
      allowToggle
    >
      <AccordionItem border="solid 3px #ECC94B"
        backgroundColor="black"
        color="white"
        fontWeight="800"
        borderRadius="5px">

        <AccordionButton>
          Stats
          <AccordionIcon />
        </AccordionButton>

       <AccordionPanel padding="none" margin="0">
        <SimpleGrid width="100%"><Stats /></SimpleGrid>
       </AccordionPanel>


      </AccordionItem
>
    </Accordion>
  )
}

export default StatsMobileWrapper