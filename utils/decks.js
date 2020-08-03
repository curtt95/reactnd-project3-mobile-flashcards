export const DECKS_STORAGE_KEY = 'MobileFlashcards:decks'

export function formatDecks(results) {
    console.log("format")
    console.log(JSON.parse(results))

    return results === null ? null : results
}