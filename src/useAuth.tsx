import React, {
  createContext,
  useContext,
} from "react";

interface AuthContextType {
  user?: User;
  signin: (credentials: SignInCredentials) => Promise<void>;
  signout: (callback: VoidFunction) => void;
}

const fakeAuthProvider = {
  isAuthenticated: false,

  signin: (credentials: SignInCredentials) => {
    return Promise.resolve({ name: 'John Doe', email: credentials.email } as User);
  },
  signout(callback: VoidFunction) {
    // TODO
  }
};

const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export interface User {
  email: string;
  name: string;
}

export interface GithubLoginParams { 
  code: string, 
  client_id: string, 
  client_secret: string, 
  redirect_uri: string 
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | undefined>();

  const signin = (credentials: SignInCredentials) => {
    return fakeAuthProvider.signin(credentials).then((user: User) => setUser(user));
  };

  const signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(undefined);
      callback();
    });
  };

  const value: AuthContextType = { user, signin, signout };
  return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>);
}
// Export the provider as we need to wrap the entire app with it

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
  return useContext(AuthContext);
}