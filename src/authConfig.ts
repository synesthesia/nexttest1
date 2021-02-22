// Config object to be passed to Msal on creation
//clientId: "0a61c279-646b-4055-a5f1-1c3da7f70f18",
export const msalConfig = {
    auth: {
        clientId:process.env.NEXT_PUBLIC_AAD_CLIENTID,
        authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AAD_SUBSCRIPTION}`,
        redirectUri: "/",
        postLogoutRedirectUri: "/"
    }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
    scopes: ["User.Read"]
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};