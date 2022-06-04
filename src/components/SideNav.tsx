/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/alt-text */

import styled from "styled-components";
import Image from "next/image";

import LocationIcon from "../assets/images/location.png";
import ArenaIcon from "../assets/images/Arena.png";

const SideNavContent = styled.div`
  width: 80px;
  background: #22232e;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  padding-top: 88px;
  transition: 0.3s;

  @media (max-width: 992px) {
    left: -80px;
  }
`;

const SideNavItem = styled.div`
  margin-bottom: 15px;

  &:first-child {
    margin-top: 55px;
  }
`;

const SideNavIcon = styled.div`
  width: 48px;
  height: 48px;
  background: #292a34;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  justify-content: center;

  img {
    width: 100% !important;
    height: 100% !important;
  }
`;

const SideNavText = styled.p`
  font-size: 8px;
  font-weight: bold;
  margin-top: 5px;
  line-height: 10px;
  text-align: center;
  font-family: "Montserrat";
  color: #888fa2;

  &.active {
    color: #00face;
  }
`;

const SideNav = () => {
  const navs = [
    { menu: "MAP", icon: LocationIcon },
    { menu: "ARENAS", icon: ArenaIcon, active: true },
  ];

  return (
    <SideNavContent className="side-nav d-flex justify-content-center">
      <div>
        {navs.map((nav, index) => (
          <SideNavItem key={index}>
            <SideNavIcon>
              <Image src={nav.icon} />
            </SideNavIcon>
            <SideNavText className={nav.active ? "active" : ""}>{nav.menu}</SideNavText>
          </SideNavItem>
        ))}
      </div>
    </SideNavContent>
  );
};

export default SideNav;
