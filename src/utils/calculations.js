// function to convert to dollar format
const convertToUSD = (number) => {
    return  number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    })
}

const splitHands = (hand) => {
    const splitHands = [[hand[0]], [hand[1]]]

}

export { convertToUSD }