export const random = <T>(itt: Array<T>) => {
    return itt[Math.floor(Math.random() * itt.length)];
};
