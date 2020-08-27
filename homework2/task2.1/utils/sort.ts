const isAvailableProperty = (keys: Array<string>): boolean => {
    const availableProperties = ['login', 'password', 'age'];
    return !keys.every((value) => availableProperties.includes(value));
};

export { isAvailableProperty };
