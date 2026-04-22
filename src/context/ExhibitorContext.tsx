import { createContext, useContext } from 'react';

export const ExhibitorCtx = createContext<any>(null);

export const useExhibitorCtx = () => {
    const ctx = useContext(ExhibitorCtx);
    if (!ctx) {
        console.warn("useExhibitorCtx must be used within an ExhibitorCtx.Provider");
    }
    return ctx;
};
