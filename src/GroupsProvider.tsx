import {  useMsal, useAccount } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import React, { useEffect, useState,  PropsWithChildren,} from "react";

export type GroupsProviderProps = PropsWithChildren<{}>;

export const GroupsProvider = ({children}: GroupsProviderProps): React.ReactElement => {
    const { instance, accounts } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [groupsData, setGroupsData] = useState<string[]>([]);

    function requestGroupsData() {
        instance.acquireTokenSilent({
            ...loginRequest,
            account: account
        }).then((response) => {
            callGroupsApi(response.accessToken)
          .then(response => {
              console.debug(`Setting groups data ${JSON.stringify(response)}`)
              setGroupsData(response)
            });
        });
    }

    useEffect(() => {
        if (account) {
            requestGroupsData();
        }
    }, [account]);

    const contextValue: IGroupsContext = {
        groups: groupsData
    };

    return (
        <GroupsContext.Provider value={contextValue}>{children}</GroupsContext.Provider>
    );


};

export interface IGroupsContext {
    groups: string[];
}

const defaultGroupsContext: IGroupsContext = {
    groups: [""]
};


export const GroupsContext = React.createContext<IGroupsContext>(
    defaultGroupsContext
);

export const GroupsConsumer = GroupsContext.Consumer;


const callGroupsApi = async (accessToken: string) : Promise<string[]> => {

    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    try {
        const response = await fetch("/api/groups", options);
        console.log(response)
        let result = await response.json() as string[];
        console.log(`/api/groups result ${JSON.stringify(result)}`);
        return result;
    } catch (error) {
        console.log(error);
    }
};