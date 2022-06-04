/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/alt-text */

import Image from "next/image";
import styled from "styled-components";
import { useChain, useMoralis } from "react-moralis";

import { Wallets } from "../../constants";
import CloseIcon from "../../assets/images/close.png";
import ArrowIcon from "../../assets/images/Arrows.png";
import BotImg from "../../assets/images/OneBot_Over_Shoulder.png";
import BotImg1 from "../../assets/images/OneBot_Right.png";
import ShowMore from "../../assets/images/Chevron.png";
import { ConnectButton } from "../Header";

import { Step } from "@types";
import { useStep } from "hooks/useStep";

interface SelectBoxProps {
  open: boolean;
  onClose: () => void;
}

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
  cursor: not-allowed;
  opacity: 0.3;

  &.active {
    cursor: pointer;
    opacity: 1;
  }
`;

const Content = styled.div`
  padding: 45px 15px 25px;
  text-align: center;
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

const ClickArena = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  font-family: "Akira Expanded";
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: #00face;
`;

const Guide = styled.div`
  margin-top: 15px;
  font-size: 13px;
  line-height: 16px;
  font-family: "Montserrat";
  color: #f3f3f3;

  div:last-child {
    color: #00face;
  }
`;

const WelcomeContent = styled.div`
  width: 70%;
  color: #f3f3f3;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  margin: auto;
  @media (max-width: 768px) {
    width: 60%;
  }
`;

const WalletContent = styled.div`
  width: 45%;
  margin: auto;
  padding-top: 12px;

  @media (max-width: 992px) {
    width: 85%;
  }
`;

const Wallet = styled.div`
  width: 100%;
  border-radius: 50px;
  margin: 12px 0px;
  height: 60px;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background: #333742;
  text-transform: uppercase;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid #00face;
  }

  &:hover .wallet-name {
    color: #00face !important;
  }
`;

const WalletName = styled.div`
  font-family: "Montserrat";
  font-style: normal;
  font-size: 16px;
  line-height: 24px;
  margin-left: 18px;
  color: white;
  letter-spacing: 0.2rem;
`;

const WalletOptions = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  aiign-items: center;
  font-family: "Montserrat";
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  color: white;
`;

const ShowMoreIcon = styled.div`
  position: relative;
  width: 15px;
`;

const SelectBox: React.FC<SelectBoxProps> = ({ open, onClose }) => {
  const { step, setStep } = useStep();
  const { authenticate, account } = useMoralis();
  const { switchNetwork } = useChain();

  return (
    open && (
      <Container className="box-container">
        <Close
          onClick={() => {
            account ? onClose() : null;
          }}
          className={account ? "active" : ""}
        >
          <Image src={CloseIcon} layout="fill" />
        </Close>
        <BotBg>
          <Image src={account ? BotImg : BotImg1} layout="responsive" />
        </BotBg>
        {account ? (
          <Content>
            <Title>SELECT YOUR ARENA</Title>
            <Description>
              Now that your wallet is connected, <b>select one of your arenas to the left.</b> In the near future, this
              will be your Arena Dashboard, filled with ways to maximize your arena to its full potential! For now, you
              can stake your Arenas and earn some $ESPORT!
            </Description>
            <ClickArena>
              <Image width="35" height="18" src={ArrowIcon} />
              <span className="ms-2">Click on an arena</span>
            </ClickArena>
            <Guide>
              <div>Don’t have an Arena?</div>
              <div>Buy on OpenSea</div>
            </Guide>
            <Guide>
              <div>New to Esports One? </div>
              <div>Read the FAQ</div>
            </Guide>
          </Content>
        ) : step === Step.INIT ? (
          <Content>
            <Title>WELCOME TO ESPORTS ONE</Title>
            <WelcomeContent className="mt-3 pb-4">
              Use your arena to host a variety of virtual events and experiences, from fantasy esports to skill-based
              wagering to the first esports sim leagues, all the while rewarding engagement with our own tokens. You can
              get started now by connecting your wallet and staking an arena.
            </WelcomeContent>
            <ConnectButton onClick={() => setStep(Step.CONNECTING)} className="mx-auto mt-4">
              CONNECT WALLET
            </ConnectButton>
            <Guide>
              <div>Don’t have an Arena?</div>
              <div>Buy on OpenSea</div>
            </Guide>
            <Guide>
              <div>New to Esports One? </div>
              <div>Read the FAQ</div>
            </Guide>
          </Content>
        ) : (
          <Content>
            <Title>CONNECT YOUR WALLET</Title>
            <WalletContent>
              {Wallets.map(({name, logo, connectorId}, index) => (
                <Wallet
                  key={index}
                  onClick={async () => {
                    try {
                      await authenticate({ provider: connectorId });
                      await switchNetwork('0x13881');
                      window.localStorage.setItem("connectorId", connectorId);
                      setStep(Step.CONNECTED);
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                >
                  <div className="position-relative" style={{ width: "30px" }}>
                    <Image layout="responsive" src={logo} />
                  </div>
                  <WalletName className="wallet-name">{name}</WalletName>
                </Wallet>
              ))}
              <WalletOptions>
                <div className="d-flex align-items-center">
                  <span className="me-2 active-color">Show More</span>
                  <ShowMoreIcon>
                    <Image layout="responsive" src={ShowMore} />
                  </ShowMoreIcon>
                </div>
                <div className="active-color">What's a wallet?</div>
              </WalletOptions>
            </WalletContent>
          </Content>
        )}
      </Container>
    )
  );
};

export default SelectBox;
