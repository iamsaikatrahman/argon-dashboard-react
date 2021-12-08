import { useEffect, useState } from "react";
import initializeAuthentication from "views/authentication/firebase.init";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import axios from "axios";

initializeAuthentication();
const useFirebase = () => {
  const [user, setUser] = useState({});
  const [authError, setAuthError] = useState("");
  const [isloading, setIsLoading] = useState("");

  const auth = getAuth();

  useEffect(() => {
    if (authError) {
      setTimeout(() => {
        setAuthError("");
      }, 5000);
    }
  }, [authError]);

  // EMAIL REGISTRATION
  const signInWithEmail = (email, password, displayName, history) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        const newUser = { email, displayName };
        setUser(newUser);
        setAuthError("");
        // Send user info to firebase
        updateProfile(auth.currentUser, {
          displayName: displayName,
        })
          .then(() => {})
          .catch((error) => {});
        // Save DataBase
        saveUserInfo(email, displayName, history);
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };
  //   EMAIL LOGIN
  const loginInWithEmail = (email, password, history) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const destination = "/auth/success";
        history.replace(destination);
        setUser(user);
        setAuthError("");
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };
  //   OBSERVER USER STATE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribe;
  }, [auth]);
  // Save User Information Into DataBase
  const saveUserInfo = (email, displayName, history) => {
    const user = { email, displayName };
    axios
      .post("https://lit-harbor-34308.herokuapp.com/users", user)
      .then((res) => {
        if (res.status === 200) {
          const destination = "/auth/success";
          history.replace(destination);
        }
      });
  };
  //   LOGOUT
  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {})
      .finally(() => setIsLoading(false));
  };
  return {
    user,
    authError,
    isloading,
    signInWithEmail,
    loginInWithEmail,
    logOut,
  };
};
export default useFirebase;
