import { login, register, logout, getme } from "../services/auth.api";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loding, setLoding } = context;

  async function handleRegister({ username, email, password }) {
    setLoding(true);
    const data = await register({ username, email, password });
    console.log(data)
    setUser(data.user);
    setLoding(false);
  }
  async function handleLogin({ username, email, password }) {
    setLoding(true);
    const data = await login({ username, email, password });
    console.log(data)
    setUser(data.user);
    setLoding(false);
  }

  async function handleGetme() {
    setLoding(true);
    const data = await getme();
    setUser(data.user);
    setLoding(false);
  }

  async function handelLogout() {
    setLoding(true);
    const data = await logout();
    setUser(data.user);
    setLoding(false);
  }
  useEffect(() => {
    handleGetme();
  }, []);
  return {
    user,
    loding,
    handleRegister,
    handleLogin,
    handleGetme,
    handelLogout,
  };
};
