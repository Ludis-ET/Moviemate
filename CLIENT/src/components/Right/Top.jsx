// react hot toast
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../../assets/avatar.jpg";
import { formatDistanceToNow } from "date-fns";

export const Top = () => {
  const { currentUser, signUpWithGoogle, signOut } = useAuth();

  const handleGoogleSignUp = async () => {
    try {
      await signUpWithGoogle();
      alert("Signed up with Google successfully");
      // Handle redirection or UI update
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <header className="text-center">
      {currentUser ? (
        <div>
          <div class="flex items-center gap-4">
            <img
              class="w-10 h-10 rounded-full"
              src={currentUser.photoURL ? currentUser.photoURL : Avatar}
              alt=""
            />
            <div class="font-medium dark:text-white">
              <div>{currentUser.displayName}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                Joined in{" "}
                {formatDistanceToNow(currentUser.metadata.creationTime)} ago
              </div>
            </div>
            <button className="btn btn-sm bg-red-600" onClick={signOut}>
              <i className="fa fa-power-off"></i>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={handleGoogleSignUp}
            className="relative px-5 py-2 font-medium text-white group"
          >
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-red-500 group-hover:bg-red-700 group-hover:skew-x-12"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-red-700 group-hover:bg-red-500 group-hover:-skew-x-12"></span>
            <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-red-600 -rotate-12"></span>
            <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-red-400 -rotate-12"></span>
            <span className="relative">
              Join with <i className="fab fa-google"></i>oogle
            </span>
          </button>
        </div>
      )}
    </header>
  );
};
