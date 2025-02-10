declare module "container/shared/constants" {
  export enum MfeBasePrefix {
    auth = "auth",
    dashboard = "dashboard",
    transactions = "transactions",
  }
  export const BASEURL = "http://localhost:4000/";
}

declare module "container/hooks/useStore" {
  import { User } from "container/types/storeState";
  export default function useStore(): {
    setToken: (user: User) => void;
  };
}

declare module "container/types/storeState" {
  export interface User {
    id: string;
    userName: string;
    accessToken: string;
  }
  export interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
  }
}

declare module "container/store/rootStore" {
  export const store: import("@reduxjs/toolkit").EnhancedStore<
    {
      auth: import("container/types/storeState").AuthState;
      redirection: {
        path: string;
      };
    },
    import("redux").UnknownAction,
    import("@reduxjs/toolkit").Tuple<
      [
        import("redux").StoreEnhancer<
          {
            dispatch: import("redux-thunk").ThunkDispatch<
              {
                auth: import("container/types/storeState").AuthState;
                redirection: {
                  path: string;
                };
              },
              undefined,
              import("redux").UnknownAction
            >;
          },
          {}
        >,
        import("redux").StoreEnhancer<{}, {}>
      ]
    >
  >;
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
}

declare module "container/hooks/useStoreSelector" {
  import type { TypedUseSelectorHook } from "react-redux";
  import { RootState } from "container/store/rootStore";
  export const useStoreSelector: TypedUseSelectorHook<RootState>;
  export const selectIsLoggedIn: (state: RootState) => boolean;
}

declare module "container/providers/StoreProvider" {
  import React from "react";

  type Props = {
    children: React.ReactNode;
  };
  export default function StoreProvider({ children }: Props): JSX.Element;
}

declare module "container/hooks/useFetch" {
  type methods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

  const useFetch: <T>(
    method: methods,
    url: string,
    body?: any
  ) => {
    fetchData: () => Promise<void>;
    data: T;
    loading: boolean;
    error: string | null;
  };
  export default useFetch;
}
