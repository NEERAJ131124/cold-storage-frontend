import React from "react";
import { RouterProvider } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import router from "./routes/index";
import "./index.css";


const msalConfig = {
  auth: {
    clientId: "ce6d61f0-7dc7-4f7e-85ac-43ec99c41a95", // Replace with your Azure AD B2C client ID
    authority: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize", // Replace with your authority URL
    redirectUri: "https://victorious-glacier-007ebea00.4.azurestaticapps.net", // Ensure this matches your app's redirect URI
  },
};

const pca = new PublicClientApplication(msalConfig);

const App = () => {
  return (
    <MsalProvider instance={pca}>
      <RouterProvider router={router} />
    </MsalProvider>
  );
};

export default App;
