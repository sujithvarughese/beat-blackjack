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

} from './game-actions.js'

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
    playerHand: [],
    dealerHand: [],
    dealerFaceUpValue: 0,
    playerBankroll: 500,

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
    handWinLossAmount: 0,
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
    const setPlayerInitial = ({ playerBlackjack, playerHand, hint }) => {
        dispatch({
            type: SET_PLAYER_INITIAL,
            payload: { playerBlackjack, playerHand, hint }
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

            playerBankroll: state.playerBankroll - state.bet,
            handWinLossAmount: 0,

            splitCount: 0,
            totalSplits: 0,
            splitHands: [],
            splitDoubledHands: [],
            bookMove: ""
        }
        const playerHand = []
        const dealerHand = []
        let playerBlackjack = false

        playerHand.push(drawCard())
        dealerHand.push(drawCard())
        playerHand.push(drawCard())
        dealerHand.push(drawCard())


        const hint = getBookMove(playerHand, state.dealerFaceUpValue)
        status = {
            ...status,
            hint: hint,
            dealerHand: dealerHand,
            playerHand: playerHand,
            playerBlackjack: playerBlackjack,
        }
        // if insurance or even money offered, set state and break from function to give user option
        if (state.dealerFaceUpValue === 11 && (state.settings.evenMoneyAllowed || state.settings.insuranceAllowed)) {
            status = { ...status, insuranceOpen: true }
            dispatch({
                type: SET_STATE,
                payload: { status }
            })
            return
        }
        // dealer21 = dealer made 21 with A face down (no insurance)
        if (state.dealer21) {
            if (playerBlackjack) {
                status = {
                    ...status,
                    playerBankroll: state.playerBankroll, // overwrite where we deducted one bet
                    handWinLossAmount: 0,
                    numHandsPlayed: state.numHandsPlayed + 1,
                    resultsShown: true,
                    dealerCardShown: true,
                    placeBetOption: true
                }
            } else {
                status = {
                    ...status,
                    handWinLossAmount: state.bet * -1,
                    numHandsPlayed: state.numHandsPlayed + 1,
                    resultsShown: true,
                    dealerCardShown: true,
                    placeBetOption: true
                }
            }
            dispatch({
                type: SET_STATE,
                payload: { status }
            })
            return
        }

        // handle blackjacks (only reaches if insurance and even money are not allowed)
        if (state.dealerBlackjack) {
            status = {
                ...status,
                handWinLossAmount: state.handWinLossAmount + state.bet * -1,
                numHandsPlayed: state.numHandsPlayed + 1,
                resultsShown: true,
                dealerCardShown: true,
                placeBetOption: true,
            }
            dispatch({
                type: SET_STATE,
                payload: { status }
            })
            return
        }
        if (playerBlackjack) {
            status = {
                ...status,
                resultsShown: true,
                dealerCardShown: true,
                playerBlackjack: true,
                handWinLossAmount: state.handWinLossAmount + state.bet * Number(state.settings.blackjackPayout),
                numHandsPlayed: state.numHandsPlayed + 1,
                playerBankroll: state.playerBankroll + state.bet * Number(state.settings.blackjackPayout),
                placeBetOption: true,
            }
            dispatch({
                type: SET_STATE,
                payload: { status }
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
        console.log(state.dealerHand)
    }

    const handleEvenMoney = () => {
        const status = {
            playerBankroll:  state.playerBankroll + state.bet + state.bet,
            handWinLossAmount: state.bet,
            numHandsPlayed: state.numHandsPlayed + 1,
            placeBetOption: true,
            dealerCardShown: true,
            resultsShown: true
        }
        dispatch({
            type: SET_STATE,
            payload: { status }
        })
    }
    const handleInsurance = () => {
        let status = {}
        if (state.dealerBlackjack) {
            status = {
                playerBankroll: state.playerBankroll + state.bet,
                handWinLossAmount: 0,
                numHandsPlayed: state.numHandsPlayed + 1,
                resultsShown: true,
                dealerCardShown: true,
                placeBetOption: true,
            }
        } else {
            status = {
                playerBankroll: state.playerBankroll - state.bet * 0.5,
                handWinLossAmount: state.bet * 0.5 * -1,
                playerTurn: true,
            }
        }
        dispatch({
            type: SET_STATE,
            payload: { status }
        })
    }
    const checkDealerBlackjack = () => {
        let status = {}
        if (state.dealerBlackjack) {
            status = {
                resultsShown: true,
                dealerCardShown: true,
                dealerBlackjack: true,
                handWinLossAmount: state.handWinLossAmount - state.bet,
                numHandsPlayed: state.numHandsPlayed + 1,
                placeBetOption: true,
            }
        }  else if (state.playerBlackjack) {
            status = {
                resultsShown: true,
                dealerCardShown: true,
                playerBlackjack: true,
                handWinLossAmount: state.handWinLossAmount + state.bet * Number(state.settings.blackjackPayout),
                numHandsPlayed: state.numHandsPlayed + 1,
                playerBankroll: state.playerBankroll + state.bet + state.bet * Number(state.settings.blackjackPayout),
                placeBetOption: true,
            }
        }
        else {
            status = { ...status, playerTurn: true, }
        }
        dispatch({
            type: SET_STATE,
            payload: { status }
        })
    }

    const getBookMove = (hand = state.playerHand, dealerFaceUpValue = state.dealerFaceUpValue) => {
        let playerAce11 = false
        let score = hand.reduce((acc, card) => acc + card.value, 0)
        const aceValue11Index = hand.findIndex(card => card.rank === "Ace" && card.value === 11)
        if (aceValue11Index !== -1) {
            playerAce11 = true
        }
        return determineBookMove(playerAce11, dealerFaceUpValue, score, hand, state.settings.maxNumSplits > 0, state.settings.surrenderAllowed)
    }

    const playerHit = () => {
        const bookMove = getBookMove()
        const playerHand = [...state.playerHand]
        playerHand.push(drawCard())
        let score = playerHand.reduce((acc, card) => acc + card.value, 0)
        const hint = getBookMove(playerHand)
        const aceValue11Index = playerHand.findIndex(card => card.rank === "Ace" && card.value === 11)
        if (score > 21 && aceValue11Index !== -1) {
            playerHand[aceValue11Index].value = 1
            score -= 10
        }
        let status = {
            actionTaken: "hit",
            bookMove: bookMove,
            hint: hint,
            playerHand: playerHand
        }

        if (state.splitHand === true) {
            const splitHands = [...state.splitHands]
            splitHands[state.splitCount] = [...playerHand]
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
        const playerHand = [...state.playerHand]
        playerHand.push(drawCard())
        const aceValue11Index = playerHand.findIndex(card => card.rank === "Ace" && card.value === 11)
        let score = playerHand.reduce((acc, card) => acc + card.value, 0)
        if (score > 21 && aceValue11Index !== -1) {
            playerHand[aceValue11Index].value = 1
            score -= 10
        }
        let status = {
            actionTaken: "double down",
            bookMove: bookMove,
            playerBankroll: state.playerBankroll - state.bet,
            handWinLossAmount: state.handWinLossAmount - state.bet,
            doubledHand: true,
            playerTurn: false,
            playerHand: playerHand,
        }
        if (state.splitHand) {
            const splitHands = [...state.splitHands]
            splitHands[state.splitCount] = [...playerHand]
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
            handWinLossAmount: state.handWinLossAmount - state.bet * 0.5,
            numHandsPlayed: state.numHandsPlayed + 1,
            placeBetOption: true
        }
        dispatch({
            type: SET_STATE,
            payload: { status }
        })
    }

    const playerSplit = () => {
        // array that holds each split hand
        let splitHands = [...state.splitHands]
        // playerHand = 2 cards which will need to be split that make up the base of a split hand
        const playerHand = [...state.playerHand]
        // since we changed the Ace value to 1 on the initial deal, should be changed back to 11 for split hand
        if (playerHand[0].value === 1 && playerHand[1].value === 1) {
            playerHand[0].value = 11
        }
        const bookMove = getBookMove(state.playerHand.slice(state.playerHand.length - 2))
        // second of the split hands
        const newHand = [state.playerHand[state.playerHand.length - 1]]
        // if not first split, pop out newest hand as we will be adding it as playerHand with one card
        if (splitHands.length > 0) {
            splitHands.pop()
        }
        // remove the second card which is now in newHand array
        playerHand.pop()
        // draw first card for first split hand
        playerHand.push(drawCard())
        const hint = getBookMove(playerHand)
        // split hands array will contain previous split hands and both current split hands
        splitHands = [...splitHands, playerHand, newHand]
        const status = {
            splitHands: splitHands,
            playerHand: playerHand,
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
            // set playerHand to current working hand at index splitCount
            const playerHand = splitHands[state.splitCount]
            playerHand.push(drawCard())
            // set current player hand at index in splitHands array
            splitHands[state.splitCount] = playerHand
            const status = {
                splitHands: splitHands,
                playerHand: playerHand,
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
            const playerScore = state.playerHand.reduce((acc, card) => acc + card.value, 0)
            const dealerScore = state.dealerHand.reduce((acc, card) => acc + card.value, 0)
            let currentBet = state.bet

            if (state.doubledHand === true || state.splitDoubledHands[index] === true) {
                currentBet += state.bet
            }

            if (dealerScore > 21 || playerScore > dealerScore) {
                status = {
                    ...status,
                    handWinLossAmount: state.handWinLossAmount + currentBet,
                    playerBankroll: state.playerBankroll + currentBet,
                }
            } else if (dealerScore > playerScore) {
                status = {
                    ...status,
                    handWinLossAmount: state.handWinLossAmount - currentBet,
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