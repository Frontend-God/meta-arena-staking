/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

import styles from "../styles/Home.module.css";

import SideNav from "components/SideNav";
import TierCard from "components/Staking/Tier";
import { Token } from "@types";
import SelectBox from "components/Staking/SelectBox";
import TierBox from "components/Staking/TierBox";
import { useData } from "api";

const TiersContainer = styled.div`
  width: 100%;
  max-width: 350px;
`;

const Index = () => {
  const [selectedTier, setSelectedTier] = useState<Token>(null);
  const [openSelectBox, setOpenSelectBox] = useState<boolean>(true);
  const [openTierBox, setOpenTierBox] = useState<boolean>(false);
  const { account } = useMoralis();

  const { assets } = useData();

  console.log(assets);

  useEffect(() => {
    if (!account) {
      setOpenTierBox(false);
      setOpenSelectBox(true);
    }
  }, [account]);

  return (
    <>
      <SideNav />
      <div className={styles.container}>
        <TiersContainer>
          {account &&
            assets.map(
              (tier, index) =>
                tier.metadata && (
                  <TierCard
                    key={index}
                    props={tier}
                    active={selectedTier}
                    clickHandler={() => {
                      setSelectedTier(tier);
                      setOpenSelectBox(false);
                      setOpenTierBox(true);
                    }}
                  />
                ),
            )}
        </TiersContainer>
      </div>
      <SelectBox open={openSelectBox} onClose={() => setOpenSelectBox(false)} />
      <TierBox
        tier={selectedTier}
        open={openTierBox}
        onClose={() => {
          setOpenTierBox(false);
        }}
      />
    </>
  );
};

export default Index;
