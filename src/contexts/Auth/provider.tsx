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
  const [cookies, setCookie] = useCookies(["AVISID"]);
  const authService = React.useMemo(() => new AuthService(), []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [authData, setAuthData] = useState<IAuthData>({});

  const signIn = useCallback(
    async (data: ISignInCredentials) => {
      try {
        await authService.signIn(data);
        // console.log("cookie", cookie);
        // setCookie("AVISID", cookie);
        // const response2 = await authService.usersMe();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        throw error;
      }
    },
    [authService]
  );

  const signOut = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        // authData,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
