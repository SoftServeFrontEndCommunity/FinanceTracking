import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../../types/storeState";
import { AppDispatch } from "../rootStore";
import { apiService } from "../../services/ApiService";
import { BASEURL } from "../../shared/constants";

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

export const fetchUserInfo = createAsyncThunk<User>(
  "auth/fetchUserInfo",
  async () => {
    const username = localStorage.getItem("username");
    const response = await apiService.get(`${BASEURL}auth`, {
      username,
    });
    localStorage.setItem("user", JSON.stringify(response));
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setLoggedIn, setUserInfo } = authSlice.actions;

// manage the token
export const setUserToken = (token: string) => (dispatch: AppDispatch) => {
  localStorage.setItem("authToken", token);
  getUserInfo();
  console.log(getUserInfo());

  dispatch(authSlice.actions.setLoggedIn(true));
};

// manage the user session
export const restoreSessionAction = () => async (dispatch: AppDispatch) => {
  const token = apiService.getToken();

  if (token) {
    setUserToken(token)(dispatch);
    apiService.setToken(token);

    const user = getUserInfo();
    if (user) {
      dispatch(authSlice.actions.setUserInfo(user));
    } else if (localStorage.getItem("username")) {
      // Fetch user information from the server if not available locally
      await dispatch(fetchUserInfo());
    }
  }
};

const getUserInfo = (): User | null => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user) as User;
  }
  return null;
};

export default authSlice.reducer;
