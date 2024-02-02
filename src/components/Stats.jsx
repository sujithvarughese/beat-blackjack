import { useGameContext } from '../context/game/GameContext.jsx'
import { useEffect, useState } from 'react'
import { Box, HStack, SimpleGrid, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text } from '@chakra-ui/react'
import { convertToUSD } from '../utils/calculations.js'

const Stats = () => {
  const { numHandsPlayed, handWinLossAmount, bet } = useGameContext()

  const [totalWagered, setTotalWagered] = useState(bet)
  const [avgBetSize, setAvgBetSize] = useState(0)
  const [profit, setProfit] = useState(0)
  const [roi, setRoi] = useState(0)
  const addValueAndCalculateAvg = () => {
    if (numHandsPlayed === 0) return bet
    return ((numHandsPlayed - 1) / numHandsPlayed) * avgBetSize + (1 / numHandsPlayed) * bet
  }

  const currentAverage = addValueAndCalculateAvg()
  const calculateROI = () => (profit/totalWagered) * 100
  const currentRoi = calculateROI()




  useEffect(() => {
    setTotalWagered(prev => prev + bet)
    setAvgBetSize(currentAverage)
    setProfit(prev => prev + handWinLossAmount)
    setRoi(currentRoi)
    console.log(`numHandsPlayed: ${numHandsPlayed}, handWinLossAmount: ${handWinLossAmount}, bet: ${bet}`)
    console.log(`totalWagered: ${totalWagered}, avgBetSize: ${avgBetSize}, profit: ${profit}, roi: ${roi}, currentAverage: ${currentAverage}, currentRoi: ${currentRoi}`)
  }, [numHandsPlayed])

  return (

    <Stat
      border="solid 3px #ECC94B"
      backgroundColor="black"
      color="white"
      fontWeight="800"
      padding={{ base: "5px", sm: "10px"}}
      borderRadius="10px"
    >
      <StatLabel>Gain/Loss</StatLabel>
      <StatNumber>{convertToUSD(profit)}</StatNumber>

      <StatHelpText>
        <StatArrow type={profit >= 0 ? "increase" : "decrease"}/>
        ROI: {Math.round(roi)}%
      </StatHelpText>
      <StatLabel>
        Hands Played: {numHandsPlayed}
      </StatLabel>
      <StatLabel>
        Average Bet: {convertToUSD(avgBetSize)}
      </StatLabel>
    </Stat>


  )
}

export default Stats