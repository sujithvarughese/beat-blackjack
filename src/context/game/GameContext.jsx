import {createContext, useContext, useReducer} from "react";
import gameReducer from "./game-reducer.js";
import { createShoe } from '../../utils/deck.js'
import determineBookMove from '../../utils/determineBookMove.js'
import {
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

} from './game-actions.js'
import currentBet from '../../components/CurrentBet.jsx'

const GameContext = createContext()

const initialState = {
    settingsMenuOpen: true,
    gameOpen: true,

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
    currentBet: 25,
    playerHand: [],
    dealerHand: [],
    splitHands: [],
    dealerFaceUp: 0,
    playerBankroll: 500,

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

    actionTaken: "",
    bookMove: "",

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

    splitCount: 0,
    shoeEmptyShown: false,
    hintShown: false,
    hint: "",
    feedbackShown: false,
    feedbackText: "",
    handFinished: false,
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

    // creates shoe using number of decks user selected, gives user option to change bet size and deal hands
    const setShoe = (sameShoe = false) => {
        const newShoe = sameShoe === true ? [...state.newShoe] : createShoe(state.settings.numDecks)
        console.log(newShoe)
        const status = {
            newShoe: newShoe,
            shoe: [...newShoe],
            playerBankroll: sameShoe ? state.playerBankroll : initialState.playerBankroll,
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

    const setBet = (bet) => {
        dispatch({
            type: SET_BET,
            payload: { bet }
        })
    }

    const addFunds = (reloadAmount) => {
        dispatch({
            type: ADD_FUNDS,
            payload: { reloadAmount }
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
        const playerHand = []
        const dealerHand = []
        let playerBlackjack = false
        let dealerBlackjack = false
        playerHand.push(drawCard())
        dealerHand.push(drawCard())
        playerHand.push(drawCard())
        dealerHand.push(drawCard())

        // if dealer has blackjack
        if (dealerHand.reduce((acc, card) => acc + card.value, 0) === 21) {
            dealerBlackjack = true
        }
        // if player has blackjack
        if (playerHand.reduce((acc, card) => acc + card.value, 0) === 21) {
            playerBlackjack = true
        }
        // if both player's cards are aces
        if (playerHand[0] === 11 && playerHand[1] === 11) {
            playerHand[0].value = 1
        }
        const bookMove = getBookMove(playerHand)
        // dealer's face up card to see if insurance or even money should be offered
        const dealerFaceUp = dealerHand[0].value

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
            surrenderOption: false,
            playerBankroll: state.playerBankroll - state.currentBet,
            netProfit: 0,
            splitCount: 0,
            dealerHand: dealerHand,
            playerHand: playerHand,
            dealerBlackjack: dealerBlackjack,
            playerBlackjack: playerBlackjack,
            dealerFaceUp: dealerFaceUp,
            bookMove: bookMove
        }

        // if insurance or even money offered, set state and break from function to give user option
        if (dealerFaceUp === 11 && (state.insuranceAllowed || state.evenMoneyAllowed)) {
            if (playerBlackjack) {
                status = {
                    ...status,
                    evenMoneyOption: state.evenMoneyAllowed,
                    playerTurn: true
                }
            } else {
                status = {
                    ...status,
                    insuranceOption: state.insuranceAllowed,
                    playerTurn: true
                }
            }
            dispatch({
                type: HANDLE_DEALER_ACE,
                payload: { status }
            })
        }
        // handle blackjacks, show hidden dealer card, and display results

        else if (dealerBlackjack) {
            const netProfit = currentBet * -1
            status = {
                ...status,
                winner: -1,
                resultsShown: true,
                dealerCardShown: true,
                dealerBlackjack: true,
                netProfit: netProfit,
                playerBankroll: state.playerBankroll - state.currentBet,
                placeBetOption: state.shoe.length > 12,
                shoeEmptyShown: state.shoe.length <= 12,
            }
            dispatch({
                type: DEALER_BLACKJACK,
                payload: { status }
            })
        }
        else if (playerBlackjack) {
            const netProfit = currentBet * state.blackjackPayout
            status = {
                ...status,
                winner: 1,
                resultsShown: true,
                dealerCardShown: true,
                playerBlackjack: true,
                netProfit: netProfit,
                playerBankroll: state.playerBankroll + currentBet * state.blackjackPayout,
                placeBetOption: state.shoe.length > 12,
                shoeEmptyShown: state.shoe.length <= 12,
            }
            dispatch({
                type: PLAYER_BLACKJACK,
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
                splitOption: true,
                hintOption: true,
                surrenderOption: state.surrenderAllowed,
            }
            dispatch({
                type: DEAL_HANDS,
                payload: { status }
            })
        }
    }

    const handleEvenMoney = () => {
        dispatch({
            type: PLAYER_BLACKJACK,
            payload: {
                winner: 1,
                playerBankroll:  state.playerBankroll + state.currentBet + state.currentBet,
                netProfit: state.currentBet,
                placeBetOption: state.shoe.length > 12,
                shoeEmptyShown: state.shoe.length <= 12,
                dealerCardShown: true,
                playerBlackjack: true,
                resultsShown: true
            }
        })
    }

    const checkDealerBlackjack = () => {
        let status = {}
        if (state.dealerBlackjack) {
            const netProfit = Number(currentBet) * -1
            status = {
                ...status,
                winner: -1,
                resultsShown: true,
                dealerCardShown: true,
                dealerBlackjack: true,
                netProfit: netProfit,
                playerBankroll: state.playerBankroll - currentBet,
                placeBetOption: state.shoe.length > 12,
                shoeEmptyAlert: state.shoe.length <= 12,
            }
            dispatch({
                type: DEALER_BLACKJACK,
                payload: { status }
            })
            return
        }
        status = {
            ...status,
            playerTurn: true,
            hitOption: true,
            stayOption: true,
            doubleDownOption: true,
            hintOption: true,
            surrenderOption: state.surrenderAllowed,
        }
        dispatch({
            type: DEAL_HANDS,
            payload: { status }
        })
    }

    const handleInsurance = () => {
        if (state.dealerBlackjack) {
            let playerBankroll = state.playerBankroll - Number(state.currentBet)/2;
            let netProfit
            if (state.playerBlackjack) {
                playerBankroll = state.playerBankroll + state.currentBet + state.currentBet
                netProfit = state.currentBet
            } else {
                playerBankroll = state.playerBankroll + state.currentBet
                netProfit = 0
            }
            dispatch({
                type: HANDLE_INSURANCE,
                payload: { playerBankroll, netProfit }
            })

        } else {

        }
        let status = {}
        status = {
            ...status,
            playerTurn: true,
            hitOption: true,
            stayOption: true,
            doubleDownOption: true,
            hintOption: true,
            surrenderOption: state.surrenderAllowed,
        }
        dispatch({
            type: DEAL_HANDS,
            payload: { status }
        })
    }


    const getBookMove = (hand = state.playerHand) => {
        let playerAce11 = false
        let score = hand.reduce((acc, card) => acc + card.value, 0)
        const aceValue11Index = hand.findIndex(card => card.rank === "Ace" && card.value === 11)
        if (score < 11 && aceValue11Index !== -1) {
            playerAce11 = true
        }
        return determineBookMove(playerAce11, state.dealerFaceUp, score, hand)
    }


    const playerHit = () => {
        const bookMove = getBookMove()
        const playerHand = state.splitHand ? [state.splitHands[state.splitCount]]: [...state.playerHand]
        playerHand.push(drawCard())
        let score = playerHand.reduce((acc, card) => acc + card.value, 0)
        const aceValue11Index = playerHand.findIndex(card => card.rank === "Ace" && card.value === 11)
        if (score > 21 && aceValue11Index !== -1) {
            playerHand[aceValue11Index].value = 1
            score -= 10
        }
        let status = {
            actionTaken: "hit",
            bookMove: bookMove,
            showFeedback: state.settings.feedback,
            doubleDownOption: false,
            surrenderOption: false,
            playerHand: playerHand
        }
        const splitHands = [...state.splitHands]
        splitHands[state.splitCount] = [...playerHand]
        if (state.splitHand) {
            status = {
                ...status,
                splitHands: splitHands
            }
        }
        if (score === 21) {
            status = {
                ...status,
                hitOption: false,
                stayOption: false,
                hintOption: false,
            }
            if (!state.splitHand) {
                status = {
                    ...status,
                    playerTurn: false,
                    dealerTurn: true,
                    dealerCardShown: true,
                }
            }
        } else if (score > 21) {
            status = {
                ...status,
                hitOption: false,
                stayOption: false,
                hintOption: false,

            }
            if (state.splitHand === true) {
                status = {
                    ...status,
                    splitCount: state.splitCount + 1
                }
            } else {
                status = {
                    ...status,
                    playerTurn: false,
                    dealerCardShown: true,
                    placeBetOption: state.shoe.length > 12,
                    shoeEmptyShown: state.shoe.length <= 12,
                    resultsShown: true
                }
            }
        }
        dispatch({
            type: PLAYER_HIT,
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
            playerTurn: false,
            dealerCardShown: true,
            hintOption: false,
            playerHand: playerHand
        }
        if (score > 21) {
            status = {
                ...status,
                placeBetOption: state.shoe.length > 12,
                shoeEmptyShown: state.shoe.length <= 12,
                resultsShown: true,
            }
        } else {
            status = {
                ...status,
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

        const status = {
            actionTaken: "stay",
            bookMove: bookMove,
            showFeedback: state.settings.feedback,
            hitOption: false,
            stayOption: false,
            doubleDownOption: false,
            surrenderOption: false,
            playerTurn: false,
            dealerTurn: true,
            dealerCardShown: true,
            hintOption: false,
        }
        dispatch({
            type: PLAYER_STAY,
            payload: { status }
        })
    }

    const playerSplit = () => {
        const splitHands = [[state.playerHand[0]], [state.playerHand[1]]]
        const newHand = state.playerHand[state.playerHand.length - 1]
        splitHands[state.splitCount].push(drawCard())
        const bookMove = getBookMove(splitHands[0])
        const status = {
            splitHands: splitHands,
            splitHand: true,
            splitCount: splitCount,
            playerBankroll: state.playerBankroll - state.bet,
            actionTaken: "split",
            bookMove: bookMove,
            showFeedback: state.settings.feedback,
            playerTurn: true,
            hitOption: true,
            stayOption: true,
            doubleDownOption: true,
            splitOption: true,
            hintOption: true,
            surrenderOption: state.surrenderAllowed,
        }
        dispatch({
            type: "SPLIT",
            payload: { status }
        })
    }

    const playNextSplitHand = () => {

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
        const playerScore = state.playerHand.reduce((acc, card) => acc + card.value, 0)
        const dealerScore = state.dealerHand.reduce((acc, card) => acc + card.value, 0)
        let status = {
            dealerTurn: false,
            resultsShown: true,
            placeBetOption: state.shoe.length > 12,
            shoeEmptyShown: state.shoe.length <= 12,
        }
        if (dealerScore > 21 || playerScore > dealerScore) {
            status = {
                ...status,
                playerBankroll: state.doubledHand ? state.playerBankroll + state.bet * 4 : state.playerBankroll + state.bet * 2,
                winner: 1
            }
        } else if (dealerScore > playerScore) {
            status = {
                ...status,
                winner: -1
            }
        } else {
          status = {
              ...status,
              winner: 0,
              playerBankroll: state.playerBankroll + state.bet
          }
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