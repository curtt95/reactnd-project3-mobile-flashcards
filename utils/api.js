import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, formatDecks } from './decks'

export function fetchDecks() {
    //AsyncStorage.clear()
    //return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
        const data = JSON.parse(results)
        console.log(data)
        return data
    });

    /*return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(formatDecks)*/
}

export function submitDeck({ deck, key }) {
    return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({
        [key]: deck
    }))
}

export function submitCard({ deck, card }) {
    return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({
        [deck]: {
            name: deck,
            cards: deck.cards.concat(card)
        }
    }))
}