import { useEffect, useMemo, useRef } from 'react';
import { useGameState } from '../providers/game-state.provider';

export const useNotifications = () => {
    const { notifications } = useGameState();
    const seenRef = useRef<Set<string>>(new Set());

    // Keep track of new notifications only
    const unseen = useMemo(() => {
        return notifications.filter((n) => !seenRef.current.has(n.id));
    }, [notifications]);

    // Mark them as seen after deriving
    useEffect(() => {
        for (const n of unseen) {
            seenRef.current.add(n.id);
        }
    }, [unseen]);

    return unseen;
};
