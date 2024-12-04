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
    redirectUri: "http://localhost:5173", // Ensure this matches your app's redirect URI
  },
};

const pca = new PublicClientApplication(msalConfig);
// https://coldstorageb2c.b2clogin.com/coldstorageb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_cs&client_id=ce6d61f0-7dc7-4f7e-85ac-43ec99c41a95&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A5173&scope=openid&response_type=id_token&prompt=login

const App = () => {
  return (
    //<MsalProvider instance={pca}>
      <RouterProvider router={router} />
    //</MsalProvider>
  );
};

export default App;
