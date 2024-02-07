import { Button } from '@chakra-ui/react'

const StayBtn = ({ action }) => {

    return <Button onClick={action} width="200px" height="80px" colorScheme="yellow" size="lg">Stay</Button>;
};

export default StayBtn;