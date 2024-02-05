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
    DRAW_CARD,
    SET_PLAYER_TURN,
    DEALER_HIT,
    ADD_FUNDS,
    SPLIT_HANDS,
    PLAY_NEXT_SPLIT,
    SHOW_RESULTS,
    SET_DEALER_TURN,
    SHOW_BOOK_MOVE

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

    doubledHands: [false, false, false, false],

    hintShown: false,
    hint: "",
    feedback: {},
    feedbackShown: false,
    feedbackText: "",
    actionTaken: "",
    bookMove: "",

    dealerCardShown: false,
    resultsShown: false,
    numHandsPlayed: 0,
    currentHandIndex: 0,
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
    // handles complete initial deal before any user input is needed
    // -resets values, deals first 2 cards to player and dealer,
    // checks blackjacks(asks for insurance if available)
    // if blackjacks are found, results will be displayed, and user will be able to place bet and deal next hand
    const dealHands = () => {
        let status = {
            placeBetOption: false,
            resultsShown: false,
            dealerCardShown: false,

            doubledHands: [false, false, false, false],
            splitHand: false,
            surrenderTaken: false,
            insuranceTaken: false,
            evenMoneyTaken: false,

            currentHandIndex: 0,

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
        playerHands.push(currentPlayerHand)
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
        let currentPlayerHand = [...state.currentPlayerHand]
        const playerHands = [...state.playerHands]
        let currentHandIndex = state.currentHandIndex
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
        playerHands[currentHandIndex] = [...currentPlayerHand]
        const bookMove = getBookMove(currentPlayerHand)

        let status = {
            bookMove: bookMove,
            currentPlayerHand: currentPlayerHand,
            playerHands: playerHands
        }

        if (score < 21) {
            dispatch({
                type: SET_PLAYER_TURN,
                payload: { status }
            })
            return
        }

        // if current index is not last index, it is a split hand which needs to be finished
        if (currentHandIndex + 1 < playerHands.length) {
            currentHandIndex++
            playerHands[currentHandIndex].push(drawCard())
            currentPlayerHand = [...playerHands[currentHandIndex]]
            dispatch({
                type: PLAY_NEXT_SPLIT,
                payload: {
                    currentPlayerHand: currentPlayerHand,
                    playerHands: playerHands,
                    currentHandIndex: currentHandIndex
                }
            })
            return
        }
        dispatch({
            type: SET_DEALER_TURN,
            payload: { status }
        })
    }

    const playerDoubleDown = () => {
        showBookMove("double")
        let currentPlayerHand = [...state.currentPlayerHand]
        const playerHands = [...state.playerHands]
        let currentHandIndex = state.currentHandIndex
        const doubledHands = [...state.doubledHands]
        doubledHands[currentHandIndex] = true
        console.log(doubledHands)
        currentPlayerHand.push(drawCard())
        let score = currentPlayerHand.reduce((acc, card) => acc + card.value, 0)
        const aceValue11Index = currentPlayerHand.findIndex(card => card.rank === "Ace" && card.value === 11)
        if (score > 21 && aceValue11Index !== -1) {
            currentPlayerHand[aceValue11Index] = {
                ...currentPlayerHand[aceValue11Index],
                value: 1
            }
        }
        playerHands[currentHandIndex] = [...currentPlayerHand]
        const bookMove = getBookMove(currentPlayerHand)

        let status = {
            bookMove: bookMove,
            playerBankroll: state.playerBankroll - state.netDebit,
            netDebit: state.netDebit - state.netDebit,
            playerTurn: false,
            currentPlayerHand: currentPlayerHand,
            playerHands: playerHands,
            doubledHands: doubledHands
        }
        // if current index is not last index, it is a split hand which needs to be finished
        if (currentHandIndex + 1 < playerHands.length) {
            currentHandIndex++
            playerHands[currentHandIndex].push(drawCard())
            currentPlayerHand = [...playerHands[currentHandIndex]]
            dispatch({
                type: PLAY_NEXT_SPLIT,
                payload: {
                    currentPlayerHand: currentPlayerHand,
                    playerHands: playerHands,
                    currentHandIndex: currentHandIndex
                }
            })
            return
        }
        dispatch({
            type: SET_DEALER_TURN,
            payload: { status }
        })
    }

    const playerStay = () => {
        showBookMove("stay")
        let currentHandIndex = state.currentHandIndex
        const playerHands = [...state.playerHands]
        let currentPlayerHand = [...state.currentPlayerHand]
        if (currentHandIndex + 1 < playerHands.length) {
            playerHands[state.currentHandIndex + 1].push(drawCard())
            const bookMove = getBookMove(playerHands[state.currentHandIndex + 1])
            dispatch({
                type: PLAY_NEXT_SPLIT,
                payload: { playerHands, bookMove }
            })
            return
        }
        dispatch({ type: SET_DEALER_TURN })
    }

    const surrender = () => {
        showBookMove("surrender")
        let status = {
            netDebit: state.netDebit - state.netDebit * 0.5,
            playerBankroll: state.playerBankroll - state.netDebit * 0.5
        }
        const playerHands = [...state.playerHands]

        if (state.currentHandIndex + 1 < playerHands.length) {
            playerHands[state.currentHandIndex + 1].push(drawCard())
            const bookMove = getBookMove(playerHands[state.currentHandIndex + 1])
            dispatch({
                type: PLAY_NEXT_SPLIT,
                payload: { ...status, playerHands, bookMove }
            })
            return
        }
        dispatch({
            type: SHOW_RESULTS,
            payload: { status }
        })
    }

    const showBookMove = (actionTaken) => {
        const feedback = actionTaken === state.bookMove ?
          { title: "Good Move!", position: "top", status: "success", duration: 1000 }
            :
          { title: `The correct play was to ${state.bookMove}.`, position: "top", status: "warning", duration: 1000 }
        dispatch({
            type: SHOW_BOOK_MOVE, payload: { feedback }
        })
    }

    const splitHand = () => {
        showBookMove("split")
        const playerHands = [...state.playerHands]
        const currentHandIndex = state.currentHandIndex
        // If two aces, since we changed the first Ace value to 1 on the initial deal, should be changed back to 11 for split hand
        if (playerHands[currentHandIndex][0].value === 1 && playerHands[currentHandIndex][1].value === 11) {
            playerHands[currentHandIndex][0] = { ...playerHands[currentHandIndex][0], value: 11 }
        }
        // make new hand by popping card from last hand of array (if only one hand, will be the first hand)
        const newHand = [playerHands[currentHandIndex].pop()]
        // current hand is the hand which we just popped a card from (original hand)
        const currentPlayerHand = playerHands[currentHandIndex]
        // both current hand and new hand should only have one card each; push new hand into array of hands
        playerHands.push(newHand)
        // draw first card for first split hand
        currentPlayerHand.push(drawCard())
        // if both player's cards are aces, make the first value === 1
        if (currentPlayerHand[0].value === 11 && currentPlayerHand[1].value === 11) {
            currentPlayerHand[0].value = 1
        }

        const bookMove = getBookMove(currentPlayerHand)
        dispatch({
            type: SPLIT_HANDS,
            payload: {
                playerHands: playerHands,
                currentPlayerHand: currentPlayerHand,
                currentHandIndex: currentHandIndex,
                bookMove: bookMove,
            }
        })
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

    const getResults = () => {
        const playerHands = state.playerHands
        const dealerScore = state.dealerHand.reduce((acc, card) => acc + card.value, 0)

        playerHands.forEach(hand => {
            const playerScoreHand = hand.reduce((acc, card) => acc + card.value, 0)
            let status = {}
            if (playerScoreHand <= 21) {
                if (dealerScore > 21 || playerScoreHand > dealerScore) {
                    status = {
                        ...status,
                        netCredit: state.netDebit,
                        playerBankroll: state.playerBankroll + state.netDebit + state.netCredit,
                    }
                }
            }
            dispatch({
                type: SHOW_RESULTS,
                payload: { status }
            })
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
                getBookMove,
                handleInsurance,
                handleEvenMoney,
                checkDealerBlackjack,
                drawCard,
                playerHit,
                playerDoubleDown,
                playerStay,
                dealerHit,
                surrender,
                getResults,
                setSetting,
                addFunds,
                splitHand

            }
        }>
            { children }
        </GameContext.Provider>
    )
}

const useGameContext = () => useContext(GameContext)

export { GameProvider, useGameContext };