/* eslint-disable prettier/prettier */
import * as React from "react";
import { createContext, useContext } from "react";

import { Data, useTokenData } from "./data";

const createDataRoot = (context: React.Context<Data>) => {
  const DataRoot = ({ children }: { children: React.ReactNode }) => {
    const data = useTokenData();
    return <context.Provider value={data}>{children}</context.Provider>;
  };

  return DataRoot;
};

const dataContext = createContext({} as Data);

const DataProvider = createDataRoot(dataContext);

const useData = () => {
  return useContext(dataContext);
};

export { DataProvider, useData };
