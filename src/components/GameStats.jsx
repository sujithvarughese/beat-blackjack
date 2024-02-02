import { useGameContext } from '../context/game/GameContext.jsx'
import { useEffect, useState } from 'react'
import { Box, HStack, Text } from '@chakra-ui/react'
import { convertToUSD } from '../utils/calculations.js'

const GameStats = () => {
    const { numHandsPlayed, handWinLossAmount, bet } = useGameContext()


    const [totalWagered, setTotalWagered] = useState(0)
    const [avgBetSize, setAvgBetSize] = useState(0)
    const [profit, setProfit] = useState(0)
    const [roi, setRoi] = useState(0)
    const addValueAndCalculateAvg = () => ((numHandsPlayed - 1)/numHandsPlayed) * avgBetSize + (1/numHandsPlayed) * bet
    const currentAverage = addValueAndCalculateAvg()
    const calculateROI = () => (profit/totalWagered) * 100
    const currentRoi = calculateROI()

  console.log(profit)
  console.log(totalWagered)

    useEffect(() => {
      if (numHandsPlayed < 1) return
      setTotalWagered(prev => prev + bet)
      setAvgBetSize(currentAverage)
      setProfit(prev => prev + handWinLossAmount)
      setRoi(currentRoi)
    }, [numHandsPlayed])

    return (
        <Box>
            <HStack>
                <Text>Hands Played</Text>
                <Text>{numHandsPlayed}</Text>
            </HStack>
            <HStack>
                <Text>Average Bet</Text>
                <Text>{convertToUSD(avgBetSize)}</Text>
            </HStack>
            <HStack>
                <Text>Profit</Text>
                <Text>{convertToUSD(profit)}</Text>
            </HStack>
            <HStack>
                <Text>ROI</Text>
                <Text>{Math.round(roi)}%</Text>
            </HStack>
        </Box>
    )
}

export default GameStats