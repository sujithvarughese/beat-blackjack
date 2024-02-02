import { useGameContext } from '../context/game/GameContext.jsx'
import { useEffect, useState } from 'react'
import { Box, HStack, SimpleGrid, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text } from '@chakra-ui/react'
import { convertToUSD } from '../utils/calculations.js'

const Stats = () => {
  const { numHandsPlayed, handWinLossAmount, bet } = useGameContext()

  const [totalWagered, setTotalWagered] = useState(0)
  const [avgBetSize, setAvgBetSize] = useState(0)
  const [profit, setProfit] = useState(0)
  const [roi, setRoi] = useState(0)
  const addValueAndCalculateAvg = () => {
    return ((numHandsPlayed - 1) / numHandsPlayed) * avgBetSize + (1 / numHandsPlayed) * bet
  }
  const calculateROI = () => {
    if (totalWagered === 0) {
      return
    }
    return (((profit + handWinLossAmount) - (totalWagered + bet))/(totalWagered + bet)) * 100
  }

  const currentRoi = calculateROI()
  const currentAverage = addValueAndCalculateAvg()

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