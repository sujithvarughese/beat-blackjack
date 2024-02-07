import { Button } from '@chakra-ui/react'
const SurrenderBtn = ({ action }) => {

    return (
      <Button
        onClick={action}
        height="80px"
        width={{ base: "32%", lg: "200px" }}
        colorScheme="yellow"
        size="lg"
        position={{ base: "absolute", md: "relative" }}
        top={{ base: "-90px", md: "0" }}
        left={{ base: "8px", md: "0" }}

      >
          Surrender
      </Button>
    )
};

export default SurrenderBtn;