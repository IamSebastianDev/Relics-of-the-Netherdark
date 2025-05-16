import { MemoExoticComponent, ReactElement, createContext, useState } from "react";
import { useSafeContext } from "../hooks/use-safe-context";
import { scenes } from "../scenes/scenes";

type SceneCtx = {
    next: (key: string) => void;
};

const SceneContext = createContext<SceneCtx | null>(null);

export const SceneProvider = ({ initial }: { initial: string }) => {
    const fallback = scenes.get(initial) ?? [...scenes.values()][0];
    const [CurrentScene, setCurrentScene] = useState<MemoExoticComponent<() => ReactElement>>(fallback);

    const next = (key: string) => {
        setCurrentScene(scenes.get(key) ?? fallback);
    };

    return (
        <SceneContext.Provider value={{ next }}>
            <CurrentScene />
        </SceneContext.Provider>
    );
};

export const useScene = () => useSafeContext(SceneContext);
