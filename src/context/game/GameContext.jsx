import {createContext, useContext, useReducer} from "react";
import gameReducer from "./game-reducer.js";
import { createShoe } from '../../utils/deck.js'
import determineBookMove from '../../utils/determineBookMove.js'
import {
    SET_STATE,
    TOGGLE_SETTINGS_MENU,
    TOGGLE_SHOE_EMPTY_MENU,
    TOGGLE_ADD_FUNDS_MENU,
    SET_SETTING,
    RESET_SETTINGS,
    SET_SHOE,
    SET_BET,
    SET_DEALER_INITIAL,
    SET_PLAYER_INITIAL,
    DEAL_HANDS,
    DRAW_CARD,
    HANDLE_DEALER_ACE,
    DEALER_BLACKJACK,
    PLAYER_BLACKJACK,
    HANDLE_INSURANCE,
    HANDLE_EVEN_MONEY,
    SET_PLAYER_TURN,
    PLAYER_HIT,
    PLAYER_DOUBLE_DOWN,
    PLAYER_STAY,
    DEALER_HIT,
    DETERMINE_WINNER,
    ADD_FUNDS,

    PLAYER_PUSH,
    PLAYER_WIN,
    DEALER_WIN,
    PLAYER_EVEN_MONEY_PAYOUT,
    PLAYER_INSURANCE_PAYOUT,

    SHOW_RESULTS

} from './game-actions.js'
import { useToast } from '@chakra-ui/react'

const GameContext = createContext()

const initialState= {

    settingsMenuOpen: true,
    addFundsMenuOpen: false,
    shoeEmptyMenuOpen: false,

    settings: {
        numDecks: 1,
        minBet: 25,
        maxBet: 500,
        dealerHitSoft17: true,
        insuranceAllowed: false,
        evenMoneyAllowed: false,
        surrenderAllowed: false,
        blackjackPayout: 1.5,
        maxNumSplits: 1,
        playerInitialBankroll: 500,
        feedback: true,
        hints: true
    },

    newShoe: [],
    shoe: [],

    bet: 25,
    currentPlayerHand: [],
    dealerHand: [],
    dealerFaceUpValue: 0,
    playerBankroll: 500,
    netDebit: 0,
    netCredit: 0,

    playerBlackjack: false,
    dealerBlackjack: false,
    dealer21: false, // if dealer has 10 showing with Ace under

    playerTurn: false,
    dealerTurn: false,

    insuranceOpen: false,

    doubledHand: false,
    splitHand: false,
    surrenderTaken: false,
    insuranceTaken: false,
    evenMoneyTaken: false,

    dealOption: false,
    addFundsOption: false,
    placeBetOption: false,

    totalSplits: 0,
    splitCount: 0,
    splitHands: [],
    splitDoubledHands: [],

    hintShown: false,
    hint: "",
    feedbackShown: false,
    feedbackText: "",
    actionTaken: "",
    bookMove: "",

    dealerCardShown: false,
    resultsShown: false,
    numHandsPlayed: 0,

}

