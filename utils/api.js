import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks'

export function fetchDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
        const data = JSON.parse(results)
        return data
    });
}

export function submitDeck({ deck, key }) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [key]: deck
    }))
}

export function submitCard({ deck, card }) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
        const decks = JSON.parse(results)

        decks[deck.name] = {
            ...decks[deck.name],
            cards: decks[deck.name].cards.concat(card)
        }

        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
    });
}

export function submitRemoveDeck({ deck }) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
        const decks = JSON.parse(results)
        decks[deck.name] = undefined
        delete decks[deck.name]

        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
    });
}