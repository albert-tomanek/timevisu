import React, { useState, useEffect } from "react";

const CLIENT_ID = "436749985502-sf198t6s3up8f8em1ls5occgd2uu5219.apps.googleusercontent.com";
const API_KEY = "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";
const SCOPES = "https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/userinfo.profile";

const GoogleAuthButton: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    const initializeGapi = () => {
      gapi.load("client:auth2", async () => {
        await gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
          ],
          scope: SCOPES,
        });

        const authInstance = gapi.auth2.getAuthInstance();
        if (authInstance.isSignedIn.get()) {
          handleSignIn();
        }
      });
    };

    initializeGapi();
  }, []);

  const handleSignIn = async () => {
    const authInstance = gapi.auth2.getAuthInstance();
    if (!authInstance.isSignedIn.get()) {
      await authInstance.signIn();
    }

    setIsAuthenticated(true);

    const userProfile = authInstance.currentUser
      .get()
      .getBasicProfile();
    setProfilePicture(userProfile.getImageUrl());
  };

  const handleSignOut = () => {
    gapi.auth2.getAuthInstance().signOut();
    setIsAuthenticated(false);
    setProfilePicture(null);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <button
          onClick={handleSignIn}
          className="p-2 bg-blue-500 text-white rounded-xl"
        >
          Sign in with Google
        </button>
      ) : (
        <div>
          <img
            src={profilePicture || ""}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <button
            onClick={handleSignOut}
            className="ml-2 p-2 bg-red-500 text-white rounded-xl"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default GoogleAuthButton;
