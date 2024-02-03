import { Button } from '@chakra-ui/react'

const SplitBtn = ({ action }) => {

    return <Button onClick={action} width="100%" colorScheme="yellow" size={{ base: "md", lg: "lg" }}>Split</Button>;
};

export default SplitBtn;