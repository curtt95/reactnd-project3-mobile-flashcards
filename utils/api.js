import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY } from './decks'

export function fetchDecks() {
    //AsyncStorage.clear()
    //return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
        console.log(results)
        const data = JSON.parse(results);
        return data;
    });
}

export function submitDeck({ deck, key }) {
    return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({
        [key]: deck
    }))
}

export function submitCard({ deck, card, key }) {
    return AsyncStorage.setItem()
}