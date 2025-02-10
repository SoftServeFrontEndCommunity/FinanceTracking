import {
  setLoggedIn,
  setUserInfo,
  setUserToken,
} from "../store/features/authSlice";
import { User } from "../types/storeState";
import { useStoreDispatch } from "./useStoreDispatch";

export default function useStore() {
  const dispatch = useStoreDispatch();

  const setLoggedInContainer = (isLoggedIn: boolean) => {
    dispatch(setLoggedIn(isLoggedIn));
  };

  const setToken = (user: User) => {
    dispatch(setUserToken(user.accessToken));
    dispatch(setUserInfo(user));
  };

  return { setToken, setLoggedInContainer };
}
