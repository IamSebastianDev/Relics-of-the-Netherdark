export const cuid = () => {
    const now = Date.now().toString(36); // timestamp part
    const rand = Math.random().toString(36).slice(2, 10); // random part
    return `c${now}${rand}`; // starts with letter, e.g. "cmyr2hlc8k93v9hq"
};
