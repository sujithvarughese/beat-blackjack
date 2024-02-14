## Beat Blackjack

Blackjack rules vary in different venues. This app was designed to allow the user to tweak each rule to see which 
conditions players have the largest edge, and which are most disadvantageous. 

Any settings can be changed and will go in effect immediately.
Win/loss percentage and ROI updates after each hand.
User can choose to replay a shoe or start a new one when a shoe is complete.
User can add onto the bankroll any time the funds go under the required amount.

### Settings
Decks: Number of decks used
MinBet: Minimum bet per hand
MaxBet: Maximum bet per hand
Bankroll: Player starting amount
Splits: Number of times a single hand can be split if same value cards is dealt
Dealer hit Soft 17: If dealer makes 17 with an Ace that has not been reduced to 1, dealer must hit
Insurance Available: If dealer has an Ace as the face up card, player has option to insure half the wagered amount
Even Money available: If dealer has Ace showing while player has blackjack, player has option to take even money 
before dealer checks hidden card
Live Feedback: An alert will display after each move whether the correct play was made
Hints: Player has option to get the correct play before deciding on a move
Blackjack Payout: The amount bonus player is awarded on blackjack (excluding when dealer simultaneously has blackjack)

Dev notes: 
Table.jsx serves/conditionally renders all components.
Logic is primarily in GameContext.jsx.
### Gameflow:
1. When settings are confirmed, shoe is set with number of decks indicated by player (Note: Each setting is updated in 
   state instantly on change to allow player to return to settings menu and change settings during gameplay)
2. User is given option to place bet and deal the hand.
3. When bet is confirmed and deal is initiated, cards are popped from shoe and dealt accordingly. All scenarios of 
   possible blackjacks are immediately checked. If dealer had Ace showing, insurance will be offered if allowed. If 
   no insurance or even money options, dealer will check for blackjack, then check for player blackjack. All bonuses 
4. paid immediately if needed, and hands are forfeited on dealer blackjack. In those situations, dealer hidden card 
   is exposed and all wagers are settled and results will be displayed.
5. If no blackjacks, player is given options based on chosen settings. Doubles are always allowed anytime player has 
   two cards in a hand. Splits are offered up to 3 times (or based on user settings). A hint button will be 
   displayed, that user can click to see the correct play. (actions determined using players hand and dealer's 
   face up card, taking into consideration soft aces if needed in file determineBookMove.js. File consists of simple 
   if...then statements but can consider updating using actual expected value figures to provide user with more 
   useful data)
   * Player.jsx will render player hand and initiate toast function when feedback state value is updated
   * Ran into issues with key when rendering hand array as multiple cards will be same value when using multiple 
     decks, and index value cannot be created in map function as the order of player hand arrays can change in split 
     hand scenarios. Unique id can be created on initial shoe creation, but for now I just used random numbers for 
     key values.
   * Player's hand is 2d array (was the simplest solution I found during split hands; normal hands player hand will 
     just be at index 0.)
6. Player actions
   * If player busts, dealer face down card is exposed, results are shown, and player is given option to place bet and 
   deal next hand
   * If player stays, dealer turn is initiated
   * If hits, card is drawn and added to player hand array and player is given appropriate actions
7. In case of showdowns, dealer hidden card is exposed once player action are complete.
8. Dealer.jsx -> useEffect run when dealerCardShown changes (when dealer turn begins) and whenever dealer hand 
   changes (every time dealer hits)
9. Dealer score is updated on each hit, and dealer action are handled appropriately based on score and settings
10. Once dealer action is complete, results are shown, bets are properly distributed, and player is given option to 
    place bet and deal next hand

* useEffect in PlaceBet.jsx (mounted every time canPlaceBet option is true) checks that shoe.length is greater than 15 and player bankroll and greater than minimum bet. Menus are displayed appropriately.
* useEffect in Stats.jsx runs every time number of hands played changes(updated when results displayed).
  Stats has local stats state to keep track of roi, profits/losses, and average bet size. Uses global state variables of player's current bet and amount player wagered and amount player received to calculate its local state variables 