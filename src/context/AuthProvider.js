import { createContext } from "react";
import useFirebase from "../hooks/useFirebase";

import React from "react";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const allContext = useFirebase();
  return (
    <AuthContext.Provider value={allContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
