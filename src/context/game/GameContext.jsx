import {createContext, useContext, useReducer} from "react";
import gameReducer from "./game-reducer.js";
import { createShoe } from '../../utils/deck.js'
import determineBookMove from '../../utils/determineBookMove.js'
import {
    SET_STATE,
    SET_SHOW_SETTINGS_MENU,
    SET_SETTING,
    RESET_SETTINGS,
    SET_SHOE,
    SET_BET,
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
    SHOW_ADD_FUNDS,
    SHOW_SHOE_EMPTY_ALERT
} from './game-actions.js'
import currentBet from '../../components/CurrentBet.jsx'

const GameContext = createContext()

const initialState = {
    settingsMenuOpen: true,

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
    currentBet: 0,
    playerHand: [],
    dealerHand: [],
    dealerFaceUpValue: 0,
    playerBankroll: 0,

    playerBlackjack: false,
    dealerBlackjack: false,
    dealer21: false, // if dealer has 10 showing with Ace under

    playerTurn: false,
    dealerTurn: false,

    doubledHand: false,
    splitHand: false,
    surrenderTaken: false,
    insuranceTaken: false,
    evenMoneyTaken: false,

    dealOption: false,
    addFundsOption: false,
    placeBetOption: false,
    hitOption: false,
    stayOption: false,
    doubleDownOption: false,
    splitOption: false,
    insuranceOption: false,
    surrenderOption: false,
    evenMoneyOption: false,
    hintOption: false,

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

    addFundsShown: false,
    shoeEmptyShown: false,
    dealerCardShown: false,
    resultsShown: false,
    winner: 0,
    netProfit: 0
}

