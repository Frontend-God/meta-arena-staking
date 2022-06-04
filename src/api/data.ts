/* eslint-disable prettier/prettier */
import { useAssetData } from "./assetData";

import { Token } from "@types";

export interface Data {
  assets: Token[];
  getTokens: () => void;
}

function useTokenData() {
  const { assets, refetch } = useAssetData();

  const data: Data = {
    assets: assets,
    getTokens: () => {
      refetch();
    },
  };

  return data;
}

export { useTokenData }
