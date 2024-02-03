import { useGameContext } from '../context/game/GameContext.jsx'
import { useEffect, useState } from 'react'
import { Box, HStack, SimpleGrid, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text } from '@chakra-ui/react'
import { convertToUSD } from '../utils/calculations.js'

const initialState = {
  totalNumHandsPlayed: 0,
  totalWagered: 0,
  avgBetSize: 0,
  totalCashIn: 0,
  totalProfit: 0,
  roi: 0
}
const Stats = () => {
  const { resultsShown, handWinLossAmount, bet } = useGameContext()

  const [stats, setStats] = useState(initialState)


  const [totalWagered, setTotalWagered] = useState(0)
  const [totalNumHandsPlayed, setTotalNumHandsPlayed] = useState(0)
  const [avgBetSize, setAvgBetSize] = useState(0)
  const [totalCashIn, setTotalCashIn] = useState(0)
  const [totalProfit, setTotalProfit] = useState(0)
  const [roi, setRoi] = useState(0)

  /*
  const addValueAndCalculateAvg = () => {
    return ((numHandsPlayed - 1) / numHandsPlayed) * avgBetSize + (1 / numHandsPlayed) * bet
  }
  */
  const calculateAvgBetSize = () => {
    return ((stats.avgBetSize) * stats.totalNumHandsPlayed + bet) /  (stats.totalNumHandsPlayed + 1)
  }
  const calculateROI = () => {
    if (handWinLossAmount > 0) {
      return ((stats.totalCashIn + handWinLossAmount )/(stats.totalWagered + bet)) * 100
    }
    return ((stats.totalCashIn  - (stats.totalWagered + bet))/(stats.totalWagered + bet)) * 100
  }
  const calculateCashIn = () => {
    if (handWinLossAmount > 0) {
      return stats.totalCashIn + handWinLossAmount
    }
    return stats.totalCashIn
  }

  useEffect(() => {
    if (!resultsShown) return
    setStats({
      ...stats,
      totalNumHandsPlayed: stats.totalNumHandsPlayed + 1,
      totalWagered: stats.totalWagered + bet,
      avgBetSize: calculateAvgBetSize(),
      totalCashIn: calculateCashIn(),
      totalProfit: stats.totalProfit + handWinLossAmount,
      roi: calculateROI()
    })

    // console.log(`numHandsPlayed: ${stats.totalNumHandsPlayed}, totalCashIn: ${stats.totalCashIn}, handWinLossAmount: ${handWinLossAmount}, bet: ${bet}`)
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
      <StatNumber>{convertToUSD(stats.totalProfit)}</StatNumber>

      <StatHelpText>
        <StatArrow type={stats.totalProfit >= 0 ? "increase" : "decrease"}/>
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