const GameProvider = ({ children }) => {


    const [state, dispatch] = useReducer(gameReducer, initialState)

    const setShowSettingsMenu = (bool) => {
        dispatch({
            type: SET_SHOW_SETTINGS_MENU,
            payload: { bool }
        })
    }

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
    const showAddFunds = () => {
        dispatch({
            type: SHOW_ADD_FUNDS,
        })
    }
    const showShoeEmptyAlert = () => {
        dispatch({
            type: SHOW_SHOE_EMPTY_ALERT
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
            playerBlackjack: false,
            dealerBlackjack: false,
            deal: false,
            playerTurn: false,
            dealerTurn: false,
            doubledHand: false,
            splitHand: false,
            surrenderTaken: false,
            insuranceTaken: false,
            evenMoneyTaken: false,
            dealOption: false,
            addFundsOption: false,
            hitOption: false,
            stayOption: false,
            doubleDownOption: false,
            splitOption: false,
            insuranceOption: false,
            surrenderOption: false,
            evenMoneyOption: false,
            hintOption: false,
            settingsMenuOpen: false,
            placeBetOption: true,
            shoeEmptyShown: false,
            hintShown: false,
            hint: "",
            feedbackShown: false,
            feedbackText: "",
            handFinished: false,
            dealerCardShown: false,
            resultsShown: false,
            winner: 0,

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
            showFeedback: false,
            placeBetOption: false,
            resultsShown: false,
            dealerCardShown: false,
            doubledHand: false,
            splitHand: false,
            surrenderTaken: false,
            insuranceTaken: false,
            evenMoneyTaken: false,
            insuranceOption: false,
            evenMoneyOption: false,

            playerBankroll: state.playerBankroll - state.bet,
            currentBet: state.bet,
            netProfit: 0,

            splitCount: 0,
            totalSplits: 0,
            splitHands: [],
            splitDoubledHands: [],
            bookMove: ""
        }
        const playerHand = []
        const dealerHand = []
        let playerBlackjack = false
        let dealerBlackjack = false
        let dealer21 = false
        playerHand.push(drawCard())
        dealerHand.push(drawCard())
        playerHand.push(drawCard())
        dealerHand.push(drawCard())
        const hint = getBookMove(playerHand)

        // if dealer has blackjack or 21 with Ace under (action goes differently for each)
        if (dealerHand[0].value === 11 && dealerHand[1] === 10) {
            dealerBlackjack = true
        } else if (dealerHand[0].value === 10 && dealerHand[1] === 11){
            dealer21 = true
        }
        // if player has blackjack
        if (playerHand.reduce((acc, card) => acc + card.value, 0) === 21) {
            playerBlackjack = true
        }
        // if both player's cards are aces, make the first value === 1
        if (playerHand[0].value === 11 && playerHand[1].value === 11) {
            playerHand[0].value = 1
        }
        // dealer's face up card to see if insurance or even money should be offered
        const dealerFaceUpValue = dealerHand[0].value

        status = {
            ...status,
            hint: hint,
            dealerHand: dealerHand,
            playerHand: playerHand,
            playerBlackjack: playerBlackjack,
            dealerBlackjack: dealerBlackjack,
            dealer21: dealer21,
            dealerFaceUpValue: dealerFaceUpValue,
        }

        // if insurance or even money offered, set state and break from function to give user option
        if (dealerFaceUpValue === 11 && (state.settings.evenMoneyAllowed || state.settings.insuranceAllowed)) {
            if (playerBlackjack) {
                status = {
                    ...status,
                    evenMoneyOption: state.settings.evenMoneyAllowed,
                    playerTurn: true
                }
            } else {
                status = {
                    ...status,
                    insuranceOption: state.settings.insuranceAllowed,
                    playerTurn: true
                }
            }
            dispatch({
                type: SET_STATE,
                payload: { status }
            })
        }
        else if (dealer21) {
            if (playerBlackjack) {
                status = {
                    ...status,
                    playerBankroll: state.playerBankroll, // overwrite where we deducted one bet
                    netProfit: 0,
                    resultsShown: true,
                    dealerCardShown: true,
                    placeBetOption: true
                }
            } else {
                status = {
                    ...status,
                    netProfit: -currentBet,
                    resultsShown: true,
                    dealerCardShown: true,
                    placeBetOption: true
                }
            }
            dispatch({
                type: SET_STATE,
                payload: { status }
            })
        }

        // handle blackjacks (only reaches if insurance and even money are not allowed)
        else if (dealerBlackjack) {
            status = {
                ...status,
                netProfit: -currentBet,
                resultsShown: true,
                dealerCardShown: true,
                placeBetOption: true,
            }
            dispatch({
                type: SET_STATE,
                payload: { status }
            })
        }
        else if (playerBlackjack) {
            status = {
                ...status,
                resultsShown: true,
                dealerCardShown: true,
                playerBlackjack: true,
                netProfit: currentBet * state.blackjackPayout,
                playerBankroll: state.playerBankroll + currentBet * Number(state.blackjackPayout),
                placeBetOption: true,
            }
            dispatch({
                type: SET_STATE,
                payload: { status }
            })
        }
        else {
            status = {
                ...status,
                playerTurn: true,
                hitOption: true,
                stayOption: true,
                doubleDownOption: true,
                // because we changed the ace value to 1 if both hold cards are aces
                splitOption: (playerHand[0].value === playerHand[1].value || (playerHand[0].value === 1 && playerHand[1].value === 11)) && state.settings.maxNumSplits > 0,
                surrenderOption: state.settings.surrenderAllowed,
                hintOption: state.settings.hints
            }
            dispatch({
                type: SET_STATE,
                payload: { status }
            })
        }
    }

    const handleEvenMoney = () => {
        const status = {
            winner: 1,
            playerBankroll:  state.playerBankroll + state.currentBet + state.currentBet,
            netProfit: state.currentBet,
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
                playerBankroll: state.playerBankroll + state.currentBet,
                netProfit: 0,
                winner: 0,
                resultsShown: true,
                dealerCardShown: true,
                dealerBlackjack: true,
                placeBetOption: true,
                insuranceOption: false,
            }
        } else {
            status = {
                playerBankroll: state.playerBankroll - state.currentBet * 0.5,
                playerTurn: true,
                hitOption: true,
                stayOption: true,
                doubleDownOption: true,
                hintOption: true,
                splitOption: state.playerHand[0].value === state.playerHand[1].value && state.settings.maxNumSplits > 0,
                surrenderOption: state.surrenderAllowed,
                insuranceOption: false,

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
                netProfit: -state.currentBet,
                placeBetOption: true,
            }
        } else {
            status = {
                ...status,
                playerTurn: true,
                hitOption: true,
                stayOption: true,
                doubleDownOption: true,
                splitOption: state.playerHand[0].value === state.playerHand[1].value && state.settings.maxNumSplits > 0,
                hintOption: true,
                surrenderOption: state.surrenderAllowed,
            }
        }
        dispatch({
            type: SET_STATE,
            payload: { status }
        })
    }

    const getBookMove = (hand = state.playerHand) => {
        let playerAce11 = false
        let score = hand.reduce((acc, card) => acc + card.value, 0)
        const aceValue11Index = hand.findIndex(card => card.rank === "Ace" && card.value === 11)
        if (aceValue11Index !== -1) {
            playerAce11 = true
        }
        return determineBookMove(playerAce11, state.dealerFaceUpValue, score, hand, state.settings.maxNumSplits > 0)
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
            showFeedback: state.settings.feedback,
            doubleDownOption: false,
            splitOption: false,
            surrenderOption: false,
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
                    hitOption: false,
                    stayOption: false,
                    hintOption: false,
                    playerTurn: false,
                    dealerTurn: true,
                    dealerCardShown: true
                }
            } else if (score > 21) {
                status = {
                    ...status,
                    hitOption: false,
                    stayOption: false,
                    hintOption: false,
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
            showFeedback: state.settings.feedback,
            playerBankroll: state.playerBankroll - state.bet,
            currentBet: state.bet * 2,
            doubledHand: true,
            hitOption: false,
            stayOption: false,
            doubleDownOption: false,
            surrenderOption: false,
            hintOption: false,
            playerHand: playerHand
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
                placeBetOption: state.shoe.length > 12,
                shoeEmptyShown: state.shoe.length <= 12,
                addFundsShown: state.playerBankroll < state.settings.minBet,
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
            showFeedback: state.settings.feedback,
            hitOption: false,
            stayOption: false,
            doubleDownOption: false,
            surrenderOption: false,
            hintOption: false,
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
                placeBetOption: state.shoe.length > 12,
                shoeEmptyShown: state.shoe.length <= 12,
                addFundsShown: state.playerBankroll < state.settings.minBet,
                resultsShown: true
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
            showFeedback: state.settings.feedback,
            playerBankroll: state.playerBankroll + state.bet * 0.5,
            netProfit: -state.bet * 0.5,
            hitOption: false,
            stayOption: false,
            doubleDownOption: false,
            surrenderOption: false,
            hintOption: false,
            placeBetOption: state.shoe.length > 12,
            shoeEmptyShown: state.shoe.length <= 12,
            addFundsShown: state.playerBankroll < state.settings.minBet
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
            showFeedback: state.settings.feedback,
            playerTurn: true,
            hitOption: true,
            stayOption: true,
            doubleDownOption: true,
            splitOption: playerHand.length === 2 && playerHand[0] === playerHand[1], // if new card we just drew is equal to original split card
            hintOption: true,
            surrenderOption: state.surrenderAllowed,
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
                hitOption: true,
                stayOption: true,
                doubleDownOption: true,
                splitOption: playerHand[0] === playerHand[1],
                hintOption: true,
                surrenderOption: state.surrenderAllowed,
            }
            dispatch({
                type: "SPLIT",
                payload: { status }
            })
        }
        else {
            const status = {
                playerTurn: false,
                hitOption: false,
                stayOption: false,
                doubleDownOption: false,
                splitOption: false,
                hintOption: false,
                surrenderOption: false,
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
        let netProfit = 0
        let status = {
            dealerTurn: false,
            resultsShown: true,
            placeBetOption: state.shoe.length > 12,
            shoeEmptyShown: state.shoe.length <= 12,
            addFundsShown: state.playerBankroll < state.settings.minBet
        }
        const getProfit = () => {
            const playerScore = state.playerHand.reduce((acc, card) => acc + card.value, 0)
            const dealerScore = state.dealerHand.reduce((acc, card) => acc + card.value, 0)
            if (dealerScore > 21 || playerScore > dealerScore) {
                netProfit += currentBet * 2
                status = {
                    ...status,
                    playerBankroll: state.doubledHand ? state.playerBankroll + state.bet * 4 : state.playerBankroll + state.bet * 2,
                    winner: 1,
                }
            } else if (dealerScore > playerScore) {
                status = {
                    ...status,
                    winner: -1
                }
            } else {
                netProfit += currentBet
                status = {
                    ...status,
                    winner: 0,
                    playerBankroll: state.playerBankroll + state.bet
                }
            }
        }

        if (state.splitHand) {
            state.splitHands.forEach((hand, index) => {
                getProfit()
            })
        } else {
            getProfit()
        }
        status = { ...status, netProfit }
        dispatch({
            type: DETERMINE_WINNER,
            payload: { status }
        })
    }


    return (
        <GameContext.Provider value={
            {
                ...state,
                setShowSettingsMenu,
                setBet,
                resetSettings,
                setShoe,
                dealHands,
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
                showAddFunds,
                showShoeEmptyAlert
            }
        }>
            { children }
        </GameContext.Provider>
    )
}

const useGameContext = () => useContext(GameContext)

export { GameProvider, useGameContext };