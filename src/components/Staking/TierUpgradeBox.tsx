/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";

import BotImg1 from "../../assets/images/OneBot_Right.png";
import CloseIcon from "../../assets/images/close.png";
import UpgradeImage from "../../assets/images/Upgrade Image.png";
import { ConnectButton } from "../Header";
import ConfettiAnimation from "../ConfettiAnimation";

import { Tier, UpgradeStep } from "@types";

const Container = styled.div`
  @media (max-width: 992px) {
    max-width: 560px;
  }
`;

const BotBg = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 116px;

  @media (max-width: 992px) {
    width: 70px;
    top: 40%;
  }
`;

const Close = styled.div`
  width: 14px;
  height: 14px;
  position: absolute;
  top: 13px;
  right: 13px;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 45px 15px 25px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 24px;
  font-family: "Akira Expanded";
  line-height: 28px;
  color: white;
  letter-spacing: 0.05em;
`;

const Description = styled.div`
  font-family: "Montserrat";
  font-size: 13px;
  line-height: 20px;
  color: #f3f3f3;
  width: 60%;
  margin: auto;
  margin-top: 20px;
`;

const TierNewFeature = styled.p`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: 0.18em;
  color: #f3f3f3;
  margin-top: 10px;
`;

const LearnMore = styled.p`
  font-family: "Montserrat";
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #00face;
  margin-top: 5px;
`;

const TierImage = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  filter: drop-shadow(0px 10px 6px rgba(0, 0, 0, 0.16));
  border: 3px solid #00face;
  border-radius: 50%;

  @media (max-width: 992px) {
    width: 80px;
    height: 80px;
  }
`;

const Button = styled(ConnectButton)`
  width: 150px;
`;

interface TierUpgradeBoxProps {
  tier: Tier;
  open: boolean;
  onClose: () => void;
}

const TierUpgradeBox: React.FC<TierUpgradeBoxProps> = ({ tier, open, onClose }) => {
  const [step, setStep] = useState<UpgradeStep>(UpgradeStep.INIT);

  useEffect(() => {
    setStep(UpgradeStep.INIT);
  }, [tier]);

  return (
    <>
      {open && (
        <Container className="box-container">
          <Close
            onClick={() => {
              onClose();
              setStep(UpgradeStep.INIT);
            }}
          >
            <Image src={CloseIcon} layout="fill" />
          </Close>
          <BotBg>
            <Image src={BotImg1} layout="responsive" />
          </BotBg>
          <Content>
            <Title>
              {step === UpgradeStep.INIT
                ? "UPGRADE AVAILABLE!"
                : step === UpgradeStep.PENDING
                ? "PAYMENT INFORMATION"
                : "CONGRATULATIONS!"}
            </Title>
            {step === UpgradeStep.INIT ? (
              <>
                <Description>
                  You are now at <b>Tier2</b> and are eligible for the following upgrades: <br />
                </Description>
                <TierNewFeature>FANTASY ESPORTS</TierNewFeature>
                <LearnMore>Learn More</LearnMore>
                <TierImage style={{ marginTop: "1.5%" }} className="mb-4">
                  <Image src={UpgradeImage} layout="fill" />
                </TierImage>
              </>
            ) : step === UpgradeStep.PENDING ? (
              <>
                <Description>Details of payment mechanism here</Description>
                <TierNewFeature>FANTASY ESPORTS</TierNewFeature>
                <TierImage style={{ marginTop: "5%" }} className="mb-4">
                  <Image src={UpgradeImage} layout="fill" />
                </TierImage>
              </>
            ) : (
              <>
                <Description>
                  You’ve activated the following experiences:
                  <br />
                </Description>
                <TierNewFeature>FANTASY ESPORTS</TierNewFeature>
                <LearnMore>Learn More</LearnMore>
                <TierImage style={{ marginTop: "1.5%" }} className="mb-4">
                  <Image src={UpgradeImage} layout="fill" />
                </TierImage>
              </>
            )}
            <Button
              onClick={() => {
                step === UpgradeStep.INIT
                  ? setStep(UpgradeStep.PENDING)
                  : step === UpgradeStep.PENDING
                  ? setStep(UpgradeStep.COMPLETED)
                  : null;
              }}
            >
              {step === UpgradeStep.COMPLETED ? "SHARE" : "UPGRADE"}
            </Button>
          </Content>
        </Container>
      )}
      {step === UpgradeStep.COMPLETED && <ConfettiAnimation />}
    </>
  );
};

export default TierUpgradeBox;
