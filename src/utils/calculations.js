// function to convert to dollar format
const convertToUSD = (number) => {
    return  number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    })
}

export { convertToUSD }