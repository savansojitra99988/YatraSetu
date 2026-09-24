import { SEED_DESTINATIONS, type SafetyIndicatorData, type Mechanic } from '../data/seed';

export interface EmergencyContact {
  role: string;
  name: string;
  phone: string;
  availability: string;
  isVerifiedGov: boolean;
}

export interface OfflineTripPack {
  destinationName: string;
  downloadedAt: string;
  itinerarySummary: string;
  offlineCoordinates: { lat: number; lng: number };
  emergencyContacts: EmergencyContact[];
  offlineMechanics: Mechanic[];
  survivalNotes: string[];
  safeNodes: string[];
  sizeKb: number;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const safetyService = {
  async getSafetyIndicator(destinationId: string): Promise<SafetyIndicatorData> {
    await delay(150);
    const dest = SEED_DESTINATIONS.find(d => d.id === destinationId) ?? SEED_DESTINATIONS[0];
    return dest.safety;
  },

  async triggerSOS(destinationId: string, currentGps?: { lat: number; lng: number }): Promise<{
    status: 'DISPATCHED_SIMULATION';
    incidentId: string;
    timestamp: string;
    locationShared: string;
    notifiedAuthorities: string[];
    nearestHospital: { name: string; distanceKm: number; phone: string };
    nearestPolice: { station: string; distanceKm: number; phone: string };
  }> {
    await delay(350);
    const dest = SEED_DESTINATIONS.find(d => d.id === destinationId) ?? SEED_DESTINATIONS[0];
    const coords = currentGps || dest.coordinates;

    return {
      status: 'DISPATCHED_SIMULATION',
      incidentId: `SOS-INCI-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toLocaleTimeString(),
      locationShared: `${coords.lat.toFixed(4)}° N, ${coords.lng.toFixed(4)}° E (Encrypted Peer Broadcast)`,
      notifiedAuthorities: [
        'Gujarat State Police Emergency Response Cell (112)',
        'State Disaster Mitigation & Tourist Rescue Wing',
        'Registered Primary Emergency Contact (+91-98765-XXXXX)',
      ],
      nearestHospital: {
        name: dest.isRemoteArea ? 'Vijaynagar Forest Civil Health Centre' : 'Ahmedabad Civil Apex Trauma Centre',
        distanceKm: dest.safety.nearestHospitalKm,
        phone: '108 / +91-79-2268-XXXX',
      },
      nearestPolice: {
        station: `${dest.region} Tourism Assistance Unit`,
        distanceKm: dest.safety.nearestPoliceKm,
        phone: '112 / +91-79-2214-XXXX',
      },
    };
  },

  async downloadOfflinePack(destinationId: string): Promise<OfflineTripPack> {
    await delay(400);
    const dest = SEED_DESTINATIONS.find(d => d.id === destinationId) ?? SEED_DESTINATIONS[0];

    return {
      destinationName: dest.name,
      downloadedAt: new Date().toLocaleString(),
      itinerarySummary: `Day trip & resilience plan for ${dest.name}. Staging at ${dest.arrivalPoint.name}.`,
      offlineCoordinates: dest.coordinates,
      emergencyContacts: [
        { role: 'Tourist Helpline (24x7)', name: 'Gujarat Tourism Desk', phone: '1363', availability: '24x7 Multi-lingual', isVerifiedGov: true },
        { role: 'Ambulance / Trauma Response', name: 'State Emergency 108', phone: '108', availability: 'Immediate dispatch', isVerifiedGov: true },
        { role: 'Forest Guard Duty Officer', name: 'Regional Ranger Desk', phone: '+91 94280 12099', availability: '06:00 - 18:00', isVerifiedGov: true },
      ],
      offlineMechanics: dest.mechanics,
      survivalNotes: [
        'Strict 18:00 curfew in inner valley. Return to staging node before twilight.',
        'Keep vehicle tyre pressure calibrated at Dasada/Abhapur checkpoint.',
        'Carry minimum 3L potable water per traveller.',
        'Emergency satellite radio beacon located at Abhapur approach gate.',
      ],
      safeNodes: [
        dest.arrivalPoint.name,
        'Government Forest Rest House (Abhapur Gate)',
        'District Community Health Dispensary',
      ],
      sizeKb: 1420,
    };
  },
};
