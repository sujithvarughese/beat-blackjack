const determineBookMove = (playerAce11, dealerFaceUp, playerScore, playerHand) => {

  const hit = "hit"
  const stay = "stay"
  const double = "double down"

  if (!playerAce11) {
    if (playerScore >= 17) {
      return stay
    }
    else if (playerScore === 16 || playerScore === 15 || playerScore === 14 || playerScore === 13) {
      if (dealerFaceUp >= 2 && dealerFaceUp <= 6) {
        return stay
      } else {
        return hit
      }
    }
    else if (playerScore === 12) {
      if (dealerFaceUp === 4 || dealerFaceUp === 5 || dealerFaceUp === 6) {
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
      if (playerHand.length > 2 || dealerFaceUp === 10 || dealerFaceUp === 11) {
        return hit
      } else {
        return double
      }
    }
    else if (playerScore === 9) {
      if (playerHand.length === 2 && dealerFaceUp >= 3 && dealerFaceUp <= 6) {
        return double
      } else {
        return hit
      }
    } else {
      return hit
    }
  } else {
    if (playerScore >= 19) {
      return stay
    }
    else if (playerScore === 18) {
      if (dealerFaceUp === 9 || dealerFaceUp === 10 || dealerFaceUp === 11) {
        return hit
      } else if (playerHand.length > 2 || dealerFaceUp === 2 || dealerFaceUp === 7 || dealerFaceUp === 8) {
        return stay
      } else {
        return double
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