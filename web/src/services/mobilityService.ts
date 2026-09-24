import { SEED_DESTINATIONS, type SmartArrivalPoint, type VehicleRentalOption, type Mechanic } from '../data/seed';

export interface RouteSegment {
  mode: 'Train' | 'Bus' | 'Cab / Self-Drive' | 'Walking' | 'EV Shuttle';
  from: string;
  to: string;
  durationMinutes: number;
  distanceKm: number;
  status: 'Smooth' | 'Congested' | 'Terrain Alert' | 'Scenic Corridor';
  notes: string;
}

export interface SmartRoutePlan {
  origin: string;
  destinationId: string;
  destinationName: string;
  totalDurationMinutes: number;
  totalDistanceKm: number;
  arrivalPoint: SmartArrivalPoint;
  segments: RouteSegment[];
  carbonSavedKg: number;
  recommendedVehicleTypes: string[];
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mobilityService = {
  async getRoutePlan(originCity: string, destinationId: string): Promise<SmartRoutePlan> {
    await delay(200);
    const dest = SEED_DESTINATIONS.find(d => d.id === destinationId) ?? SEED_DESTINATIONS[0];
    
    let segments: RouteSegment[] = [];
    if (dest.id === 'polo-forest-sabarkantha') {
      segments = [
        { mode: 'Cab / Self-Drive', from: originCity, to: 'Idar Junction Toll Node', durationMinutes: 90, distanceKm: 105, status: 'Smooth', notes: '4-lane expressway with CCTV monitoring' },
        { mode: 'Cab / Self-Drive', from: 'Idar Junction', to: dest.arrivalPoint.name, durationMinutes: 35, distanceKm: 28, status: 'Terrain Alert', notes: 'Winding forest road without streetlights. Drive before dusk.' },
        { mode: 'Walking', from: dest.arrivalPoint.name, to: 'Sun Temple Ruins Site', durationMinutes: 12, distanceKm: 1.4, status: 'Scenic Corridor', notes: 'Shaded teak forest nature trail with stone marker guides' },
      ];
    } else if (dest.id === 'little-rann-kutch') {
      segments = [
        { mode: 'Cab / Self-Drive', from: originCity, to: 'Dasada Desert Staging', durationMinutes: 110, distanceKm: 98, status: 'Smooth', notes: 'State highway route with good fuel availability' },
        { mode: 'Cab / Self-Drive', from: 'Dasada Staging', to: 'Wild Ass Sanctuary Saltpan Entry', durationMinutes: 25, distanceKm: 14, status: 'Terrain Alert', notes: '4x4 desert trail. Tyre pressure must be reduced to 22 PSI.' },
      ];
    } else {
      segments = [
        { mode: 'Train', from: originCity, to: 'Kalupur Junction Terminal', durationMinutes: 45, distanceKm: 40, status: 'Smooth', notes: 'High-frequency electric intercity corridor' },
        { mode: 'EV Shuttle', from: 'Kalupur Terminal', to: dest.arrivalPoint.name, durationMinutes: 8, distanceKm: 1.5, status: 'Smooth', notes: 'Zero-emission direct shuttle to heritage zone gate' },
        { mode: 'Walking', from: dest.arrivalPoint.name, to: 'Historic Pol Core', durationMinutes: 6, distanceKm: 0.4, status: 'Scenic Corridor', notes: 'Pedestrianised carved wooden architecture walk' },
      ];
    }

    const totalDuration = segments.reduce((sum, s) => sum + s.durationMinutes, 0);
    const totalDist = segments.reduce((sum, s) => sum + s.distanceKm, 0);

    return {
      origin: originCity,
      destinationId: dest.id,
      destinationName: dest.name,
      totalDurationMinutes: totalDuration,
      totalDistanceKm: totalDist,
      arrivalPoint: dest.arrivalPoint,
      segments,
      carbonSavedKg: 4.8,
      recommendedVehicleTypes: dest.rentals.map(r => r.type),
    };
  },

  async getVehicleRentals(destinationId: string): Promise<VehicleRentalOption[]> {
    await delay(120);
    const dest = SEED_DESTINATIONS.find(d => d.id === destinationId) ?? SEED_DESTINATIONS[0];
    return dest.rentals;
  },

  async bookRental(rentalId: string, bookingDates: string): Promise<{ success: boolean; confirmationId: string; voucherCode: string }> {
    await delay(300);
    return {
      success: true,
      confirmationId: `YS-RENT-${Math.floor(100000 + Math.random() * 900000)}`,
      voucherCode: `VERIFIED-PASS-${rentalId.toUpperCase()}-${bookingDates.replace(/\s+/g, '')}`,
    };
  },

  async getNearbyMechanics(destinationId: string): Promise<Mechanic[]> {
    await delay(150);
    const dest = SEED_DESTINATIONS.find(d => d.id === destinationId) ?? SEED_DESTINATIONS[0];
    return dest.mechanics;
  }
};
