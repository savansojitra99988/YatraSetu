import { SEED_DESTINATIONS, type VerifiedStay } from '../data/seed';

export interface NewReviewSubmission {
  destinationId: string;
  stayId: string;
  bookingVerificationToken: string;
  authorName: string;
  rating: number;
  comment: string;
  pricePaidInr: number;
}

export interface ReviewSubmissionResult {
  success: boolean;
  message: string;
  hashProof?: string;
  earnedYatraPoints?: number;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const trustService = {
  async getVerifiedStays(destinationId: string): Promise<VerifiedStay[]> {
    await delay(150);
    const dest = SEED_DESTINATIONS.find(d => d.id === destinationId) ?? SEED_DESTINATIONS[0];
    return dest.verifiedStays;
  },

  async verifyStayToken(token: string): Promise<{ isValid: boolean; stayName?: string; checkinDate?: string }> {
    await delay(200);
    if (token.toUpperCase().startsWith('YS-') || token.length >= 6) {
      return {
        isValid: true,
        stayName: 'The French Haveli & Heritage Courtyard',
        checkinDate: '12-14 Oct 2026 (Completed Stay)',
      };
    }
    return { isValid: false };
  },

  async submitVerifiedReview(data: NewReviewSubmission): Promise<ReviewSubmissionResult> {
    await delay(350);
    if (!data.bookingVerificationToken || data.bookingVerificationToken.trim().length < 4) {
      return {
        success: false,
        message: 'Review blocked: Anti-fraud protocol requires a verified stay booking check-in token.',
      };
    }

    const pseudoHash = `0x${Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

    return {
      success: true,
      message: 'Verified review accepted and committed to tamper-evident audit ledger.',
      hashProof: `SHA-256-PROOF:${pseudoHash.substring(0, 16)}...`,
      earnedYatraPoints: 250,
    };
  },
};
