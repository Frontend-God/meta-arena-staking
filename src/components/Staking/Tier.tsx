/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/alt-text */

import Image from "next/image";
import styled from "styled-components";

import NotificationBell from "../../assets/images/Notification_Bell.png";
import Coins from "../../assets/images/Coins.png";
import { TierColors, TierTextColors } from "../../constants";

import { TierType, Token } from "@types";
import truncate from "lib/truncate";

interface TierProps {
  props: Token;
  clickHandler: () => void;
  active: Token;
}

const TierContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

const TierImage = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  z-index: 10;
  border-radius: 50%;
  overflow: hidden;
`;

const TierContainer = styled.div<{ type: TierType }>`
  max-width: 280px;
  height: 150px;
  width: 100%;
  color: white;
  border-radius: 15px;
  padding: 30px 10px 30px 60px;
  margin-left: -50px;
  position: relative;

  ${({ type = TierType.COMMON }) => ({
    background: TierColors[type],
  })}

  &:hover .tier-container-border, &.active .tier-container-border {
    border: 5px solid #00face;
    box-shadow: 0px 4px 8px #00face, inset 0 0 3px #00face;
    border-radius: 15px;
  }
`;

const TierContainerBorder = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;

const TierTitle = styled.p`
  font-size: 18px;
  line-height: 20px;
  font-family: "Akira Expanded";
`;

const TierTypeText = styled.span<{ type: TierType }>`
  font-size: 13px;
  font-family: "Akira Expanded";
  ${({ type = TierType.COMMON }) => ({
    color: TierTextColors[type],
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
  font-weight: 800;
`;

const TierStaking = styled.div`
  position: absolute;
  display: flex;
  top: -18px;
  left: 0px;
  align-items: center;
`;

const TierStakingText = styled.p`
  font-family: "Montserrat";
  font-weight: 700;
  font-size: 11px;
  line-height: 13px;
  display: flex;
  align-items: flex-end;
  letter-spacing: 0.18em;
  color: #00face;
  margin-left: 5px;
`;

const TierNotificationBell = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
`;

const TierCard: React.FC<TierProps> = ({ props, clickHandler, active }) => {
  return (
    <TierContent onClick={() => clickHandler()}>
      <TierImage>
        {props.metadata && (
          <Image src={props.metadata.image.replace("ipfs://", "https://ipfs.moralis.io:2053/ipfs/")} layout="fill" />
        )}
      </TierImage>
      <TierContainer
        type={props.type}
        className={active && active.metadata.name === props.metadata.name ? "active" : ""}
      >
        <TierContainerBorder className="tier-container-border" />
        <div className="position-relative">
          <TierStaking>
            <Image src={Coins} width="11px" height="11px" />
            <TierStakingText>STAKING ...</TierStakingText>
          </TierStaking>
          <TierTitle>{props.metadata && props.metadata.name}</TierTitle>
          <>
            <TierTypeText type={props.type}>{props.type}</TierTypeText>
            <TierNum>
              {" / "}
              TIER {props.tier || 0}
            </TierNum>
          </>
          <TierOwnerLabel>OWNER</TierOwnerLabel>
          <TierOwner>{truncate(props.owner_of, 5, 4)}</TierOwner>
        </div>
        <TierNotificationBell className="bell">
          <Image src={NotificationBell} layout="fill" />
        </TierNotificationBell>
      </TierContainer>
    </TierContent>
  );
};

export default TierCard;
