
import React, {useState} from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import { useEffect } from "react";

export const SignInButton = ({loginType}) => {

    const { instance } = useMsal();

    const handleLogin = () => {
   
        if (loginType === "popup") {
              instance.loginPopup(loginRequest);
          } else if (loginType === "redirect") {
              instance.loginRedirect(loginRequest);
        }
    }

    return(
        <button onClick={() => handleLogin()}>Login to see profile {loginType}</button>
    )
}

export const SignOutButton = () => {

    const { instance } = useMsal();

    const handleLogout = () => {
        console.log("Logging out")
        instance.logout();
    }

    return(
        <button onClick={() => handleLogout()}>Logout</button>
    )
}