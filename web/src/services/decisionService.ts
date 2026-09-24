import { SEED_DESTINATIONS, type Destination, type TravellerProfile } from '../data/seed';

export type DecisionType = 'GO' | 'MODIFY' | 'ALTERNATIVE';

export interface EvaluationResult {
  decision: DecisionType;
  suitabilityScore: number;
  confidenceScore: number;
  reasons: string[];
  rulesetVersion: string;
  matchedAttributes: string[];
  mismatches: string[];
  recommendedAction: string;
}

export interface ExperienceAlternative {
  destination: Destination;
  similarityScore: number;
  experienceMatchFactors: string[];
  pressureReductionBenefit: string;
  yatraPointsBonus: number;
}

// Simulated network delay helper for real API transition
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const decisionService = {
  async getAllDestinations(): Promise<Destination[]> {
    await delay(150);
    return [...SEED_DESTINATIONS];
  },

  async getDestinationById(id: string): Promise<Destination | undefined> {
    await delay(100);
    return SEED_DESTINATIONS.find((d) => d.id === id);
  },

  async evaluateDestination(profile: TravellerProfile, destination: Destination): Promise<EvaluationResult> {
    await delay(200);
    
    const reasons: string[] = [];
    const matchedAttributes: string[] = [];
    const mismatches: string[] = [];
    
    const intentWords = profile.experienceIntent.toLowerCase().split(/[\s,]+/);
    const tagMatches = destination.tags.filter(tag => 
      intentWords.some(word => tag.includes(word) || word.includes(tag))
    );

    if (tagMatches.length > 0) {
      matchedAttributes.push(...tagMatches);
      reasons.push(`Strong alignment with your '${tagMatches.join(', ')}' intent.`);
    }

    const crowdMismatch = profile.crowdPreference === 'quiet' && destination.crowdLevel === 'heavy';
    const accessMismatch = profile.accessibilityNeeded && !destination.isAccessible;

    if (crowdMismatch) {
      mismatches.push('Crowd density too high for quiet preference');
      reasons.push(`Destination currently experiences heavy crowd density (${destination.sustainability.currentFootfallPressure}), conflicting with your quiet travel lens.`);
    } else {
      reasons.push(`Current visitor pressure (${destination.crowdLevel}) matches your peaceful expectation.`);
    }

    if (accessMismatch) {
      mismatches.push('Physical accessibility barrier');
      reasons.push('Steep historic steps/terrain without verified step-free wheelchair access.');
    }

    if (destination.isRemoteArea) {
      reasons.push('Classified as Remote Area: Requires pre-downloaded offline safety pack and verified vehicle readiness.');
    }

    let decision: DecisionType = 'GO';
    let score = 88;
    let recommendedAction = 'Proceed with planned visit during recommended arrival window.';

    if (!destination.isOpen || accessMismatch) {
      decision = 'ALTERNATIVE';
      score = 36;
      recommendedAction = 'Explore experience-equivalent alternative to preserve your travel vision without barriers.';
    } else if (crowdMismatch || destination.sustainability.currentFootfallPressure.includes('Overcapacity')) {
      decision = 'MODIFY';
      score = 64;
      recommendedAction = 'Adjust arrival timing to dawn window (06:30 - 08:30) or consider lesser-known sister heritage site.';
    }

    const highConfidenceEvidenceCount = destination.evidence.filter(e => e.confidence === 'high').length;
    const confidenceScore = Math.round((highConfidenceEvidenceCount / destination.evidence.length) * 100);

    return {
      decision,
      suitabilityScore: score,
      confidenceScore: Math.max(75, confidenceScore),
      reasons,
      rulesetVersion: 'YS-DecisionEngine-v2.6-GujaratPilot',
      matchedAttributes,
      mismatches,
      recommendedAction,
    };
  },

  async getExperienceAlternatives(currentDestination: Destination): Promise<ExperienceAlternative[]> {
    await delay(150);
    return SEED_DESTINATIONS
      .filter((d) => d.id !== currentDestination.id)
      .map((d) => {
        // Compute experience similarity based on archetypes
        const currentArch = currentDestination.experienceArchetype;
        const candidateArch = d.experienceArchetype;
        
        const deltaPeace = Math.abs(currentArch.peaceScore - candidateArch.peaceScore);
        const deltaHeritage = Math.abs(currentArch.heritageScore - candidateArch.heritageScore);
        const deltaPhoto = Math.abs(currentArch.photoScore - candidateArch.photoScore);
        
        const sim = Math.max(60, 100 - Math.round((deltaPeace + deltaHeritage + deltaPhoto) / 3));

        return {
          destination: d,
          similarityScore: sim,
          experienceMatchFactors: [
            `${d.category} with 0% queue delay`,
            `${d.crowdLevel} footfall preserving slow pace`,
            `High photography rating (${d.experienceArchetype.photoScore}/100)`
          ],
          pressureReductionBenefit: `Relieves ${(Math.random() * 15 + 10).toFixed(1)}% urban density while supporting rural artisans`,
          yatraPointsBonus: Math.round(d.sustainability.rewardPointsMultiplier * 150),
        };
      })
      .sort((a, b) => b.similarityScore - a.similarityScore);
  }
};
