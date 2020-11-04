const generateRndInteger = (min = 0, max = 10) => Math.floor(Math.random() * (max - min)) + min;

export { generateRndInteger };
