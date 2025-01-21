import auth from "@/src/config/firebaseConfig";
import useAxiosSecures from "@/src/hooks/useAxiosSecures";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const axiosSecures = useAxiosSecures();
  const [user, setUser] = useState(null);
  const [isActive, setIsActive] = useState(() => localStorage.getItem("activePage") || "home");


  // Create new user with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login user with email and password
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Login with Google
  const loginWithGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Sign out user
  const signOutUser = () => {
    return signOut(auth);
  };

  // Send password reset email
  const updatePass = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Update user profile
  const profileUpdate = (profileInfo) => {
    return updateProfile(user, profileInfo);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
  
      if (currentUser) {
        try {
          const response = await axiosSecures.post("jwt",{ email: currentUser?.email }, // Send the user email
          
          );
   console.log(response)
          // Store JWT token in localStorage
          localStorage.setItem("token", response.data.token);        
          console.log("Login successful:", response.data);
        } catch (error) {
          console.error("Error fetching JWT token:", error);
        }
      } else {
        // Clear localStorage if the user is logged out
        localStorage.removeItem("token");
        
      }
  
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, [axiosSecures]);

  // Track active page state
  useEffect(() => {
    localStorage.setItem("activePage", isActive);
  }, [isActive]);

  const info = {
    user,
    createUser,
    loginUser,
    loading,
    loginWithGoogle,
    signOutUser,
    updatePass,
    profileUpdate,
    isActive,
    setIsActive,
  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default ContextProvider;
