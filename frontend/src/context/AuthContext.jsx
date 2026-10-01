import { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '../services/api.js';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    if (!token) { setUser(null); setLoading(false); return; }
    authApi.me(token).then((d) => setUser(d.user)).catch(() => logout()).finally(() => setLoading(false));
  }, [token]);

  const save = (data) => { localStorage.setItem('token', data.token); setToken(data.token); setUser(data.user); };
  const login = async (form) => save(await authApi.login(form));
  const register = async (form) => save(await authApi.register(form));
  const logout = () => { localStorage.removeItem('token'); setToken(null); setUser(null); };

  return <AuthContext.Provider value={{ token, user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
}
