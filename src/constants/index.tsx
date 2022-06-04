/* eslint-disable prettier/prettier */

import Tier1 from "../assets/images/common_arena.png";
import Tier2 from "../assets/images/uncommon_arena.png";
import Tier3 from "../assets/images/epic_arena.png";
import Metamask from "../assets/images/metamask_wallet.png";
import Coinbase from "../assets/images/coinbase_wallet.png";
import Trust from "../assets/images/trust_wallet.png";
import Rainbow from "../assets/images/rainbow_wallet.png";

import { Tier, TierColor, TierType, WalletType } from "@types";

export const HEADER_MENUS = [
  { menu: "GAMEPLAY", link: "/gameplay" },
  { menu: "BLOG", link: "blog.esportsone.com" },
  { menu: "DISCORD", link: "https://discord.gg/e1" },
  { menu: "FAQ", link: "/faq" },
  { menu: "WHITEPAPER", link: "https://whitepaper.esportsone.com" },
];

export const Tiers: Tier[] = [
  { id: 1, img: Tier1, title: "ARENA 123", type: TierType.COMMON, owner: "MiK071", num: "01", level: "21" },
  { id: 2, img: Tier2, title: "ARENA 152", type: TierType.UNCOMMON, owner: "MiK071", num: "01", level: "21" },
  { id: 3, img: Tier3, title: "ARENA 313", type: TierType.EPIC, owner: "MiK071", num: "01", level: "21" },
];

export const Wallets: WalletType[] = [
  { name: "Metamask", logo: Metamask, connectorId: "injected" },
  { name: "Coinbase Wallet", logo: Coinbase, connectorId: "injected" },
  { name: "Trust Wallet", logo: Trust, connectorId: "injected" },
  { name: "Rainbow", logo: Rainbow, connectorId: "injected" },
];

export const TierColors: TierColor = {
  COMMON: "radial-gradient(68.9% 84.33% at -31.8% 34.88%, rgba(101, 101, 101, 0.839) 0%, #292A34 100%)",
  UNCOMMON: "radial-gradient(68.9% 84.33% at -31.8% 34.88%, rgba(0, 250, 206, 0.839) 0%, #292A34 100%)",
  EPIC: "radial-gradient(68.9% 84.33% at -31.8% 34.88%, rgba(108, 5, 191, 0.839) 0%, #292A34 100%)",
  RARE: "radial-gradient(68.9% 84.33% at -31.8% 34.88%, rgba(9, 73, 125, 0.839) 0%, #292A34 100%)",
  LEGENDARY: "radial-gradient(68.9% 84.33% at -31.8% 34.88%, rgba(176, 5, 178, 0.839) 0%, #292A34 100%)",
};

export const TierTextColors: TierColor = {
  COMMON: "#B7B7B7",
  UNCOMMON: "#00FACE",
  EPIC: "#EB5EF6",
  RARE: "#76C0FF",
  LEGENDARY: "#B714B8"
}