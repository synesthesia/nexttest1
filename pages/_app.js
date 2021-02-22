import '../styles/globals.css'

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../src/authConfig";

function MyApp(props) {
  const { Component, pageProps } = props;
  const msalInstance = new PublicClientApplication(msalConfig);
  return (
    <>
    <MsalProvider instance={msalInstance}>
      <Component {...pageProps} />)
    </MsalProvider>
    </>
    )
}

export default MyApp
