import React from "react";
import { auth } from "./Firebase";

const GoogleSignIn = () => {
  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await auth.signInWithPopup(provider);
      console.log("Signed in with Google!");
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div>
      <h2>Sign In with Google</h2>
      <button onClick={handleSignIn}>Sign In with Google</button>
    </div>
  );
};

export default GoogleSignIn;
