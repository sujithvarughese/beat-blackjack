import { Button } from '@chakra-ui/react'

const StayBtn = ({ action }) => {

    return <Button onClick={action} width="100%" colorScheme="yellow" size={{ base: "md", lg: "lg" }}>Stay</Button>;
};

export default StayBtn;