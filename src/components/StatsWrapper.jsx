import { Stats } from "./"
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Container, SimpleGrid } from '@chakra-ui/react'

const StatsWrapper = (props) => {
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
         {props.children}
       </AccordionPanel>


      </AccordionItem
>
    </Accordion>
  )
}

export default StatsWrapper