/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/alt-text */
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { toast } from "react-toastify";

import TokenDetail from "../../assets/images/ESPORT Token.png";
import Clock from "../../assets/images/clock.png";
import ActivatingLine from "../../assets/images/activating_line.png";
import { ConnectButton } from "../Header";
import Meter from "../Meter";
import OldContractABI from "../../contracts/ArenasOld.json";
import NewContractABI from "../../contracts/MetaArenas.json";
import { TierColors, TierTextColors } from "../../constants";

import TierUpgradeBox from "./TierUpgradeBox";
import Staking from "./Staking";

import { TierStep, TierType, Token } from "@types";
import truncate from "lib/truncate";
import { useData } from "api";

interface TierBoxProps {
  tier?: Token;
  open: boolean;
  onClose: () => void;
}

const Container = styled.div<{ type: TierType }>`
  padding: 50px 80px 20px 160px;

  ${({ type = TierType.COMMON }) => ({
    background: TierColors[type]
  })}

  @media(max-width: 992px) {
    padding: 30px;
    overflow: auto;
  }
`;

const TierImage = styled.div`
  width: 260px;
  height: 260px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0px 10px 2px rgba(0, 0, 0, 0.161));
  overflow: hidden;
  border-radius: 50%;

  @media (max-width: 992px) {
    position: initial;
    top: 0;
    left: 50%;
    transform: unset;
    margin: auto;
    margin-bottom: 20px;
  }
`;

const Title = styled.p`
  font-family: "Akira Expanded";
  font-weight: 400;
  font-size: 25px;
  line-height: 29px;
  color: white;
`;

const TierTypeText = styled.span<{ type: TierType }>`
  font-size: 13px;
  font-family: "Akira Expanded";
  ${({ type = TierType.COMMON }) => ({
    color: TierTextColors[type]
  })}
  line-height: 15px;
`;

const TierNum = styled.span`
  font-size: 13px;
  font-family: "Akira Expanded";
  color: #dbdbdb;
  line-height: 15px;
`;

const TierOwnerLabel = styled.p`
  font-size: 13px;
  line-height: 15px;
  font-family: "Akira Expanded";
  color: white;
  margin-top: 5px;
`;

const TierOwner = styled.p`
  font-size: 13px;
  line-height: 16px;
  font-family: "Montserrat";
  color: #dbdbdb;
  margin-top: 5px;
`;

const TierDesc = styled.div`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #dbdbdb;
`;

const TierActive = styled.div`
  margin: 17px 0;
  margin-left: 50px;
`;

const TierGuide = styled.div`
  font-family: "Montserrat";
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  color: #00face;
`;

const TierActivatingAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.95);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const TierActivating = styled.div`
  margin-top: 40px;
  font-family: "Akira Expanded";
  font-weight: 700;
  font-size: 35px;
  line-height: 40px;
  color: #00face;
  animation: ${TierActivatingAnimation} 1.2s infinite;
`;

const TierTimeStaked = styled.div`
  display: flex;
  align-items-center;
  font-family: 'Montserrat';
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #DBDBDB;
  margin-top: 5px;

  span {
    margin-left: 9px;
  }
`;

const TierDetailContent = styled.div`
  position: relative;
  display: inline-flex;
  margin: 15px 0;
`;

const TierDetailContentImg = styled.div`
  position: absolute;
  left: -5px;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 34px;
  height: 34px;
`;

const TierDetailBox = styled.div`
  background: rgba(0, 0, 0, 0.19);
  padding: 9px 7px 12px;

  &:first-child {
    padding-left: 23px;
    border-radius: 10px 0 0 10px;
  }

  &:last-child {
    padding-right: 23px;
    margin-left: 3px;
    border-radius: 0 10px 10px 0;
  }
`;

const TimeChart = styled.div`
  width: 36%;
  position: absolute;
  right: 40px;
  top: 30px;
  background: radial-gradient(50% 50% at 50% 50%, #000000 0%, rgba(102, 102, 102, 0) 100%);
  border-radius: 50%;

  @media (max-width: 992px) {
    width: 280px;
    left: 50%;
    top: 10px;
    transform: translateX(-50%);
  }
`;

const TimeChartContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const TimtChartLabel = styled.p`
  font-family: "Montserrat";
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.18em;
  color: #ffffff;
`;

const TimeChartLevel = styled.p`
  color: #00face;
  font-family: "Akira Expanded";
  font-style: normal;
  font-weight: 400;
  font-size: 85.5284px;
  line-height: 98px;
  letter-spacing: 0.05em;
`;

const TimeChartText = styled.p`
  font-family: "Montserrat";
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.18em;
  color: white;
`;

const TierUpgradeAnimation = keyframes`
0% {
  outline: none;
}

15% {
  outline: 14px solid #215453;
}

30% {
  outline: none;
}

45% {
  outline: 14px solid #215453;
}

100% {
  outline: none;
}
`;

const TierUpgrade = styled.div`
  width: 76px;
  height: 76px;
  background: #7f8596;
  border-radius: 50px;
  position: absolute;
  bottom: 5px;
  right: 5px;
  text-align: center;
  padding-top: 5px;
  transition: 0.3s;

  &.active {
    background: #00face;
    cursor: pointer;
    animation: ${TierUpgradeAnimation} 1.5s infinite;
  }
`;

const TierUpgradeLabel = styled.p<{ upgradeReady: boolean }>`
  font-family: "Montserrat";
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  letter-spacing: 0.15em;
  ${({ upgradeReady = false }) => ({
    color: upgradeReady ? "#292A34" : "white",
  })}
`;

const TierUpgradeNum = styled.p<{ upgradeReady: boolean }>`
  font-family: "Akira Expanded";
  font-weight: 400;
  font-size: 32px;
  line-height: 37px;
  text-align: center;
  ${({ upgradeReady = false }) => ({
    color: upgradeReady ? "#292A34" : "white",
  })}
`;

const TierActivatingBGAnimation = keyframes`
  0%
  {
    max-height: 0%;
  }

  100%
  {
    max-height: 100%;
  }
`;

const TierActivatingImage = styled.div`
  background: radial-gradient(109.96% 100% at 49.9% 100%, #00face 0%, #2a786a 74.28%, #000000 100%);
  position: absolute;
  width: 100%;
  height: 100%;
  max-height: 0%;
  top: 0;
  left: 0;
  opacity: 0.75;
  animation: ${TierActivatingBGAnimation} 3s infinite;
`;

const TierActivatingLine = styled.div`
  position: absolute;
  width: 150%;
  left: 50%;
  bottom: 20px;
  transform: translate(-50%, -50%);
  height: 30px;
`;

