import React, { useContext } from 'react';

export const useSafeContext = <T,>(source: React.Context<T>, name = source.displayName) => {
    const ctx = useContext(source);

    if (ctx) return ctx;
    throw new ReferenceError(`Outside ${name} Context.`);
};
