import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../lib/firebaseClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null); // Firebase auth user
  const [profile, setProfile] = useState(null); // Firestore user doc (name, phone, role...)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubProfile = null;

    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      // clean up previous profile listener
      if (unsubProfile) {
        unsubProfile();
        unsubProfile = null;
      }

      if (user) {
        const ref = doc(db, "users", user.uid);
        unsubProfile = onSnapshot(
          ref,
          (snap) => {
            if (snap.exists()) {
              setProfile({ id: snap.id, ...snap.data() });
            } else {
              setProfile(null);
            }
            setLoading(false);
          },
          () => {
            setProfile(null);
            setLoading(false);
          }
        );
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      unsubAuth();
      if (unsubProfile) unsubProfile();
    };
  }, []);

  const logout = () => signOut(auth);

  const role = (profile?.role || "user").toString().trim().toLowerCase();
  const isAdmin = role === "admin";

  const value = {
    currentUser,
    profile,
    role,
    isAdmin,
    loading,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
