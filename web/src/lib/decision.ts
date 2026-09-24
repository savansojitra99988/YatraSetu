export type Decision = 'GO' | 'MODIFY' | 'ALTERNATIVE'

export type TravellerProfile = {
  experience: string
  budget: 'value' | 'comfortable' | 'flexible'
  travelDates: string
  partySize: number
  crowdPreference: 'quiet' | 'balanced' | 'lively'
  pace: 'slow' | 'balanced' | 'fast'
  accessibility: boolean
}

export type Evidence = {
  label: string
  value: string
  source: string
  collectedAt: string
  confidence: 'high' | 'medium' | 'unknown'
}

export type Destination = {
  id: string
  name: string
  region: string
  kind: string
  tags: string[]
  crowd: 'quiet' | 'balanced' | 'lively'
  open: boolean
  accessible: boolean
  suitabilityNote: string
  evidence: Evidence[]
  arrival: { name: string; reason: string; walk: string; facilities: string }
}

export const RULESET_VERSION = 'gujarat-pilot-v1'

export function evaluate(profile: TravellerProfile, destination: Destination) {
  const reasons: string[] = []
  const intent = profile.experience.toLowerCase().split(/\s+/)
  const matchedTags = destination.tags.filter((tag) => intent.some((word) => tag.includes(word) || word.includes(tag)))
  const intentFit = matchedTags.length > 0 || destination.tags.includes('heritage')
  const crowdMismatch = profile.crowdPreference === 'quiet' && destination.crowd === 'lively'
  const accessMismatch = profile.accessibility && !destination.accessible

  if (intentFit) reasons.push(`Matches your ${matchedTags[0] ?? 'heritage and culture'} intent.`)
  if (crowdMismatch) reasons.push('Current crowd level conflicts with your quiet-travel preference.')
  else reasons.push(`Current crowd level is ${destination.crowd}, compatible with your preference.`)
  if (accessMismatch) reasons.push('Accessibility support is not confirmed for this selected experience.')
  else reasons.push('Core access requirements are supported in this curated pilot data.')
  if (!destination.open) reasons.push('Operations are currently marked unavailable.')
  else reasons.push(destination.suitabilityNote)

  let decision: Decision = 'GO'
  if (!destination.open || accessMismatch) decision = 'ALTERNATIVE'
  else if (crowdMismatch) decision = 'MODIFY'

  const score = decision === 'GO' ? 84 : decision === 'MODIFY' ? 62 : 34
  const confidence = destination.evidence.some((item) => item.confidence === 'unknown') ? 'Limited' : 'Good'
  return { decision, score, confidence, reasons: reasons.slice(0, 4), rulesetVersion: RULESET_VERSION }
}
