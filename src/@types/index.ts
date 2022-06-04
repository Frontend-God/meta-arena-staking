/* eslint-disable @typescript-eslint/no-explicit-any */
export enum TooltipPlacement {
  TOP = "top",
  LEFT = "left",
  RIGHT = "right",
  BOTTOM = "bottom",
}

export interface Size {
  width: number | undefined;
  height: number | undefined;
}

export enum TierType {
  COMMON = "COMMON",
  UNCOMMON = "UNCOMMON",
  EPIC = "EPIC",
  RARE = "RARE",
  LEGENDARY = "LEGENDARY",
}

export type TierColor = {
  [key in TierType]: string;
};

export interface Tier {
  id?: number;
  img?: any;
  title?: string;
  type?: TierType;
  owner?: string;
  num?: string;
  level?: string;
}

export interface Token {
  token_address: string;
  token_id: string;
  owner_of: string;
  block_number: string;
  block_number_minted: string;
  token_hash?: string;
  amount?: string;
  contract_type: string;
  name: string;
  symbol: string;
  token_uri?: string;
  metadata?: any;
  synced_at?: string;
  last_token_uri_sync?: string;
  last_metadata_sync?: string;
  activated?: boolean;
  level?: string;
  tier?: string;
  staked?: boolean;
  canUpgrade?: boolean;
  timeToWaitForLevelUp?: string;
  type?: TierType;
}

export enum Step {
  INIT = "INIT",
  CONNECTING = "CONNECTING",
  CONNECTED = "CONNECTED",
}

export enum TierStep {
  INIT = "INIT",
  ACTIVATING = "ACTIVATING",
  ACTIVATED = "ACTIVATED",
  STAKING = "STAKING",
  STAKED = "STAKED",
}

export enum UpgradeStep {
  INIT = "INIT",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export interface WalletType {
  name: string;
  logo: any;
  connectorId: any;
}
