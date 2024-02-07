import { Button } from '@chakra-ui/react'

const SplitBtn = ({ action }) => {

    return <Button onClick={action} width="100%" height="80px"  colorScheme="yellow" size="lg">Split</Button>;
};

export default SplitBtn;