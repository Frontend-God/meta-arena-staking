/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/alt-text */

import Image from "next/image";
import styled from "styled-components";

import { Wallets } from "../constants";
import CloseIcon from "../assets/images/close.png";
import ArrowIcon from "../assets/images/Arrows.png";
import BotImg from "../assets/images/OneBot_Over_Shoulder.png";
import BotImg1 from "../assets/images/OneBot_Right.png";
import ShowMore from "../assets/images/Chevron.png";

import { ConnectButton } from "./Header";

import { Step } from "@types";
import { useConnected } from "hooks/useConnect";
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
  padding-top: 24px;
  margin: auto;

  @media (max-width: 992px) {
    width: 80%;
  }
`;

const Wallet = styled.div`
  width: 100%;
  border: 2px solid #0b0808;
  border-radius: 12px;
  margin: 12px 0px;
  height: 64px;
  padding: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #e45f35;
    border-color: #e45f35;
  }
`;

const WalletName = styled.div`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  margin-left: 18px;
  color: white;
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

const SelectBox: React.FC<SelectBoxProps> = ({ open, onClose }) => {
  const { connected, setConnected } = useConnected();
  const { step, setStep } = useStep();

  return (
    open && (
      <Container className="box-container">
        <Close
          onClick={() => {
            step === Step.CONNECTED ? onClose() : null;
          }}
          className={step === Step.CONNECTED ? "active" : ""}
        >
          <Image src={CloseIcon} layout="fill" />
        </Close>
        <BotBg>
          <Image src={connected ? BotImg : BotImg1} layout="responsive" />
        </BotBg>
        {connected ? (
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
              wagering to the first esports simulated leagues, all the while rewarding users will access to a robust NFT
              builder fully integrated with our own token. Get started now by connecting your wallet and staking an
              arena.
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
            <Title>CONNECT WALLET</Title>
            <Description>Choose one of the available wallet providers or create a new one</Description>
            <WalletContent>
              {Wallets.map((wallet, index) => (
                <Wallet
                  key={index}
                  onClick={() => {
                    setConnected(true);
                    setStep(Step.CONNECTED);
                  }}
                >
                  <Image src={wallet.logo} />
                  <WalletName>{wallet.name}</WalletName>
                </Wallet>
              ))}
              <WalletOptions>
                <div>
                  <span className="me-3">Show more</span>
                  <Image src={ShowMore} />
                </div>
                <div>What is wallet?</div>
              </WalletOptions>
            </WalletContent>
          </Content>
        )}
      </Container>
    )
  );
};

export default SelectBox;
