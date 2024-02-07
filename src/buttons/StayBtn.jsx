import { Button } from '@chakra-ui/react'

const StayBtn = ({ action }) => {

    return <Button onClick={action} width="100%" height="80px" colorScheme="yellow" size="lg">Stay</Button>;
};

export default StayBtn;