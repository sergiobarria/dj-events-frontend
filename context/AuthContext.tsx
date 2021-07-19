import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

// import { IUser } from '../types';
import { NEXT_URL } from '../config/index';

interface IUser {
  username: string;
  email: string;
  password: string;
}

interface IUserLogin {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: IUser | null;
  error: string | null;
  register: ({ username, email, password }: IUser) => void;
  login: ({ email, password }: IUserLogin) => void;
  logout: () => void;
  checkUserLoggedIn: () => void;
}

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
    // eslint-disable-next-line
  }, []);

  // Register user
  const register = async (user: IUser) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push('/account/dashboard');
    } else {
      setError(data.message);
      setError(null);
    }
  };

  // Login user
  const login = async ({ email: identifier, password }: IUserLogin) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push('/account/dashboard');
    } else {
      setError(data.message);
      setError(null);
    }
  };

  // Logout user
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST',
    });

    if (res.ok) {
      setUser(null);
      router.push('/');
    }
  };

  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push('/account/dashboard');
    } else {
      setUser(null);
    }
  };

  const value = {
    user,
    error,
    register,
    login,
    logout,
    checkUserLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
