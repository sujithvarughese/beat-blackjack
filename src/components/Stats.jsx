import { useGameContext } from '../context/game/GameContext.jsx'
import { useEffect, useState } from 'react'
import { Box, HStack, SimpleGrid, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text } from '@chakra-ui/react'
import { convertToUSD } from '../utils/calculations.js'

const initialState = {
  totalNumHandsPlayed: 0,
  avgBetSize: 0,
  totalNetCredit: 0,
  totalNetDebit: 0,
  roi: 0
}
const Stats = () => {
  const { resultsShown, netCredit, netDebit, bet } = useGameContext()

  const [stats, setStats] = useState(initialState)
  const calculateAvgBetSize = () => ((stats.avgBetSize) * stats.totalNumHandsPlayed + bet) /  (stats.totalNumHandsPlayed + 1)

  const calculateROI = () => ((stats.totalNetCredit + netCredit - stats.totalNetDebit - netDebit) / (stats.totalNetDebit + netDebit)) * 100

  useEffect(() => {
    if (!resultsShown) return
    setStats({
      ...stats,
      totalNumHandsPlayed: stats.totalNumHandsPlayed + 1,
      avgBetSize: calculateAvgBetSize(),
      totalNetCredit: stats.totalNetCredit + netCredit,
      totalNetDebit: stats.totalNetDebit + netDebit,
      roi: calculateROI()
    })

    // console.log(`numHandsPlayed: ${stats.totalNumHandsPlayed}, totalCashIn: ${stats.totalCashIn}, netCredit: ${netCredit}, bet: ${bet}`)
    // console.log(`totalWagered: ${stats.totalWagered}, avgBetSize: ${stats.avgBetSize}, profit: ${stats.totalProfit}, roi: ${stats.roi}`)
  }, [resultsShown])

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
      <StatNumber>{convertToUSD(stats.totalNetCredit - stats.totalNetDebit)}</StatNumber>

      <StatHelpText>
        <StatArrow type={stats.totalNetCredit >= stats.totalNetDebit ? "increase" : "decrease"}/>
        ROI: {Math.round(stats.roi)}%
      </StatHelpText>
      <StatLabel>
        Hands Played: {stats.totalNumHandsPlayed}
      </StatLabel>
      <StatLabel>
        Average Bet: {convertToUSD(stats.avgBetSize)}
      </StatLabel>
    </Stat>


  )
}

export default Stats