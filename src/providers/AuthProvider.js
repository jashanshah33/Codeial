import { createContext } from 'react';
import { useProvideAuth } from '../hooks/index';

const initrialState = {
  user: null,
  login: () => {},
  logout: () => {},
  loading: true,
  signup: () => {},
  updateUser: () => {},
  updateUserFriends: () => {}
};

export const AuthContext = createContext(initrialState);

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
