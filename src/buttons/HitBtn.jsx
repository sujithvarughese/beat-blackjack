import { Button } from '@chakra-ui/react'

const HitBtn = ({ action }) => {

    return <Button onClick={action} width="200px" height="80px" colorScheme="yellow" size="lg">Hit</Button>;
};

export default HitBtn;