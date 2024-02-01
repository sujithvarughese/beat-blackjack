import {
    SET_STATE,
    SET_SHOW_SETTINGS_MENU,
    SET_SETTING,
    RESET_SETTINGS,
    SET_BET,
    SET_SHOE,
    DEAL_HANDS,
    DRAW_CARD,
    HANDLE_DEALER_ACE,
    DEALER_BLACKJACK,
    PLAYER_BLACKJACK,
    HANDLE_INSURANCE,
    HANDLE_EVEN_MONEY,
    PLAYER_HIT,
    PLAYER_DOUBLE_DOWN,
    PLAYER_STAY,
    DEALER_HIT,
    DETERMINE_WINNER,
    ADD_FUNDS,
    SHOW_ADD_FUNDS
} from "./game-actions.js"
const gameReducer = (state, action) => {

    if (action.type === SET_STATE) {
        return {
            ...state,
            ...action.payload.status
        }
    }

    if (action.type === SET_SHOW_SETTINGS_MENU) {
        return {
            ...state,
            settingsMenuOpen: action.payload.bool,
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
            currentBet: action.payload.bet
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
    if (action.type === SHOW_ADD_FUNDS) {
        return {
            ...state,
            addFundsShown: true
        }
    }
    if (action.type === ADD_FUNDS) {
        return {
            ...state,
            playerBankroll: action.payload.playerBankroll,
            addFundsShown: false
        }
    }
}

export default gameReducer