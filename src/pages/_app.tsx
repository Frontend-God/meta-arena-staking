/* eslint-disable @typescript-eslint/no-explicit-any */
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";

// import App from "next/app";
import type { AppProps /*, AppContext */ } from "next/app";
import React from "react";
import { useEffect, useState } from "react";
import { MoralisProvider } from "react-moralis";
import { ToastContainer } from "react-toastify";

import { StepContext } from "hooks/useStep";
import Layout from "components/Layout";
import { Step } from "@types";
import { DataProvider } from "api";

function MyApp({ Component, pageProps }: AppProps) {
  const [step, setStep] = useState<Step>(Step.INIT);
  const AppComponent = Component as any;

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap");
  }, []);
  useEffect(() => {
    require("jquery/dist/jquery.min.js");
  }, []);

  useEffect(() => {
    typeof document !== undefined ? require("bootstrap/dist/js/bootstrap") : null;
  }, []);

  return (
    <StepContext.Provider value={{ step, setStep }}>
      <MoralisProvider
        appId={"mk3uKP3eDvlJxLDopqWbY3nDHYaCuS27zX5uvgGl"}
        serverUrl={"https://hnmfcydusgti.usemoralis.com:2053/server"}
      >
        <DataProvider>
          <Layout>
            <AppComponent {...pageProps} />
          </Layout>
          <ToastContainer />
        </DataProvider>
      </MoralisProvider>
    </StepContext.Provider>
  );
}

export default MyApp;
