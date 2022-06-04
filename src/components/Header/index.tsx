/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import Link from "next/link";
// import useNav from "../../hooks/useNav";
import styled, { keyframes } from "styled-components";
import { useMoralis } from "react-moralis";

import Logo from "../../assets/images/logo.png";
import { HEADER_MENUS } from "../../constants";
import MetamaskLogo from "../../assets/images/metamask_wallet.png";
import ProfileImg from "../../assets/images/profile.png";
import Spinner from "../../assets/images/spinner.png";
import Clipboard from "../../assets/images/copy.png";
import truncate from "../../lib/truncate";

import NavbarToggler from "./NavbarToggler";

import { useStep } from "hooks/useStep";
import { Step, TooltipPlacement } from "@types";
import TooltipDemo from "components/Tooltip";

export const ConnectButton = styled.div`
  width: 194px;
  height: 38px;
  background: #00face;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #090506;
  font-family: "Akira Expanded";
  font-size: 12px;
  line-height: 22px;
  letter-spacing: 0.01em;
  cursor: pointer;
`;

const ConnectingWallet = styled.div`
  display: flex;
  align-items: center;
  font-family: "Akira Expanded";
  font-size: 12px;
  line-height: 22px;
  letter-spacing: 0.01em;
  color: white;
`;

const SpinnerAnimation = keyframes`
0%
  {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg)
  }
`;

const ConnectingSpinner = styled.div`
  width: 24px;
  height: 24px;
  animation: ${SpinnerAnimation} 1s infinite;

  img {
    width: 100% !important;
    height: 100% !important;
  }
`;

const SiteLogo = styled.div`
  width: 200px;
  position: relative;
`;

const Navbar = () => {
  const { step, setStep } = useStep();
  const { account } = useMoralis();

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  return (
    <>
      <nav id="header" className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="navbar-container d-flex justify-content-between">
          <div className="d-flex align-items-center w-100">
            <div className="navbar-brand pointer p-0">
              <Link href="/" passHref>
                <SiteLogo>
                  <Image src={Logo} />
                </SiteLogo>
              </Link>
            </div>
            <div className="navbar-menus collapse navbar-collapse justify-content-between" id="navbarContent">
              <ul className="navbar-nav mb-2 mb-lg-0 align-items-lg-center">
                {HEADER_MENUS.map((nav, index) => (
                  <li key={index} className="nav-item">
                    <Link
                      // className={`nav-link white px-0 py-2 pointer ${router.asPath === nav.link && "active"}`}
                      href={nav.link}
                    >
                      {nav.menu}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="wallet-connect-section">
                {account ? (
                  <div className="d-flex align-items-center">
                    <div className="d-flex justify-content-between align-items-center wallet-connect">
                      <Image src={MetamaskLogo} width="24" height="22" />
                      <div className="wallet-address ms-2">{truncate(account, 6, 4)}</div>
                      <TooltipDemo placement={TooltipPlacement.TOP} title="Copy address to clipboard">
                        <div className="ms-2 d-flex wallet-address-clipboard">
                          <Image onClick={() => copyAddress(account)} src={Clipboard} width="20" height="18" />
                        </div>
                      </TooltipDemo>
                    </div>
                    <div className="wallet-profile ms-3">
                      <Image layout="fill" src={ProfileImg} />
                    </div>
                  </div>
                ) : step === Step.INIT ? (
                  <ConnectButton onClick={() => setStep(Step.CONNECTING)}>CONNECT WALLET</ConnectButton>
                ) : (
                  <ConnectingWallet>
                    <ConnectingSpinner>
                      <Image src={Spinner} />
                    </ConnectingSpinner>
                    <span className="ms-3">CONNECTING...</span>
                  </ConnectingWallet>
                )}
              </div>
            </div>
          </div>
          <button
            className="navbar-toggler border-0 outline-none p-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <NavbarToggler />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
