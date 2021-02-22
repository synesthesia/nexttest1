import { MsalAuthenticationTemplate, useMsal, useAccount } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest } from "../src/authConfig";
import React, { useEffect, useState } from "react";
import { ProfileData } from "../src/ProfileData";
import { callMsGraph } from "../src/MsGraphApiCall";

const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [graphData, setGraphData] = useState(null);
  
    function requestProfileData() {
        instance.acquireTokenSilent({
            ...loginRequest,
            account: account
        }).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
        });
    }

    useEffect(() => {
        if (account) {
            requestProfileData();
        }
    }, [account]);
  
    return (
        <div>
            { graphData ? <ProfileData graphData={graphData} /> : null }
        </div>
    );
};

const ErrorComponent = ({error}) => {
    return <h6>An Error Occurred: {error.errorCode}</h6>;
}

const Loading = () => {
    return <h6>Authentication in progress...</h6>
}

export default function Profile() {
    const authRequest = {
        ...loginRequest
    };

    return (
        <MsalAuthenticationTemplate 
            interactionType={InteractionType.Popup} 
            authenticationRequest={authRequest} 
            errorComponent={ErrorComponent} 
            loadingComponent={Loading}
        >
            <ProfileContent />
        </MsalAuthenticationTemplate>
      )
};