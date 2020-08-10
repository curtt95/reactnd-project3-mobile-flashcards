import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, REMOVE_DECK } from '../actions'

function decks(state = {}, action) {
    switch(action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            }
        case ADD_CARD:
            return {
                ...state,
                [action.deck.name]: {
                    name: action.deck.name,
                    cards: action.deck.cards.concat(action.card)
                }
            }
        case REMOVE_DECK:
            return {
                ...state,
                [action.deck.name]: undefined
            }
        default:
            return state
    }
}

export default decks