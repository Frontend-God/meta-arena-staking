/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from "react";
import { useChain, useMoralis } from "react-moralis";

import Navbar from "./Header";

const Layout = ({ children }: { children: React.ReactElement }) => {
  const { enableWeb3, isAuthenticated, isWeb3Enabled, isWeb3EnableLoading } = useMoralis();
  const { chain, switchNetwork } = useChain();

  useEffect(() => {
    const connect = async () => {
      const connectorId = window.localStorage.getItem("connectorId");
      if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
        await enableWeb3({ provider: connectorId as any });
        await switchNetwork("0x13881");
      }
    }

    connect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled, chain]);

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
