import React from "react";
export const ProfileData = ({graphData}) => {
    return (
        <ul className="profileData">
            <li>{graphData.displayName}</li>
            <li>{graphData.jobTitle}</li>
            <li>{graphData.mail}</li>
            <li>{graphData.businessPhones[0]}</li>
            <li>{graphData.officeLocation}</li>
        </ul>
    );
};

