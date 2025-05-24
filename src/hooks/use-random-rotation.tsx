import { useMemo } from 'react';

export const useRandomRotation = (seed: string) => {
    return useMemo(() => {
        const hash = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const steps = hash % 6; // 0 to 5
        return (steps * Math.PI) / 3; // 60° * n
    }, [seed]);
};
