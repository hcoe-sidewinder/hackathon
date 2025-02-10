import { createContext, useContext, useState } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContent = useContext(AuthContext);
  if (!authContent) {
    console.log("Auth not found");
    return;
  }
  return authContent;
};
