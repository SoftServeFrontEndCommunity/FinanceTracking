export interface User {
  id: string;
  userName: string;
  accessToken: string;
}
export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}
