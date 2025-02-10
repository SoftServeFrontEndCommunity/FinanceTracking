import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/rootStore";

export const useStoreDispatch: () => AppDispatch = useDispatch;
