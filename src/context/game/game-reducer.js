import {
    SET_STATE,
    TOGGLE_SETTINGS_MENU,
    SET_SETTING,
    RESET_SETTINGS,
    SET_BET,
    SET_SHOE,
    DRAW_CARD,
    DEALER_HIT,
    ADD_FUNDS,
    TOGGLE_ADD_FUNDS_MENU,
    TOGGLE_SHOE_EMPTY_MENU,
    SHOW_RESULTS,
    SET_PLAYER_TURN,
    SPLIT_HANDS,
    PLAY_NEXT_SPLIT,
    SET_DEALER_TURN,
    SHOW_BOOK_MOVE

} from './game-actions.js'
const gameReducer = (state, action) => {

    if (action.type === SET_STATE) {
        return {
            ...state,
            ...action.payload.status
        }
    }
    if (action.type === TOGGLE_SETTINGS_MENU) {
        return {
            ...state,
            settingsMenuOpen: !state.settingsMenuOpen,
        }
    }
    if (action.type === TOGGLE_SHOE_EMPTY_MENU) {
        return {
            ...state,
            shoeEmptyMenuOpen: !state.shoeEmptyMenuOpen
        }
    }
    if (action.type === TOGGLE_ADD_FUNDS_MENU) {
        return {
            ...state,
            addFundsMenuOpen: !state.addFundsMenuOpen
        }
    }
    if (action.type === SET_SETTING) {
        return {
            ...state,
            settings: {
                ...state.settings,
                ...action.payload.setting
            },
        }
    }
    if (action.type === RESET_SETTINGS) {
        return {
            ...state,
            settings: action.payload.settings,
        }
    }
    if (action.type === SET_SHOE) {
        return {
            ...state,
            ...action.payload.status,
            placeBetOption: true,
            settingsMenuOpen: false
        }
    }
    if (action.type === SET_BET) {
        return {
            ...state,
            bet: action.payload.bet,
        }
    }
    if (action.type === ADD_FUNDS) {
        return {
            ...state,
            playerBankroll: action.payload.playerBankroll,
            addFundsShown: false
        }
    }
    if (action.type === DRAW_CARD) {
        return {
            ...state,
            shoe: action.payload.shoe
        }
    }
    if (action.type === DEALER_HIT) {
        return {
            ...state,
            dealerHand: action.payload.dealerHand
        }
    }

    if (action.type === SET_PLAYER_TURN) {
        return {
            ...state,
            ...action.payload.status,
            playerTurn: true,
        }
    }
    if (action.type === SET_DEALER_TURN) {
        return {
            ...state,
            ...action.payload?.status,
            playerTurn: false,
            dealerTurn: true,
            dealerCardShown: true,
        }
    }
    if (action.type === SPLIT_HANDS) {
        return {
            ...state,
            playerHands: action.payload.playerHands,
            currentPlayerHand: action.payload.currentPlayerHand,
            currentHandIndex: action.payload.currentHandIndex,
            bookMove: action.payload.bookMove,
            netDebit: state.netDebit + state.netDebit,
            playerBankroll: state.playerBankroll - state.netDebit,
            playerTurn: true
        }
    }
    if (action.type === PLAY_NEXT_SPLIT) {

        return {
            ...state,
            ...action.payload.status,
            playerHands: action.payload?.playerHands,
            currentPlayerHand: action.payload.playerHands[state.currentHandIndex + 1],
            currentHandIndex: state.currentHandIndex + 1,
            bookMove: action.payload.bookMove,

        }
    }
    if (action.type === SHOW_RESULTS) {
        return {
            ...state,
            ...action.payload.status,
            resultsShown: true,
            dealerCardShown: true,
            placeBetOption: true,
            insuranceOpen: false,
            dealerTurn: false,
            playerTurn: false,
            numHandsPlayed: state.numHandsPlayed + 1,
        }
    }
    if (action.type === SHOW_BOOK_MOVE) {
        return {
            ...state,
            feedback: action.payload.feedback
        }
    }
}







export default gameReducer