import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'MobileFlashcards:decks'

export function formatDecks(results) {
    console.log("results:")
    console.log(results)
    return results === null ? "test" : null
}