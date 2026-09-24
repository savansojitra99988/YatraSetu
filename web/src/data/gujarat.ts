import type { Destination } from '../lib/decision'

export const destinations: Destination[] = [
  {
    id: 'ahmedabad-heritage', name: 'Ahmedabad Heritage Quarter', region: 'Ahmedabad', kind: 'Living heritage',
    tags: ['heritage', 'photography', 'food', 'culture'], crowd: 'lively', open: true, accessible: true,
    suitabilityNote: 'A morning heritage walk offers the strongest fit before peak activity.',
    evidence: [
      { label: 'Crowd outlook', value: 'High after 11:00', source: 'Curated pilot observation', collectedAt: 'Today, 08:30', confidence: 'medium' },
      { label: 'Operations', value: 'Open', source: 'Curated destination data', collectedAt: 'Today, 08:00', confidence: 'high' },
      { label: 'Weather', value: 'Warm, clear', source: 'Demo data — not live', collectedAt: 'Today, 08:00', confidence: 'unknown' },
    ],
    arrival: { name: 'Swaminarayan Mandir arrival point', reason: 'Better pedestrian access and nearby facilities than the closest drop point.', walk: '7 min walk', facilities: 'Toilets · food · local guide desk' },
  },
  {
    id: 'patan-rani-ki-vav', name: 'Rani ki Vav', region: 'Patan', kind: 'Stepwell heritage',
    tags: ['heritage', 'photography', 'architecture', 'quiet'], crowd: 'quiet', open: true, accessible: false,
    suitabilityNote: 'Lower visitor pressure preserves a slower photography-focused experience.',
    evidence: [
      { label: 'Crowd outlook', value: 'Low to moderate', source: 'Curated pilot observation', collectedAt: 'Today, 08:30', confidence: 'medium' },
      { label: 'Operations', value: 'Open', source: 'Curated destination data', collectedAt: 'Today, 08:00', confidence: 'high' },
      { label: 'Accessibility', value: 'Step-heavy; assistance unknown', source: 'Curated destination data', collectedAt: '2026-09-10', confidence: 'unknown' },
    ],
    arrival: { name: 'Visitor Centre arrival point', reason: 'Parking, water and the most manageable approach to the site.', walk: '5 min walk', facilities: 'Parking · water · information desk' },
  },
  {
    id: 'polo-forest', name: 'Polo Forest', region: 'Sabarkantha', kind: 'Forest heritage',
    tags: ['nature', 'heritage', 'photography', 'quiet'], crowd: 'quiet', open: true, accessible: false,
    suitabilityNote: 'A quieter alternative with a remote-area readiness check before departure.',
    evidence: [
      { label: 'Crowd outlook', value: 'Low', source: 'Curated pilot observation', collectedAt: 'Today, 08:30', confidence: 'medium' },
      { label: 'Connectivity', value: 'Variable', source: 'Demo data — not live', collectedAt: '2026-09-18', confidence: 'unknown' },
      { label: 'Operations', value: 'Open', source: 'Curated destination data', collectedAt: 'Today, 08:00', confidence: 'high' },
    ],
    arrival: { name: 'Abhapur approach point', reason: 'Fuel and food are available here before the lower-connectivity final stretch.', walk: '12 min walk', facilities: 'Fuel · food · offline-pack reminder' },
  },
]