const TierBox: React.FC<TierBoxProps> = ({ tier, open, onClose }) => {
  const [tierStep, setStep] = useState<TierStep>(TierStep.INIT);
  const [upgradeReady, setUpgradeReady] = useState<boolean>(false);
  const [upgradeOpen, setUpgradeOpen] = useState<boolean>(false);
  const contractProcessor = useWeb3ExecuteFunction();
  const { getTokens } = useData();

  useEffect(() => {
    if (tier) {
      setStep(TierStep.INIT);
      if (tier.activated) setStep(TierStep.ACTIVATED);
      if (tier.staked) setStep(TierStep.STAKED);
    }
  }, [setStep, tier]);

  // useEffect(() => {
  //   if (tierStep === TierStep.STAKED) {
  //     let n = level;
  //     const myTimer = setInterval(() => {
  //       if (n === 25) {
  //         clearInterval(myTimer);
  //         setUpgradeReady(true);
  //       } else {
  //         n++;
  //         setLevel(n);
  //       }
  //     }, 1000);

  //     return () => clearInterval(myTimer);
  //   }
  // }, [level, tierStep]);

  const activateArena = async (id: string) => {
    const approveOption = {
      contractAddress: process.env['NEXT_PUBLIC_OLD_ARENA_ADDRESS'],
      abi: OldContractABI.abi,
      functionName: "approve",
      params: {
        to: process.env['NEXT_PUBLIC_META_ARENA_ADDRESS'],
        tokenId: id,
      },
    };

    await contractProcessor.fetch({
      params: approveOption,

      onSuccess: (data: any) => {
        toast.info("Approving!");
        data.wait(1).then(async (tx) => {
          if (tx.status == 1) toast.success("Approve Success");
          const migrateOption = {
            contractAddress: process.env['NEXT_PUBLIC_META_ARENA_ADDRESS'],
            abi: NewContractABI.abi,
            functionName: "migrateArena",
            params: {
              _tokenId: id,
            },
          };

          await contractProcessor.fetch({
            params: migrateOption,

            onSuccess: (data: any) => {
              setStep(TierStep.ACTIVATING);
              toast.info("Activating Arena!");
              data.wait(1).then((tx) => {
                if (tx.status == 1) {
                  toast.success("Activate Success");
                  setStep(TierStep.ACTIVATED);
                  getTokens();
                }
              });
            },
            onError: (err: any) => {
              setStep(TierStep.INIT);
              if (err.code === 4001) toast.error("Activating Rejected!");
              else toast.error(err.message);
            },
          });
        });
      },
      onError: (err: any) => {
        if (err.code === 4001) toast.error("Approve Rejected!");
        else toast.error(err.message);
      },
    });
  };

  const stakeArena = async (id: string) => {
    const stakeOption = {
      contractAddress: process.env['NEXT_PUBLIC_META_ARENA_ADDRESS'],
      abi: NewContractABI.abi,
      functionName: "stakeArena",
      params: {
        _arenaTokenId: id,
      },
    };

    await contractProcessor.fetch({
      params: stakeOption,

      onSuccess: (data: any) => {
        setStep(TierStep.STAKING);
        toast.info("Staking Arena!");
        data.wait(1).then((tx) => {
          if (tx.status == 1) {
            toast.success("Stake Success");
            setStep(TierStep.STAKED);
            getTokens();
          }
        });
      },
      onError: (err: any) => {
        setStep(TierStep.ACTIVATED);
        if (err.code === 4001) toast.error("Staking Rejected!");
        else toast.error(err.message);
      },
    });
  };

  const unstakeArena = async (id: string) => {
    const stakeOption = {
      contractAddress: process.env['NEXT_PUBLIC_META_ARENA_ADDRESS'],
      abi: NewContractABI.abi,
      functionName: "unstakeArena",
      params: {
        _arenaTokenId: id,
      },
    };

    await contractProcessor.fetch({
      params: stakeOption,

      onSuccess: (data: any) => {
        toast.info("Unstaking Arena!");
        data.wait(1).then((tx) => {
          if (tx.status == 1) {
            toast.success("Unstake Success");
            setStep(TierStep.ACTIVATED);
            getTokens();
          }
        });
      },
      onError: (err: any) => {
        if (err.code === 4001) toast.error("Unstaking Rejected!");
        else toast.error(err.message);
      },
    });
  };

  return (
    <>
      {open && (
        <Container type={tier.type} className={"box-container"}>
          <TierImage>
            {tierStep !== TierStep.STAKING && tier.metadata && (
              <Image layout="fill" src={tier.metadata.image.replace("ipfs://", "https://ipfs.moralis.io:2053/ipfs/")} />
            )}

            {tierStep === TierStep.ACTIVATING && (
              <TierActivatingImage>
                <TierActivatingLine>
                  <Image src={ActivatingLine} layout="responsive" />
                </TierActivatingLine>
              </TierActivatingImage>
            )}
            {tierStep === TierStep.STAKING && <Staking />}
          </TierImage>
          <Title>{tier.metadata && tier.metadata.name}</Title>
          <>
            <TierTypeText type={tier.type}>{tier.type}</TierTypeText>
            <TierNum>
              {" / "}Level {tier.level || 0}
            </TierNum>
            <TierNum>
              {" / "}TIER {tier.tier || 0}
            </TierNum>
          </>
          <TierOwnerLabel className="mt-2">OWNER</TierOwnerLabel>
          <TierOwner>{truncate(tier.owner_of, 5, 4)}</TierOwner>
          {tierStep === TierStep.INIT ? (
            <>
              <TierDesc className="mt-2">
                As an arena owner, you have the ability to stake your arena and earn
                <br /> $ESPORT on an hourly basis! Stake more arenas to earn even more!
                <br />
                Activate your arena by clicking the button below.
              </TierDesc>
              <TierActive>
                <ConnectButton onClick={() => activateArena(tier.token_id)}>ACTIVATE ARENA</ConnectButton>
              </TierActive>
            </>
          ) : tierStep === TierStep.ACTIVATING ? (
            <TierActivating>ARENA ACTIVATING_</TierActivating>
          ) : tierStep === TierStep.ACTIVATED ? (
            <>
              <TierDesc className="mt-2">
                Your Arena has now evolved into a METARENA! Now it’s time to start
                <br /> earning $ESPORT and unlock a vast array of new features, cosmetics,
                <br /> customizations, and more!
              </TierDesc>
              <TierActive>
                <ConnectButton onClick={() => stakeArena(tier.token_id)}>STAKE ARENA</ConnectButton>
              </TierActive>
            </>
          ) : tierStep === TierStep.STAKING ? (
            <TierActivating>STAKING_ARENA</TierActivating>
          ) : tierStep === TierStep.STAKED ? (
            <>
              <TierOwnerLabel style={{ marginTop: "15px" }}>TIME STAKED</TierOwnerLabel>
              <TierTimeStaked>
                <Image src={Clock} />
                <span>
                  <b>1</b>HR
                </span>
                <span>
                  <b>00</b>DAYS
                </span>
                <span>
                  <b>33</b>MIN
                </span>
              </TierTimeStaked>
              <TierDetailContent>
                <TierDetailContentImg>
                  <Image src={TokenDetail} layout="fill" />
                </TierDetailContentImg>
                <div className="d-flex">
                  <TierDetailBox>
                    <TierOwnerLabel className="mt-0">Earned</TierOwnerLabel>
                    <TierGuide className="mt-1">940</TierGuide>
                  </TierDetailBox>
                  <TierDetailBox>
                    <TierOwnerLabel className="mt-0">AVAILABLE</TierOwnerLabel>
                    <TierGuide className="mt-1">10,000</TierGuide>
                  </TierDetailBox>
                </div>
              </TierDetailContent>
              <TimeChart>
                <Meter value={Number(tier.level)} />
                <TimeChartContent>
                  <TimtChartLabel>LEVEL</TimtChartLabel>
                  <TimeChartLevel>{tier.level}</TimeChartLevel>
                  <TimeChartText>380XP / 400XP</TimeChartText>
                </TimeChartContent>
              </TimeChart>
              <TierUpgrade
                onClick={
                  upgradeReady
                    ? () => {
                        setUpgradeOpen(true);
                        onClose();
                      }
                    : null
                }
                className={upgradeReady ? "active" : ""}
              >
                <TierUpgradeLabel upgradeReady={upgradeReady}>TIER</TierUpgradeLabel>
                <TierUpgradeNum upgradeReady={upgradeReady}>{upgradeReady ? 2 : tier.tier}</TierUpgradeNum>
                {upgradeReady && (
                  <TierUpgradeLabel
                    style={{ fontSize: "7px", fontFamily: "Akira Expanded", marginTop: "-5px" }}
                    upgradeReady={upgradeReady}
                  >
                    UPGRADE
                  </TierUpgradeLabel>
                )}
              </TierUpgrade>
            </>
          ) : (
            <>sfsfsdf</>
          )}
          {tierStep !== TierStep.ACTIVATING && tierStep !== TierStep.STAKING && (
            <>
              <TierDesc>How does staking work? </TierDesc>
              <TierGuide>Read FAQ</TierGuide>
              {tierStep === TierStep.STAKED ? (
                <TierDesc
                  onClick={() => unstakeArena(tier.token_id)}
                  style={{ marginTop: "21px", cursor: 'pointer' }}
                >
                  Unstake Arena
                </TierDesc>
              ) : (
                <TierGuide style={{ marginTop: "21px" }}>View on OpenSea</TierGuide>
              )}
            </>
          )}
        </Container>
      )}

      <TierUpgradeBox
        open={upgradeOpen}
        tier={tier}
        onClose={() => {
          setUpgradeOpen(false);
          setUpgradeReady(false);
        }}
      />
    </>
  );
};

export default TierBox;
