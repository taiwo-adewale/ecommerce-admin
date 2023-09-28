import {
  useSelector as ReduxSelector,
  useDispatch as ReduxDispatch,
  TypedUseSelectorHook,
} from "react-redux";
import { RootState, AppDispatch } from "./store";

export const useSelector: TypedUseSelectorHook<RootState> = ReduxSelector;

export const useDispatch = ReduxDispatch<AppDispatch>;
