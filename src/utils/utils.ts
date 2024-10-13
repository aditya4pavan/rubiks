export const getMostFrequent = (items: string[]): string => {
    const freqMap = items.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    const max = Math.max(...Object.values(freqMap));
    return Object.keys(freqMap).find((key) => freqMap[key] === max)!;
};