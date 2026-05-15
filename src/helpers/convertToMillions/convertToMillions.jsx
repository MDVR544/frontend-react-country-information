

function ConvertToMillions(amount){
    const convertedToMillions = amount / 1000000;
    return Math.round(convertedToMillions);
}

export default ConvertToMillions