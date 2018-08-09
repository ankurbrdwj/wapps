
export interface Campaign {
  id: number;
  name: string;
  description: string;
  rulesFilename: string;
  prizes: Prize[];
  groups: string[];
  tiers: string[];
  manufacturers: string[];
  eligibilityRate: EligibilityRate[];
  rate: number;
  canRollover: boolean;
  isArchived: boolean;
  isAutoDraw: boolean;
  isAutoNotify: boolean;
  anticipationDuration: number;
  canEdit: boolean;
  status: string;
  isComplete: boolean;
}

export interface CampaignRequest {
  campaign: Campaign;
}

export interface Group {
  id: string;
  name: string;
}

export interface Tier {
  id: string;
  name: string;
}

export interface EligibilityRate {
  id: string ;
  type: string;
  rate: number;
  name: string;
}
export interface TableElement {
  name: string;
  type: string;
  multiplier: number;
}

export interface Prize {
  id: number;
  name: string;
  value: number;
  rolloverType: string;
  rolloverValue: number;
}
