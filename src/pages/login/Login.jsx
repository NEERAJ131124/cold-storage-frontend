import React, { useState, useEffect } from "react";
import { useMsal, useIsAuthenticated, useAccount } from "@azure/msal-react";

const Login = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const account = useAccount(); // Fetch the currently authenticated user details
  const [userDetails, setUserDetails] = useState(null); // To store user details

  const handleLogin = () => {
    instance
      .loginPopup({
        scopes: ["openid", "profile", "email"], // Scopes requested during login
      })
      .then((response) => {
        console.log("User Info after Login:", response.account);
        setUserDetails(response.account); // Store user details after login
      })
      .catch((e) => console.error("Login failed:", e));
  };

  const handleLogout = () => {
    instance.logoutPopup().catch((e) => console.error("Logout failed:", e));
  };

  useEffect(() => {
    if (account) {
      console.log("Current user details:", account); // Log user details to the console
      setUserDetails(account); // Set the user details to the state
    }
  }, [account]); // This effect runs whenever the `account` changes

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Azure AD B2C Login</h1>
      {isAuthenticated ? (
        <>
          <p className="mb-4 text-green-600">You are logged in!</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Logout
          </button>

          {userDetails && (
            <div className="mt-4 p-4 border border-gray-300 rounded">
              <h2 className="font-semibold">User Details:</h2>
              <pre>{JSON.stringify(userDetails, null, 2)}</pre>
            </div>
          )}
        </>
      ) : (
        <>
          <p className="mb-4 text-red-600">You are not logged in!</p>
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login with Microsoft
          </button>
        </>
      )}
    </div>
  );
};

export default Login;
