import { createContext, useContext } from 'react';

export const BuyerCtx = createContext<any>(null);

export const useBuyerCtx = () => {
    const ctx = useContext(BuyerCtx);
    if (!ctx) {
        console.warn("useBuyerCtx must be used within an BuyerCtx.Provider");
    }
    return ctx;
};
