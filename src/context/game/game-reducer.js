import {
    SET_STATE,
    TOGGLE_SETTINGS_MENU,
    SET_SETTING,
    RESET_SETTINGS,
    SET_BET,
    SET_SHOE,
    DEAL_HANDS,
    DRAW_CARD,
    HANDLE_DEALER_ACE,

    HANDLE_INSURANCE,
    HANDLE_EVEN_MONEY,
    PLAYER_HIT,
    PLAYER_DOUBLE_DOWN,
    PLAYER_STAY,
    DEALER_HIT,
    DETERMINE_WINNER,
    ADD_FUNDS,
    TOGGLE_ADD_FUNDS_MENU,
    TOGGLE_SHOE_EMPTY_MENU,
    SET_DEALER_INITIAL,
    SET_PLAYER_INITIAL,


    PLAYER_EVEN_MONEY_PAYOUT,
    PLAYER_INSURANCE_PAYOUT,
    PLAYER_WIN,
    DEALER_WIN,
    PLAYER_PUSH,
    DEALER_BLACKJACK,
    PLAYER_BLACKJACK,

    SHOW_RESULTS,
    SET_PLAYER_TURN,

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
            ...action.payload.status
        }
    }
    if (action.type === SET_BET) {
        return {
            ...state,
            bet: action.payload.bet,
        }
    }
    // remove bet amount from bankroll and set bet and bankroll in state
    if (action.type === DEAL_HANDS) {
        return {
            ...state,
            ...action.payload.status
        }
    }
    if (action.type === DRAW_CARD) {
        return {
            ...state,
            shoe: action.payload.shoe
        }
    }
    if (action.type === SET_DEALER_INITIAL) {
        return {
            ...state,
            dealerBlackjack: action.payload.dealerBlackjack,
            dealer21: action.payload.dealer21,
            dealerFaceUpValue: action.payload.dealerFaceUpValue
        }
    }
    if (action.type === SET_PLAYER_INITIAL) {
        return {
            ...state,
            playerBlackjack: action.payload.playerBlackjack,
            playerHand: action.payload.playerHand,
        }
    }
    if (action.type === HANDLE_DEALER_ACE) {
        return {
            ...state,
            ...action.payload.status
        }
    }
    if (action.type === HANDLE_EVEN_MONEY) {
        return {
            ...state,
            playerBankroll: action.payload.playerBankroll,
            netProfit: action.payload.netProfit,
            dealerCardShown: action.payload.dealerCardShown,
            resultsShown: action.payload.resultsShown,
            canPlaceBets: action.payload.canPlaceBets
        }
    }

    if (action.type === DEALER_BLACKJACK) {
        return {
            ...state,
            ...action.payload.status
        }
    }
    if (action.type === PLAYER_BLACKJACK) {
        return {
            ...state,
            ...action.payload.status
        }
    }
    if (action.type === HANDLE_INSURANCE) {
        return {
            ...state,
            ...action.payload.status
        }
    }
    if (action.type === PLAYER_HIT) {
        return {
            ...state,
            ...action.payload.status
        }
    }
    if (action.type === PLAYER_DOUBLE_DOWN) {
        return {
            ...state,
            ...action.payload.status
        }
    }
    if (action.type === PLAYER_STAY) {
        return {
            ...state,
            ...action.payload.status
        }
    }

    if (action.type === "SPLIT") {
        return {
            ...state,
            ...action.payload.status
        }
    }


    if (action.type === DEALER_HIT) {
        return {
            ...state,
            dealerHand: action.payload.dealerHand
        }
    }
    if (action.type === DETERMINE_WINNER) {
        return {
            ...state,
            ...action.payload.status
        }
    }

    if (action.type === ADD_FUNDS) {
        return {
            ...state,
            playerBankroll: action.payload.playerBankroll,
            addFundsShown: false
        }
    }


    if (action.type === PLAYER_EVEN_MONEY_PAYOUT) {
        return {
            ...state,
            resultsShown: true,
            dealerCardShown: true,
            placeBetOption: true,
            doubledHand: false,
            splitHand: false,
            surrenderTaken: false,
            insuranceTaken: false,
            evenMoneyTaken: false,

        }
    }


    if (action.type === PLAYER_INSURANCE_PAYOUT) {
        return {
            ...state,
            resultsShown: true,
            dealerCardShown: true,
            placeBetOption: true,
            insuranceTaken: true,
            playerBankroll: state.playerBankroll + state.netDebit,
            netCredit: state.netDebit
        }
    }
    if (action.type === DEALER_BLACKJACK) {
        return {
            ...state,
            resultsShown: true,
            dealerCardShown: true,
            placeBetOption: true,
            doubledHand: false,
            splitHand: false,
            surrenderTaken: false,
            insuranceTaken: false,
            evenMoneyTaken: false,
            ...action.payload.status
        }
    }
    if (action.type === PLAYER_BLACKJACK) {
        return {
            ...state,
            ...action.payload.status,
            resultsShown: true,
            dealerCardShown: true,
            placeBetOption: true,
            doubledHand: false,
            splitHand: false,
            surrenderTaken: false,
            insuranceTaken: false,
            evenMoneyTaken: false,

        }
    }
    if (action.type === PLAYER_WIN) {
        return {
            ...state,
            resultsShown: true,
            dealerCardShown: true,
            placeBetOption: true,
            doubledHand: false,
            splitHand: false,
            surrenderTaken: false,
            insuranceTaken: false,
            evenMoneyTaken: false,
            ...action.payload.status
        }
    }
    if (action.type === DEALER_WIN) {
        return {
            ...state,
            resultsShown: true,
            dealerCardShown: true,
            placeBetOption: true,
            doubledHand: false,
            splitHand: false,
            surrenderTaken: false,
            insuranceTaken: false,
            evenMoneyTaken: false,
            ...action.payload.status
        }
    }
    if (action.type === PLAYER_PUSH) {
        return {
            ...state,
            ...action.payload.status,
            resultsShown: true,
            dealerCardShown: true,
            placeBetOption: true,
            doubledHand: false,
            splitHand: false,
            surrenderTaken: false,
            insuranceTaken: false,
            evenMoneyTaken: false,

        }
    }
    if (action.type === PLAYER_PUSH) {
        return {
            ...state,
            ...action.payload.status,
            resultsShown: true,
            dealerCardShown: true,
            placeBetOption: true,

        }
    }
    if (action.type === SHOW_RESULTS) {
        return {
            ...state,
            ...action.payload.status,
            resultsShown: true,
            dealerCardShown: true,
            placeBetOption: true,
            numHandsPlayed: state.numHandsPlayed + 1
        }
    }

    if (action.type === SET_PLAYER_TURN) {
        return {
            ...state,
            ...action.payload.status,
            playerTurn: true,
        }
    }



}







export default gameReducer