const GameProvider = ({ children }) => {

    const [state, dispatch] = useReducer(gameReducer, initialState)

    const toggleSettingsMenu = () => dispatch({ type: TOGGLE_SETTINGS_MENU, })
    const toggleShoeEmptyMenu = () => dispatch({ type: TOGGLE_SHOE_EMPTY_MENU })
    const toggleAddFundsMenu = () => dispatch({ type: TOGGLE_ADD_FUNDS_MENU, })

    // state for individual settings changed when user adjusts setting value
    const setSetting = (setting) => {
        dispatch({
            type: SET_SETTING,
            payload: { setting }
        })
    }
    // set to initial settings state
    const resetSettings = () => {
        const { settings } = initialState
        dispatch({
            type: RESET_SETTINGS,
            payload: { settings }
        })
    }

    // creates shoe using number of decks user selected, gives user option to change bet size and deal hands
    const setShoe = (sameShoe = false) => {
        // if user wants to play the same shoe again
        const newShoe = sameShoe === true ? [...state.newShoe] : createShoe(state.settings.numDecks)
        const status = {
            newShoe: newShoe,
            shoe: [...newShoe],
            playerBankroll: sameShoe === true ? state.playerBankroll : state.settings.playerInitialBankroll,
            placeBetOption: true,
            settingsMenuOpen: false
        }
        dispatch({
            type: SET_SHOE,
            payload: { status }
        })
    }
    // set state on change in PlaceBet component
    const setBet = (bet) => {
        dispatch({
            type: SET_BET,
            payload: { bet }
        })
    }
    const addFunds = (reloadAmount) => {
        const playerBankroll = state.playerBankroll + Number(reloadAmount)
        dispatch({
            type: ADD_FUNDS,
            payload: { playerBankroll }
        })
    }
    const setDealerInitial = ({ dealerBlackjack, dealer21, dealerFaceUpValue }) => {
        dispatch({
            type: SET_DEALER_INITIAL,
            payload: { dealerBlackjack, dealer21, dealerFaceUpValue }
        })
    }
    const setPlayerInitial = ({ playerBlackjack, currentPlayerHand, hint }) => {
        dispatch({
            type: SET_PLAYER_INITIAL,
            payload: { playerBlackjack, currentPlayerHand, hint }
        })
    }
    // sets state of shoe after popping top card
    const drawCard = () => {
        const shoe = state.shoe
        const nextCard = shoe.pop()
        dispatch({
            type: DRAW_CARD,
            payload: { shoe }
        })
        return nextCard
    }
    // user places initial bet, set to state, then cards are dealt
    const dealHands = () => {
        let status = {
            placeBetOption: false,
            resultsShown: false,
            dealerCardShown: false,

            doubledHand: false,
            splitHand: false,
            surrenderTaken: false,
            insuranceTaken: false,
            evenMoneyTaken: false,

            splitCount: 0,
            totalSplits: 0,
            splitHands: [],
            splitDoubledHands: [],
            bookMove: ""
        }

        let playerBankroll = state.playerBankroll - state.bet
        let netDebit =  state.bet
        let netCredit = 0
        const playerHands = []
        const currentPlayerHand = []
        const dealerHand = []
        let playerBlackjack = false
        let dealerBlackjack
        let dealer21
        let dealerFaceUpValue

        currentPlayerHand.push(drawCard())
        dealerHand.push(drawCard())
        currentPlayerHand.push(drawCard())
        dealerHand.push(drawCard())

        if (currentPlayerHand.reduce((acc, card) => acc + card.value, 0) === 21) {
            playerBlackjack = true
        }
        // if both player's cards are aces, make the first value === 1
        if (currentPlayerHand[0].value === 11 && currentPlayerHand[1].value === 11) {
            currentPlayerHand[0].value = 1
        }
        if (dealerHand[0].value === 11 && dealerHand[1] === 10) {
            dealerBlackjack = true
        } else if (dealerHand[0].value === 10 && dealerHand[1] === 11){
            dealer21 = true
        }
        // dealer's face up card to see if insurance or even money should be offered
        dealerFaceUpValue = dealerHand[0].value

        const bookMove = getBookMove(currentPlayerHand, dealerFaceUpValue)

        status = {
            ...status,
            bookMove: bookMove,
            dealerHand: dealerHand,
            playerHands: playerHands,
            currentPlayerHand: currentPlayerHand,
            playerBlackjack: playerBlackjack,
            dealerBlackjack: dealerBlackjack,
            dealer21: dealer21,
            dealerFaceUpValue: dealerFaceUpValue,
            playerBankroll: playerBankroll,
            netDebit: netDebit,
            netCredit: netCredit
        }

        // if insurance or even money offered, set state and break from function to give user option
        if (dealerFaceUpValue === 11 && (state.settings.evenMoneyAllowed || state.settings.insuranceAllowed)) {
            status = { ...status, insuranceOpen: true }
            dispatch({ type: SET_STATE, payload: { status } })
            return
        }
        // remaining code in this function assumes no insurance/even money option
        // dealer21 = dealer made 21 with A face down (no insurance)
        if (dealer21 && playerBlackjack) {
            dispatch({ type: SHOW_RESULTS, payload: { status, netCredit: netCredit + state.bet } })
            return
        }
        if (dealer21 || dealerBlackjack) {
            dispatch({ type: SHOW_RESULTS, payload: { status, dealerBlackjack: true } })
            return
        }
        if (playerBlackjack) {
            dispatch({
                type: SHOW_RESULTS,
                payload: {
                    status,
                    playerBlackjack: true,
                    playerBankroll: playerBankroll + netCredit * Number(state.settings.blackjackPayout),
                    netCredit: netCredit * Number(state.settings.blackjackPayout)
                }
            })
            return
        }
        status = {
            ...status,
            playerTurn: true,
            hint: hint
        }
        dispatch({
            type: SET_STATE,
            payload: { status }
        })
    }

    const handleEvenMoney = () => {
        const status = {
            playerBankroll:  state.playerBankroll + state.netDebit * 2,
            netCredit: state.netDebit * 2,
        }
        dispatch({
            type: SHOW_RESULTS,
            payload: { status }
        })
    }
    const handleInsurance = () => {

        let status = {}
        if (state.dealerBlackjack) {
            status = { playerBankroll: state.playerBankroll + state.netDebit, netCredit: state.netDebit }
            dispatch({
                type: SHOW_RESULTS,
                payload: { status }
            })
            return
        }
        status = {
            playerBankroll: state.playerBankroll - state.netDebit * 0.5,
            netDebit: state.netDebit + state.netDebit * 0.5,
        }
        dispatch({
            type: SET_PLAYER_TURN,
            payload: { status }
        })
    }
    const checkDealerBlackjack = () => {
        if (state.dealerBlackjack) {
            dispatch({ type: SHOW_RESULTS, })
            return
        }
        const status = {
            netCredit: state.netDebit + state.netDebit * Number(state.settings.blackjackPayout),
            playerBankroll: state.playerBankroll + state.netDebit + state.netDebit * Number(state.settings.blackjackPayout),
        }
        dispatch({ type: SHOW_RESULTS, payload: { status } })
    }

    const getBookMove = (hand = state.currentPlayerHand, dealerFaceUpValue = state.dealerFaceUpValue) => {
        let playerAce11 = false
        let score = hand.reduce((acc, card) => acc + card.value, 0)
        const aceValue11Index = hand.findIndex(card => card.rank === "Ace" && card.value === 11)
        if (aceValue11Index !== -1) {
            playerAce11 = true
        }
        return determineBookMove(playerAce11, dealerFaceUpValue, score, hand, state.settings.maxNumSplits > 0, state.settings.surrenderAllowed)
    }

    const playerHit = () => {
        showBookMove("hit")
        const currentPlayerHand = [...state.currentPlayerHand]
        currentPlayerHand.push(drawCard())
        let score = currentPlayerHand.reduce((acc, card) => acc + card.value, 0)
        const aceValue11Index = currentPlayerHand.findIndex(card => card.rank === "Ace" && card.value === 11)
        if (score > 21 && aceValue11Index !== -1) {
            currentPlayerHand[aceValue11Index] = {
                ...currentPlayerHand[aceValue11Index],
                value: 1
            }
            score -= 10
        }
        const bookMove = getBookMove(currentPlayerHand)


        let status = {
            actionTaken: "hit",
            bookMove: bookMove,
            hint: hint,
            currentPlayerHand: currentPlayerHand
        }

        if (state.splitHand === true) {
            const splitHands = [...state.splitHands]
            splitHands[state.splitCount] = [...currentPlayerHand]
            status = {
                ...status,
                splitHands: splitHands
            }
            if (score >= 21) {
                status = {
                    ...status,
                    splitDoubledHands: [...state.splitDoubledHands, false],
                    splitCount: state.splitCount + 1
                }
            }
        } else {
            if (score === 21) {
                status = {
                    ...status,
                    playerTurn: false,
                    dealerTurn: true,
                    dealerCardShown: true
                }
            } else if (score > 21) {
                status = {
                    ...status,
                    playerTurn: false,
                    dealerCardShown: true,
                    placeBetOption: true,
                    resultsShown: true
                }
            }
        }
        dispatch({
            type: SET_STATE,
            payload: { status }
        })
    }

    const playerDoubleDown = () => {
        const bookMove = getBookMove()
        const currentPlayerHand = [...state.currentPlayerHand]
        currentPlayerHand.push(drawCard())
        const aceValue11Index = currentPlayerHand.findIndex(card => card.rank === "Ace" && card.value === 11)
        let score = currentPlayerHand.reduce((acc, card) => acc + card.value, 0)
        if (score > 21 && aceValue11Index !== -1) {
            currentPlayerHand[aceValue11Index].value = 1
            score -= 10
        }
        let status = {
            actionTaken: "double down",
            bookMove: bookMove,
            playerBankroll: state.playerBankroll - state.bet,
            netCredit: state.netCredit - state.bet,
            doubledHand: true,
            playerTurn: false,
            currentPlayerHand: currentPlayerHand,
        }
        if (state.splitHand) {
            const splitHands = [...state.splitHands]
            splitHands[state.splitCount] = [...currentPlayerHand]
            status = {
                ...status,
                splitHands: splitHands,
                splitDoubledHands: [...state.splitDoubledHands, true],
                splitCount: state.splitCount + 1,
            }
        } else {
            status = {
                ...status,
                placeBetOption: true,
                numHandsPlayed: state.numHandsPlayed + 1,
                resultsShown: true,
                dealerCardShown: true,
                dealerTurn: true,
            }
        }
        dispatch({
            type: PLAYER_DOUBLE_DOWN,
            payload: { status }
        })
    }

    const playerStay = () => {
        const bookMove = getBookMove()
        let status = {
            actionTaken: "stay",
            bookMove: bookMove,
        }
        if (state.splitHand) {
            status = {
                ...status,
                splitDoubledHands: [...state.splitDoubledHands, false],
                splitCount: state.splitCount + 1
            }
        } else {
            status = {
                ...status,
                playerTurn: false,
                dealerTurn: true,
                dealerCardShown: true,
            }
        }

        dispatch({
            type: PLAYER_STAY,
            payload: { status }
        })
    }

    const surrender = () => {
        const bookMove = getBookMove()
        const status = {
            actionTaken: "surrender",
            bookMove: bookMove,
            playerBankroll: state.playerBankroll + state.bet * 0.5,
            netCredit: state.netCredit - state.bet * 0.5,
            numHandsPlayed: state.numHandsPlayed + 1,
            placeBetOption: true
        }
        dispatch({
            type: SET_STATE,
            payload: { status }
        })
    }

    const showBookMove = (actionTaken) => {
        const toast = useToast()
        const options = actionTaken === state.bookMove ?
          {
              title: "Good Move!",
              position: "top",
              status: "success",
              duration: 1000
          }
          :
          {
              title: `The correct play was to ${state.bookMove}.`,
              position: "top",
              status: "warning",
              duration: 1000
          }
        toast.closeAll()
        toast(options)
    }


    const splitHand_ = () => {
        showBookMove("split")
        const playerHands = [...state.playerHands]

        // If two aces, since we changed the first Ace value to 1 on the initial deal, should be changed back to 11 for split hand
        if (playerHands[playerHands.length - 1][0].value === 1 && playerHands[playerHands.length - 1][1].value === 11) {
            playerHands[playerHands.length - 1][0] = {
                ...playerHands[playerHands.length - 1][0],
                value: 11
            }
        }
        // make new hand by popping card from last hand of array (if only one hand, will be the first hand)
        const newHand = [playerHands[playerHands.length - 1].pop()]
        // current hand is the hand which we just popped a card from (original hand)
        const currentPlayerHand = playerHands[playerHands.length - 1]
        // both current hand and new hand should only have one card each; push new hand into array of hands
        playerHands.push(newHand)
        // draw first card for first split hand
        currentPlayerHand.push(drawCard())
        // if both player's cards are aces, make the first value === 1
        if (currentPlayerHand[0].value === 11 && currentPlayerHand[1].value === 11) {
            currentPlayerHand[0].value = 1
        }
        const bookMove = getBookMove(currentPlayerHand)
    }


    const playerSplit = () => {
        // array that holds each split hand
        let splitHands = [...state.splitHands]
        // currentPlayerHand = 2 cards which will need to be split that make up the base of a split hand
        const currentPlayerHand = [...state.currentPlayerHand]
        // since we changed the Ace value to 1 on the initial deal, should be changed back to 11 for split hand
        if (currentPlayerHand[0].value === 1 && currentPlayerHand[1].value === 1) {
            currentPlayerHand[0].value = 11
        }
        const bookMove = getBookMove(state.currentPlayerHand.slice(state.currentPlayerHand.length - 2))
        // second of the split hands
        const newHand = [state.currentPlayerHand[state.currentPlayerHand.length - 1]]
        // if not first split, pop out newest hand as we will be adding it as currentPlayerHand with one card
        if (splitHands.length > 0) {
            splitHands.pop()
        }
        // remove the second card which is now in newHand array
        currentPlayerHand.pop()
        // draw first card for first split hand
        currentPlayerHand.push(drawCard())
        const hint = getBookMove(currentPlayerHand)
        // split hands array will contain previous split hands and both current split hands
        splitHands = [...splitHands, currentPlayerHand, newHand]
        const status = {
            splitHands: splitHands,
            currentPlayerHand: currentPlayerHand,
            totalSplits: state.totalSplits + 1,
            splitHand: true,
            playerBankroll: state.playerBankroll - state.bet,
            actionTaken: "split",
            bookMove: bookMove,
            hint: hint,
            playerTurn: true,
        }
        dispatch({
            type: "SPLIT",
            payload: { status }
        })
    }

    const playNextSplitHand = () => {
        console.log(state.splitHand)
        console.log(state.splitCount)
        console.log(state.totalSplits)
        if (state.splitCount <= state.totalSplits) {
            let splitHands = [...state.splitHands]
            // set currentPlayerHand to current working hand at index splitCount
            const currentPlayerHand = splitHands[state.splitCount]
            currentPlayerHand.push(drawCard())
            // set current player hand at index in splitHands array
            splitHands[state.splitCount] = currentPlayerHand
            const status = {
                splitHands: splitHands,
                currentPlayerHand: currentPlayerHand,
                playerTurn: true,

            }
            dispatch({
                type: "SPLIT",
                payload: { status }
            })
        }
        else {
            const status = {
                playerTurn: false,
                dealerTurn: true,
                dealerCardShown: true,
                resultsShown: true
            }
            dispatch({
                type: "SPLIT",
                payload: { status }
            })
        }
    }

    const dealerHit = () => {
        const dealerHand = [...state.dealerHand]
        dealerHand.push(drawCard())
        if (dealerHand.reduce((acc, card) => acc + card.value, 0) > 21) {
            const aceValue11Index = dealerHand.findIndex(card => card.rank === "Ace" && card.value === 11)
            if (aceValue11Index !== -1) {
                dealerHand[aceValue11Index].value = 1
            }
        }
        dispatch({
            type: DEALER_HIT,
            payload: { dealerHand }
        })
    }

    const determineWinner = () => {
        let status = {
            dealerTurn: false,
            resultsShown: true,
            placeBetOption: true,
            numHandsPlayed: state.numHandsPlayed + 1,
        }

        const getProfit = (index) => {
            const playerScore = state.currentPlayerHand.reduce((acc, card) => acc + card.value, 0)
            const dealerScore = state.dealerHand.reduce((acc, card) => acc + card.value, 0)
            let currentBet = state.bet

            if (state.doubledHand === true || state.splitDoubledHands[index] === true) {
                currentBet += state.bet
            }

            if (dealerScore > 21 || playerScore > dealerScore) {
                status = {
                    ...status,
                    netCredit: state.netCredit + currentBet,
                    playerBankroll: state.playerBankroll + currentBet,
                }
            } else if (dealerScore > playerScore) {
                status = {
                    ...status,
                    netCredit: state.netCredit - currentBet,
                    playerBankroll: state.playerBankroll - currentBet,
                }
            } else {
                status = {
                    ...status,
                    playerBankroll: state.playerBankroll + currentBet
                }
            }
        }
        if (state.splitHand) {
            state.splitHands.forEach((hand, index) => {
                getProfit(index)
            })
        } else {
            getProfit()
        }
        dispatch({
            type: DETERMINE_WINNER,
            payload: { status }
        })
    }


    return (
        <GameContext.Provider value={
            {
                ...state,
                toggleSettingsMenu,
                toggleShoeEmptyMenu,
                toggleAddFundsMenu,
                setBet,
                resetSettings,
                setShoe,
                dealHands,
                setDealerInitial,
                setPlayerInitial,
                getBookMove,
                handleInsurance,
                handleEvenMoney,
                checkDealerBlackjack,
                drawCard,
                playerHit,
                playerDoubleDown,
                playerStay,
                dealerHit,
                playerSplit,
                playNextSplitHand,
                surrender,
                determineWinner,
                setSetting,
                addFunds,

            }
        }>
            { children }
        </GameContext.Provider>
    )
}

const useGameContext = () => useContext(GameContext)

export { GameProvider, useGameContext };