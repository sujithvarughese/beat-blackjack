import { Button } from '@chakra-ui/react'
const SurrenderBtn = ({ action }) => {

    return <Button onClick={action} width="100%" colorScheme="yellow" size={{ base: "md", lg: "lg" }}>Surrender</Button>;
};

export default SurrenderBtn;