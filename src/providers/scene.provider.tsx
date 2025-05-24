import { MemoExoticComponent, ReactElement, createContext, useRef, useState } from 'react';
import { useSafeContext } from '../hooks/use-safe-context';
import { scenes } from '../scenes/scenes';

type SceneCtx = {
    next: (key: string) => void;
    back: () => void;
};

const SceneContext = createContext<SceneCtx | null>(null);

export const SceneProvider = ({ initial }: { initial: string }) => {
    const fallback = scenes.get(initial) ?? [...scenes.values()][0];
    const [CurrentScene, setCurrentScene] = useState<MemoExoticComponent<() => ReactElement>>(fallback);

    const lastScene = useRef<MemoExoticComponent<() => ReactElement>>(CurrentScene);

    const next = (key: string) => {
        lastScene.current = CurrentScene;
        setCurrentScene(scenes.get(key) ?? fallback);
    };

    const back = () => {
        const current = CurrentScene;
        setCurrentScene(lastScene.current);
        lastScene.current = current;
    };

    return (
        <SceneContext.Provider value={{ next, back }}>
            <CurrentScene />
        </SceneContext.Provider>
    );
};

export const useScene = () => useSafeContext(SceneContext);
