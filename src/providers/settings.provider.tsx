import { PropsWithChildren, createContext, useState } from "react";
import { useSafeContext } from "../hooks/use-safe-context";

export type GameSettings = {
    mirrorUi: boolean;
    toggleMirrorUi: () => void;
};

const SettingsContext = createContext<GameSettings | null>(null);

export const SettingsProvider = ({ children }: PropsWithChildren) => {
    const [mirrorUi, setMirrorUi] = useState(false);
    const toggleMirrorUi = () => setMirrorUi(!mirrorUi);

    return <SettingsContext.Provider value={{ mirrorUi, toggleMirrorUi }}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => useSafeContext(SettingsContext);
