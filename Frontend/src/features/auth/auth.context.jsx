import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loding, setLoding] = useState(true);

  return (
    <AuthContext.Provider value={{ user, loding, setLoding, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
