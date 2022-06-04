/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/alt-text */

import Image from "next/image";
import styled from "styled-components";

import NotificationBell from "../assets/images/Notification_Bell.png";
import Coins from "../assets/images/Coins.png";

import { Tier, TierType } from "@types";

interface TierProps {
  props: Tier;
  clickHandler: () => void;
  active: Tier;
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
`;

const TierContainer = styled.div<{ type: TierType }>`
  max-width: 280px;
  width: 100%;
  color: white;
  border-radius: 15px;
  padding: 30px 10px 30px 60px;
  margin-left: -50px;
  position: relative;

  ${({ type = TierType.COMMON }) => ({
    background:
      type == TierType.COMMON
        ? "radial-gradient(68.9% 84.33% at -31.8% 34.88%, rgba(101, 101, 101, 0.839) 0%, #292A34 100%)"
        : type == TierType.UNCOMMON
        ? "radial-gradient(68.9% 84.33% at -31.8% 34.88%, rgba(0, 250, 206, 0.839) 0%, #292A34 100%)"
        : "radial-gradient(68.9% 84.33% at -31.8% 34.88%, rgba(108, 5, 191, 0.839) 0%, #292A34 100%)",
  })}

  &:hover, &.active {
    border: 5px solid #00face;
    box-shadow: 0px 4px 8px #00face, inset 0 0 3px #00face;
  }
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
    color: type == TierType.COMMON ? "#B7B7B7" : type == TierType.UNCOMMON ? "#00FACE" : "#EB5EF6",
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
  font-family: 'Montserrat';
  font-weight: 700;
  font-size: 11px;
  line-height: 13px;
  display: flex;
  align-items: flex-end;
  letter-spacing: 0.18em;
  color: #00FACE;
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
        <Image src={props.img} layout="fill" />
      </TierImage>
      <TierContainer type={props.type} className={(active && active.id === props.id) ? "active" : ""}>
        <div className="position-relative">
          <TierStaking>
            <Image src={Coins} width="11px" height="11px" />
            <TierStakingText>STAKING ...</TierStakingText>
          </TierStaking>
          <TierTitle>{props.title}</TierTitle>
          <>
            <TierTypeText type={props.type}>{props.type}</TierTypeText>
            <TierNum>
              {" / "}
              TIER {props.num}
            </TierNum>
          </>
          <TierOwnerLabel>OWNER</TierOwnerLabel>
          <TierOwner>{props.owner}</TierOwner>
        </div>
        <TierNotificationBell>
          <Image src={NotificationBell} layout="fill" />
        </TierNotificationBell>
      </TierContainer>
    </TierContent>
  );
};

export default TierCard;
