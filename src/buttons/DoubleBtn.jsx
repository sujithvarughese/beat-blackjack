import { Button } from '@chakra-ui/react'

const DoubleBtn = ({ action }) => {

    return <Button onClick={action} width="100%" height="80px"  colorScheme="yellow" size="lg">Double</Button>;
};

export default DoubleBtn;