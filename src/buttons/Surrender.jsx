import { Button } from '@chakra-ui/react'
const Surrender = ({ action }) => {
    return <Button onClick={action} colorScheme="yellow" size="lg">Surrender</Button>;
};

export default Surrender;