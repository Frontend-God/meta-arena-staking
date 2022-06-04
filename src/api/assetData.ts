/* eslint-disable prettier/prettier */
import { useCallback, useEffect, useState } from "react";
import { useChain, useMoralis, useMoralisWeb3Api } from "react-moralis";

import contractABI from "../contracts/ArenasOld.json";
import newABI from "../contracts/MetaArenas.json";

import { Token } from "@types";

interface Option {
  chain: any;
  address: string;
}

export const useAssetData = () => {
  const [nfts, setNFTs] = useState<Token[]>([]);
  const { account, Moralis } = useMoralis();
  const { chain } = useChain();
  const [assets, setAssets] = useState<Token[]>([]);
  const [length, setLength] = useState<number>(0);

  const Web3Api = useMoralisWeb3Api();

  const fetchNFTs = useCallback(async (account: string) => {
    console.log("refetching");

    Moralis.start({
      appId: "mk3uKP3eDvlJxLDopqWbY3nDHYaCuS27zX5uvgGl",
      serverUrl: "https://hnmfcydusgti.usemoralis.com:2053/server",
    });

    const options: Option = {
      chain: "mumbai",
      address: account,
    };

    const polygonNFTs = await Web3Api.account.getNFTs(options);

    if (polygonNFTs.result) {
      const tokens: Token[] = polygonNFTs.result;
      if(tokens.length > 0) {
        const OLD_ARENA_ADDRESS = process.env.NEXT_PUBLIC_OLD_ARENA_ADDRESS;
        const META_ARENA_ADDRESS = process.env.NEXT_PUBLIC_META_ARENA_ADDRESS;

        const arenaTokens = tokens.filter(token => token.token_address.toLocaleLowerCase() == OLD_ARENA_ADDRESS.toLocaleLowerCase() || token.token_address == META_ARENA_ADDRESS.toLocaleLowerCase());
        setLength(arenaTokens.length);

        arenaTokens.forEach(async (token) => {
          const asset: Token = { ...token };
          asset.activated = false;
          if (token.metadata) asset.metadata = JSON.parse(token.metadata);
          if (token.token_address.toLocaleLowerCase() == META_ARENA_ADDRESS.toLocaleLowerCase()) {
            asset.activated = true;
            const option = {
              contractAddress: META_ARENA_ADDRESS,
              abi: newABI.abi,
              functionName: "arenaDetails",
              params: {
                _arenaTokenId: token.token_id,
              },
            };

            const tokenDetail = await Moralis.executeFunction(option);
            asset.staked = tokenDetail["staked_"];
            asset.canUpgrade = tokenDetail["canUpgrade_"];
            asset.level = tokenDetail["arenaLevel_"].toString();
            asset.tier = tokenDetail["arenaTier_"].toString();
            asset.timeToWaitForLevelUp = tokenDetail["timeToWaitForLevelUp_"].toString();
          } else {
            const option = {
              contractAddress: OLD_ARENA_ADDRESS,
              abi: contractABI.abi,
              functionName: "tokenURI",
              params: {
                tokenId: token.token_id,
              },
            };

            const result = await Moralis.executeFunction(option);
            const token_uri: string = result.toString();
            asset.token_uri = token_uri.replace("ipfs://", "https://ipfs.moralis.io:2053/ipfs/");

            const metadataRes = await fetch(token_uri.replace("ipfs://", "https://ipfs.moralis.io:2053/ipfs/"));
            const metadata = await metadataRes.json();
            asset.metadata = metadata;
          }

          if (asset.metadata)
            asset.metadata.attributes.forEach((attr) => {
              if (attr.trait_type == "Background") asset.type = attr.value.toUpperCase();
            });

          setNFTs((nfts) => [...nfts, asset]);
        });
      }
    }
  }, []);

  const getTokens = useCallback(() => {
    fetchNFTs(account);
  }, [fetchNFTs, account]);

  useEffect(() => {
    if (nfts.length > 0) {
      if (length === nfts.length) setAssets(nfts);
    }
  }, [length, nfts]);

  useEffect(() => {
    if (!account || chain.chainId !== "0x13881") {
      setAssets([]);
      setNFTs([]);
      return;
    }

    getTokens();
  }, [getTokens, account, chain]);

  return {
    assets: assets,
    refetch: () => {
      setNFTs([]);
      getTokens();
    },
  } as const;
};
