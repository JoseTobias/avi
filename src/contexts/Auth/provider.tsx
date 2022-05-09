import React, { createContext, useState, useCallback, FC } from "react";

import {
  IAuthContextData,
  IAuthData,
  ISignInCredentials,
} from "./provider.types";

import { AuthService } from "../../services/Auth";
import { useCookies } from "react-cookie";

export const AuthContext = createContext<IAuthContextData>(
  {} as IAuthContextData
);

const initialState = {
  email: "",
  id: "",
  name: "",
  role: "",
};

export const AuthProvider: FC<any> = ({ children }) => {
  const [cookies, setCookie] = useCookies();
  const authService = React.useMemo(() => new AuthService(), []);

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authData, setAuthData] = useState<IAuthData>(initialState);

  const signIn = useCallback(
    async (data: ISignInCredentials) => {
      try {
        const { cookie, user } = await authService.signIn(data);
        // console.log("cookie", cookies);
        setCookie("AVISID", cookie);
        setAuthData(user);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        throw error;
      }
    },
    [authService, setCookie]
  );

  const signOut = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const setAuth = useCallback((data: IAuthData | undefined) => {
    setAuthData(data || initialState);
  }, []);

  const verifyAuth = useCallback(() => {
    if (cookies["AVISID"]) {
      authService.setToken(cookies["AVISID"]);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, [cookies, authService]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authData,
        signIn,
        signOut,
        verifyAuth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
