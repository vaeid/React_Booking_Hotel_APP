import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();
const FAKE_USER = { name: 'vaeid', email: 'vaeid@gmail.com', password: 'password' };
const initialState = { user: null, isAuthenticated: false };
function authReducer(state, action) {
  switch (action.type) {
    case 'login':
      return { user: action.payload, isAuthenticated: true };
    case 'logout':
      return { user: null, isAuthenticated: false };
    default:
      throw new Error('Invalid action: ' + action.type);
  }
}
export default function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(authReducer, initialState);
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      console.log(email, password);
      dispatch({ type: 'login', payload: FAKE_USER });
    }
  }
  function logout() {
    dispatch({ type: 'logout' });
  }

  return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  return useContext(AuthContext);
}
