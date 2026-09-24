export interface RegionalFootfallMetric {
  region: string;
  currentVisitors: number;
  capacityLimit: number;
  occupancyPercent: number;
  status: 'Critical Pressure' | 'Optimal Load' | 'Underutilised (High Potential)';
  decongestionTarget: string;
}

export interface DemandHeatmapData {
  timeWindow: string;
  totalActiveTravellers: number;
  divertedFootfallPercent: number;
  economicBenefitDistributedInr: number;
  regions: RegionalFootfallMetric[];
  sustainabilityIndex: number;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const govService = {
  async getDemandAnalytics(): Promise<DemandHeatmapData> {
    await delay(200);
    return {
      timeWindow: 'Live 24-Hour Telemetry (Gujarat Pilot)',
      totalActiveTravellers: 14820,
      divertedFootfallPercent: 28.4,
      economicBenefitDistributedInr: 4850000,
      sustainabilityIndex: 86,
      regions: [
        {
          region: 'Ahmedabad UNESCO Pol Corridor',
          currentVisitors: 6200,
          capacityLimit: 5000,
          occupancyPercent: 124,
          status: 'Critical Pressure',
          decongestionTarget: 'Divert to Patan Stepwells & Champaner-Pavagadh',
        },
        {
          region: 'Patan Heritage & Weaver Belt',
          currentVisitors: 1850,
          capacityLimit: 3500,
          occupancyPercent: 52,
          status: 'Optimal Load',
          decongestionTarget: 'Equilibrium maintained',
        },
        {
          region: 'Polo Ancient Forest Buffer',
          currentVisitors: 420,
          capacityLimit: 1200,
          occupancyPercent: 35,
          status: 'Underutilised (High Potential)',
          decongestionTarget: 'Recommended for nature & slow-travel intent',
        },
        {
          region: 'Little Rann Desert Sanctuary',
          currentVisitors: 280,
          capacityLimit: 800,
          occupancyPercent: 35,
          status: 'Underutilised (High Potential)',
          decongestionTarget: 'Recommended for eco-safari & astrophotography',
        },
      ],
    };
  },
};
