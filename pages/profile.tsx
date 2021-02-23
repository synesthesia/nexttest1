import { MsalAuthenticationTemplate, useMsal, useAccount } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest } from "../src/authConfig";
import React, { useEffect, useState } from "react";
import { ProfileData } from "../src/ProfileData";
import { callMsGraph } from "../src/MsGraphApiCall";
import { GroupsConsumer } from "../src/GroupsProvider";

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
            <h3>User profile</h3>
            { graphData ? <ProfileData graphData={graphData} /> : null }
            <h3>Security group Ids</h3>
            <ul>
            <GroupsConsumer>
                {value => value.groups && !!value.groups.length ? value.groups.map((_, index) => <p key={index}>{_}</p>) : null}
            </GroupsConsumer>
            </ul>
         </div>);
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