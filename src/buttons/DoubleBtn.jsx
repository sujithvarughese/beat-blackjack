import { Button } from '@chakra-ui/react'

const DoubleBtn = ({ action }) => {

    return <Button onClick={action} width="100%" colorScheme="yellow" size={{ base: "md", lg: "lg" }}>Double</Button>;
};

export default DoubleBtn;