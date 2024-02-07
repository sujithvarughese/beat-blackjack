import { Button } from '@chakra-ui/react'

const StayBtn = ({ action }) => {

    return <Button onClick={action} width="100%" colorScheme="yellow" size="lg">Stay</Button>;
};

export default StayBtn;