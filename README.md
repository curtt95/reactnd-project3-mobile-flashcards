# Mobile Flashcards Project - Curtis Thompson

This is my submission for project 3 of my React Nanodegree - Mobile Flashcards. Mobile Flashcards is a study app that contains various topics/decks that the user can add and quiz themselves against the answers.

## TL;DR

To get started developing right away:

- install all project dependencies with `npm install`
- start the development server with `npm start`

## What You're Getting

```bash
├── README.md - This file.
├── package.json # npm package manager file
├── App.js # The root of the application
├── actions
│   └── index.js # actions for the app
├── components
│   ├── AddCard.js # Add a card
│   ├── AddDeck.js # Add a deck
│   ├── Deck.js # Deck details
│   ├── Decks.js # List of all decks
│   ├── Quiz.js # Quiz component
│   └── SubmitButton.js # Submit Button component
├── reducers
│   └── index.js # The reducer file
├── utils
│   ├── _helpers.js # helper functions
│   ├── api.js # api file
│   └── colors.js # store the colors in the project

## Data

There is one type of objects stored in our database:

* Decks

### Decks

Decks include:

| Attribute         | Type             | Description
|-------------------|------------------|-------------------
| name              | String           | The deck name
| cards             | Array            | A list of ids of the polling questions this user created

## Tests

| Platform          | Device                        | Tested
|-------------------|-------------------------------|-------------------
| Android           | Huawei P20 Pro (Android 10)   |  ✅
| iOS               | -                             |   X
```
