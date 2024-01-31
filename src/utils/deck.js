const deck = [
    { rank: 'Ace', suit: 'clubs', value: 11, img: '/clubs_ace.svg' },
    { rank: '2', suit: 'clubs', value: 2, img: '/clubs_2.svg' },
    { rank: '3', suit: 'clubs', value: 3, img: '/clubs_3.svg' },
    { rank: '4', suit: 'clubs', value: 4, img: '/clubs_4.svg' },
    { rank: '5', suit: 'clubs', value: 5, img: '/clubs_5.svg' },
    { rank: '6', suit: 'clubs', value: 6, img: '/clubs_6.svg' },
    { rank: '7', suit: 'clubs', value: 7, img: '/clubs_7.svg' },
    { rank: '8', suit: 'clubs', value: 8, img: '/clubs_8.svg' },
    { rank: '9', suit: 'clubs', value: 9, img: '/clubs_9.svg' },
    { rank: '10', suit: 'clubs', value: 10, img: '/clubs_10.svg' },
    { rank: 'Jack', suit: 'clubs', value: 10, img: '/clubs_jack.svg' },
    { rank: 'Queen', suit: 'clubs', value: 10, img: '/clubs_queen.svg' },
    { rank: 'King', suit: 'clubs', value: 10, img: '/clubs_king.svg' },
    { rank: 'Ace', suit: 'diamonds', value: 11, img: '/diamonds_ace.svg' },
    { rank: '2', suit: 'diamonds', value: 2, img: '/diamonds_2.svg' },
    { rank: '3', suit: 'diamonds', value: 3, img: '/diamonds_3.svg' },
    { rank: '4', suit: 'diamonds', value: 4, img: '/diamonds_4.svg' },
    { rank: '5', suit: 'diamonds', value: 5, img: '/diamonds_5.svg' },
    { rank: '6', suit: 'diamonds', value: 6, img: '/diamonds_6.svg' },
    { rank: '7', suit: 'diamonds', value: 7, img: '/diamonds_7.svg' },
    { rank: '8', suit: 'diamonds', value: 8, img: '/diamonds_8.svg' },
    { rank: '9', suit: 'diamonds', value: 9, img: '/diamonds_9.svg' },
    { rank: '10', suit: 'diamonds', value: 10, img: '/diamonds_10.svg' },
    { rank: 'Jack', suit: 'diamonds', value: 10, img: '/diamonds_jack.svg' },
    { rank: 'Queen', suit: 'diamonds', value: 10, img: '/diamonds_queen.svg' },
    { rank: 'King', suit: 'diamonds', value: 10, img: '/diamonds_king.svg' },
    { rank: 'Ace', suit: 'hearts', value: 11, img: '/hearts_ace.svg' },
    { rank: '2', suit: 'hearts', value: 2, img: '/hearts_2.svg' },
    { rank: '3', suit: 'hearts', value: 3, img: '/hearts_3.svg' },
    { rank: '4', suit: 'hearts', value: 4, img: '/hearts_4.svg' },
    { rank: '5', suit: 'hearts', value: 5, img: '/hearts_5.svg' },
    { rank: '6', suit: 'hearts', value: 6, img: '/hearts_6.svg' },
    { rank: '7', suit: 'hearts', value: 7, img: '/hearts_7.svg' },
    { rank: '8', suit: 'hearts', value: 8, img: '/hearts_8.svg' },
    { rank: '9', suit: 'hearts', value: 9, img: '/hearts_9.svg' },
    { rank: '10', suit: 'hearts', value: 10, img: '/hearts_10.svg' },
    { rank: 'Jack', suit: 'hearts', value: 10, img: '/hearts_jack.svg' },
    { rank: 'Queen', suit: 'hearts', value: 10, img: '/hearts_queen.svg' },
    { rank: 'King', suit: 'hearts', value: 10, img: '/hearts_king.svg' },
    { rank: 'Ace', suit: 'spades', value: 11, img: '/spades_ace.svg' },
    { rank: '2', suit: 'spades', value: 2, img: '/spades_2.svg' },
    { rank: '3', suit: 'spades', value: 3, img: '/spades_3.svg' },
    { rank: '4', suit: 'spades', value: 4, img: '/spades_4.svg' },
    { rank: '5', suit: 'spades', value: 5, img: '/spades_5.svg' },
    { rank: '6', suit: 'spades', value: 6, img: '/spades_6.svg' },
    { rank: '7', suit: 'spades', value: 7, img: '/spades_7.svg' },
    { rank: '8', suit: 'spades', value: 8, img: '/spades_8.svg' },
    { rank: '9', suit: 'spades', value: 9, img: '/spades_9.svg' },
    { rank: '10', suit: 'spades', value: 10, img: '/spades_10.svg' },
    { rank: 'Jack', suit: 'spades', value: 10, img: '/spades_jack.svg' },
    { rank: 'Queen', suit: 'spades', value: 10, img: '/spades_queen.svg' },
    { rank: 'King', suit: 'spades', value: 10, img: '/spades_king.svg' }
]

// create shoe function creates and returns shoe
const createShoe = (numDecks = 1) => {
    // temp shoe array
    const shoe = []
    for (let i = 0; i < numDecks; i++) {
        // push full deck array to newShoe array
        shoe.push(...deck)
        // shuffle
        shoe.sort(() => Math.random() - 0.5)
    }
    // shuffle again once all decks added
    shoe.sort(() => Math.random() - 0.5)
    return shoe
}

export { createShoe, deck }