// import React, { useState, useEffect } from "react";
// import { useMsal, useIsAuthenticated, useAccount } from "@azure/msal-react";

// const Login = () => {
//   const { instance } = useMsal();
//   const isAuthenticated = useIsAuthenticated();
//   const account = useAccount(); // Fetch the currently authenticated user details
//   const [userDetails, setUserDetails] = useState(null); // To store user details

//   const handleLogin = (provider) => {
//     const loginRequest = {
//       scopes: ["openid", "profile", "email"], // Scopes requested during login
//     };

//     if (provider === "google") {
//       instance
//         .loginPopup({
//           ...loginRequest,
//           prompt: "select_account",
//           authority: "https://login.microsoftonline.com/your-tenant-id",
//           loginHint: "google", // You can specify Google as the provider here
//         })
//         .then((response) => {
//           console.log("User Info after Google Login:", response.account);
//           setUserDetails(response.account);
//         })
//         .catch((e) => console.error("Login failed:", e));
//     } else {
//       instance
//         .loginPopup({
//           ...loginRequest,
//         })
//         .then((response) => {
//           console.log("User Info after Microsoft Login:", response.account);
//           setUserDetails(response.account);
//         })
//         .catch((e) => console.error("Login failed:", e));
//     }
//   };

//   const handleLogout = () => {
//     instance.logoutPopup().catch((e) => console.error("Logout failed:", e));
//   };

//   useEffect(() => {
//     if (account) {
//       console.log("Current user details:", account); // Log user details to the console
//       setUserDetails(account); // Set the user details to the state
//     }
//   }, [account]); // This effect runs whenever the `account` changes

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl mb-4">Azure AD B2C Login</h1>
//       {isAuthenticated ? (
//         <>
//           <p className="mb-4 text-green-600">You are logged in!</p>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
//           >
//             Logout
//           </button>

//           {userDetails && (
//             <div className="mt-4 p-4 border border-gray-300 rounded">
//               <h2 className="font-semibold">User Details:</h2>
//               <pre>{JSON.stringify(userDetails, null, 2)}</pre>
//             </div>
//           )}
//         </>
//       ) : (
//         <>
//           <p className="mb-4 text-red-600">You are not logged in!</p>
//           <button
//             onClick={() => handleLogin("google")}
//             className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//           >
//             Login with Google
//           </button>
//           <button
//             onClick={() => handleLogin("microsoft")}
//             className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//           >
//             Login with Microsoft
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default Login;


import React, { useEffect, useState } from "react";

const Login = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if `id_token` is present in the URL hash
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const idToken = urlParams.get("id_token");

    if (idToken) {
      setToken(idToken);
    } else {
      window.location.href =
        "https://coldstorageb2c.b2clogin.com/coldstorageb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_csui&client_id=372d3903-5a0e-401d-993c-129ffc634bc7&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fvictorious-glacier-007ebea00.4.azurestaticapps.net%2Fdashboard&scope=openid&response_type=id_token&prompt=login";
    }
  }, []);

  return (
    <div>
      {token ? (
        <div>
          <h1>Login Successful</h1>
          <p>Your Token:</p>
          <textarea
            readOnly
            value={token}
            rows="10"
            style={{ width: "100%", fontSize: "12px" }}
          />
        </div>
      ) : (
        <p>Redirecting to login...</p>
      )}
    </div>
  );
};

export default Login;

