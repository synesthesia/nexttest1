import React, {useState, useEffect} from "react";
import { useMsal } from "@azure/msal-react";
import { AuthenticationResult, EventType } from "@azure/msal-browser";

export function useClaims(){

    const { instance } = useMsal();
    const [claims, setClaims] = useState(null);

    useEffect(() => {
        // This will be run on component mount
        const callbackId = instance.addEventCallback((message) => {
            // This will be run every time an event is emitted after registering this callback
            if (message.eventType === EventType.LOGIN_SUCCESS) {
                const result = message.payload as AuthenticationResult;    
                setClaims(result.idTokenClaims);
            }
        });

        return () => {
            // This will be run on component unmount
            if (callbackId) {
                instance.removeEventCallback(callbackId);
            }
        }
        
    }, []);

    return claims;

}

