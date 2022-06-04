/* eslint-disable jsx-a11y/alt-text */
import styled from "styled-components";
import Image from "next/image";

import CloseIcon from "../assets/images/close.png";
import BotImg from "../assets/images/OneBot_Right.png";

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 780px;
  min-height: 375px;
  background: radial-gradient(88.2% 115.64% at 53.47% 160.76%, #00face 0%, #292a34 100%);
  border-radius: 10px;
`;

const BotBg = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 116px !important;
`;

const Close = styled.div`
  width: 14px;
  height: 14px;
  position: absolute;
  top: 13px;
  right: 13px;

  img {
    width: 100% !important;
    height: 100% !important;
  }
`;

const ConnectWallet = () => {
  return (
    <Container>
      <Close>
        <Image src={CloseIcon} />
      </Close>
      <BotBg>
        <Image src={BotImg} />
      </BotBg>
    </Container>
  );
};

export default ConnectWallet;
