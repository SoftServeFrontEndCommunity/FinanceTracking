import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { RootState } from "../store/rootStore";
import { createDraftSafeSelector } from "@reduxjs/toolkit";

// Esto exporta todo el store, pero no se debería utilizar para evitar renders innecesarios
export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const selectUser = (state: RootState) => state.auth.user;
