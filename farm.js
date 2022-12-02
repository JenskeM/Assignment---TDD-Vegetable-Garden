//1. Get the value of the yield
const getYieldForPlant = plant => {
    return plant.yield
}

//1. Get the yield for the crop
//2. Mutiply with the amount of crops
const getYieldForCrop = (vegie, factors) => {
    if (factors === undefined) {
        let yieldCrop = getYieldForPlant(vegie.crop);
        return yieldCrop * vegie.numCrops
    }
    let yieldCrop = getYieldForPlant(vegie.crop);
    let cropFactors = Object.keys(vegie.crop.factor);
    let environmentFactors = Object.keys(factors);
    let environmentValues = [];
    let indexArray = [];
    let factorIndex = [];
    let factorValues = [];
    cropFactors.forEach(factor =>
        indexArray.push(environmentFactors.findIndex(element => element === factor))
    );
    indexArray.forEach(index =>
        environmentValues.push(Object.values(factors)[index])
    );
    let textToIndex = [
        { text: 'low', index: 0 },
        { text: 'medium', index: 1 },
        { text: 'high', index: 2 }
    ];
    environmentValues.forEach(element =>
        factorIndex.push(textToIndex.find(({ text }) => text === element).index)
    );
    let count = 0;
    [vegie.crop.factor].forEach(element =>
        Object.values(element).forEach(row =>
            factorValues.push(Object.values(row).at(factorIndex[count++]))
        ));
    let multiplyFactors = factorValues.map(value => (100 + value) * 0.01);
    const multiplyValue = multiplyFactors.reduce((previousValue, currentValue) =>
        previousValue * currentValue,
        yieldCrop
    );
    return parseFloat((multiplyValue * vegie.numCrops).toFixed(1))
}

//1. Turn the object into an array so you can loop over it
//2. Make a new array into which you can put all the individual yields
//3. Get the sum of all the individual yields
const getTotalYield = (crops, factors) => {
    if (factors === undefined) {
        let cropArray = Object.values(crops);
        let yieldPerCrop = [];
        cropArray[0].forEach(crop => yieldPerCrop.push(getYieldForCrop(crop)));
        const sumYield = yieldPerCrop.reduce((previousValue, currentValue) =>
            previousValue + currentValue,
            0
        );
        return sumYield;
    }
    let cropArray = Object.values(crops);
    let yieldPerCrop = [];
    cropArray[0].forEach(crop => yieldPerCrop.push(getYieldForCrop(crop, factors)));
    const sumYield = yieldPerCrop.reduce((previousValue, currentValue) =>
        previousValue + currentValue,
        0
    );
    return sumYield;
}

//1. Get the cost for one plant
//2. Mutiply with the amount of crops
const getCostsForCrop = vegie => {
    let costPlant = vegie.crop.cost;
    return costPlant * vegie.numCrops
}

//1. Get the salePrice per kg
//2. Multiply with the amount sold
const getRevenueForCrop = (vegie, factors) => {
    let priceKg = vegie.crop.salePrice;
    return priceKg * getYieldForCrop(vegie, factors)
}

//1. Get the revenue of the crop
//2. Get the costs of the crop
//3. Calculate the profit by subtracting costs from revenue
const getProfitForCrop = (crop, factors) => {
    let revenue = getRevenueForCrop(crop, factors);
    let costs = getCostsForCrop(crop);
    return revenue - costs
}

//1. Get the profit for a individual crop
//2. Place this profit into an array
//3. Calculate the sum of the array
const getTotalProfit = (crops, factors) => {
    let profitPerCrop = [];
    crops.forEach(crop => profitPerCrop.push(getProfitForCrop(crop, factors)));
    const totalProfit = profitPerCrop.reduce((previousValue, currentValue) =>
        previousValue + currentValue,
        0
    );
    return totalProfit;

}

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
}


