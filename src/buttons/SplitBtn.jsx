import { Button } from '@chakra-ui/react'

const SplitBtn = ({ action }) => {

    return <Button onClick={action} width="200px" height="80px"  colorScheme="yellow" size="lg">Split</Button>;
};

export default SplitBtn;