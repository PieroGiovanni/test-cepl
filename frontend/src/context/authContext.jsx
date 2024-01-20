import { createContext, useContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firebaseConfig";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleLogin = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = () => {
    setUser(null);
    signOut(auth)
      .then(async () => {
        console.log("Sign-out successful");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, googleLogin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
