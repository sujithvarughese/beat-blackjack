import { Button } from '@chakra-ui/react'

const DoubleBtn = ({ action }) => {

    return <Button onClick={action} width="100%" colorScheme="yellow" size="lg">Double</Button>;
};

export default DoubleBtn;