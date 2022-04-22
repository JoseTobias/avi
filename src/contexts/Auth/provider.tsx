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

export const AuthProvider: FC<any> = ({ children }) => {
  const [cookies, setCookie] = useCookies();
  const authService = React.useMemo(() => new AuthService(), []);

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authData, setAuthData] = useState<IAuthData>({
    email: "",
    id: "",
    name: "",
    role: "",
  });

  const signIn = useCallback(
    async (data: ISignInCredentials) => {
      try {
        const { cookie, ...rest } = await authService.signIn(data);
        // console.log("cookie", cookies);
        setCookie("AVISID", cookie);
        setAuthData(rest);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
