 import {graphConfig} from '../../src/authConfig'

 import type { NextApiRequest, NextApiResponse } from 'next'

 type MsGraphGetMemberGroupsResponse = {
    "@odata.context": string,
    value: string[]
 }

 export default async (req: NextApiRequest, res: NextApiResponse) => {

    let requestHeaders = req.headers;
    let authHeader = requestHeaders.authorization;

    if (authHeader == 'undefined' || authHeader == null){
        res.status(400).json({error: "Missing auth header"});
        return;
    }

    const headers = new Headers();
    const bearer = `${authHeader}`;

    headers.append("Authorization", bearer);
    headers.append("Content-Type", "application/json");

    let body = {
        securityEnabledOnly: true
    }

    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body) 
    };

    let url = `${graphConfig.graphMeEndpoint}/getMemberGroups`;
    console.log(url);
    console.log(headers);

    var groups =  await fetch(url, options)
        .then(response => response.json())
        .then(x => { 
            let result = x as MsGraphGetMemberGroupsResponse;
            console.log(result)
            return result.value;
            }
        )
        .catch(error => console.log(error));
    
    res.status(200).json(groups);
 }

