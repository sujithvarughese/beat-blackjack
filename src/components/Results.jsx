import {useGameContext} from "../context/game/GameContext.jsx";
import { Box } from '@chakra-ui/react'
const Results = () => {

    const { winner } = useGameContext()

    return (
        <Box>
            {winner === 1 && <Box>You Win!</Box>}

            {winner === -1 && <Box>You Lose</Box>}

            {winner === 0 && <Box>Push</Box>}
        </Box>
    );
};

export default Results;