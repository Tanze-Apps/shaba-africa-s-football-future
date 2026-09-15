import { createContext, useContext } from "react";

/**
 * True once the intro loader has cleared (or immediately, when it was
 * skipped). Above-the-fold sections gate their entrance animations on this so
 * the hero plays into the wipe instead of behind it.
 */
const ReadyContext = createContext(true);

export const ReadyProvider = ReadyContext.Provider;

export const useReady = () => useContext(ReadyContext);
