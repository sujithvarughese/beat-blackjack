const determineBookMove = (playerAce11, dealerFaceUp, playerScore, playerHand, splitsAllowed=true, surrenderAllowed=false) => {

  const hit = "hit"
  const stay = "stay"
  const double = "double down"
  const split = "split"
  const surrender = "surrender"

  if (!playerAce11) {
    if (playerScore >= 17) {
      return stay
    }
    else if (playerScore === 16 || playerScore === 15 || playerScore === 14 || playerScore === 13) {
      if (splitsAllowed) {
        if (playerScore === 16 && playerHand.length === 2 && playerHand[0].value === playerHand[1].value) {
          return split
        }
        else if (playerScore === 14 && playerHand.length === 2 && playerHand[0].value === playerHand[1].value && dealerFaceUp >= 4 && dealerFaceUp <=7)
          return split
      } else if (dealerFaceUp >= 2 && dealerFaceUp <= 6) {
        return stay
      } else {
        return hit
      }
    }
    else if (playerScore === 12) {
      if (splitsAllowed && playerScore === 12 && playerHand.length === 2 && playerHand[0].value === playerHand[1].value && dealerFaceUp >= 5 && dealerFaceUp <=6)
        return split
      else if (dealerFaceUp === 4 || dealerFaceUp === 5 || dealerFaceUp === 6) {
        return stay
      } else {
        return hit
      }
    }
    else if (playerScore === 11) {
      if (playerHand.length === 2) {
        return double
      } else {
        return hit
      }
    }
    else if (playerScore === 10) {
      if (playerHand.length === 2 && dealerFaceUp !== 10 && dealerFaceUp !== 11) {
        return double
      } else {
        return hit
      }
    }
    else if (playerScore === 9) {
      if (playerHand.length === 2 && dealerFaceUp >= 3 && dealerFaceUp <= 6) {
        return double
      } else {
        return hit
      }
    } else if ((splitsAllowed && playerScore === 6 || playerScore === 4) && playerHand.length === 2 && playerHand[0].value === playerHand[1].value && dealerFaceUp >= 4 && dealerFaceUp <=7) {
      return split
    } else {
      return hit
    }

    // hands with soft Ace
  } else {
    if (playerScore >= 19) {
      return stay
    }
    else if (playerScore === 18) {
      if (dealerFaceUp === 9 || dealerFaceUp === 10 || dealerFaceUp === 11) {
        return hit
      } else if (playerHand.length === 2 && dealerFaceUp !== 2 && dealerFaceUp !== 7 && dealerFaceUp !== 8) {
        return double
      } else {
        return stay
      }
    }
    else if (playerScore === 17) {
      if (playerHand.length === 2 && dealerFaceUp >= 3 && dealerFaceUp <= 6) {
        return double
      } else {
        return hit
      }
    }
    else if (playerScore === 16 || playerScore === 15) {
      if (playerHand.length === 2 && dealerFaceUp >= 4 && dealerFaceUp <= 6) {
        return double
      } else {
        return hit
      }
    }
    else if (playerScore === 14 || playerScore === 13) {
      if (playerHand.length === 2 && dealerFaceUp >= 5 && dealerFaceUp <= 6) {
        return double
      } else {
        return hit
      }
    }
  }
  return ""
}

export default determineBookMove