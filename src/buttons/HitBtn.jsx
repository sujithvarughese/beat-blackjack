import { Button } from '@chakra-ui/react'

const HitBtn = ({ action }) => {

    return <Button onClick={action} width="100%" colorScheme="yellow" size={{ base: "md", lg: "lg" }}>Hit</Button>;
};

export default HitBtn;