import { Button } from '@chakra-ui/react'
const SurrenderBtn = ({ action }) => {

    return (
      <Button
        onClick={action}
        height="80px"
        width={{ base: "32%", sm: "100%" }}
        colorScheme="yellow"
        size="lg"
        position={{ base: "absolute", sm: "relative" }}
        top={{ base: "-90px", sm: "0" }}
        left={{ base: "8px", sm: "0" }}

      >
          Surrender
      </Button>
    )
};

export default SurrenderBtn;