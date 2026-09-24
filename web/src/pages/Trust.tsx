import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { trustService, type NewReviewSubmission } from '../services/trustService';
import { type VerifiedStay } from '../data/seed';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  Star, 
  TrendingUp, 
  FileCode, 
  AlertCircle
} from 'lucide-react';
import './Trust.css';

export default function Trust() {
  const { selectedDestination, addYatraPoints } = useApp();
  const [stays, setStays] = useState<VerifiedStay[]>([]);
  const [activeStay, setActiveStay] = useState<VerifiedStay | null>(null);
  
  // Review form state
  const [token, setToken] = useState<string>('YS-AHM-9921');
  const [authorName, setAuthorName] = useState<string>('Traveller Arjun');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('Verified calm sunrise experience. The hosts were incredibly respectful of heritage.');
  const [pricePaid, setPricePaid] = useState<number>(4200);
  const [submissionStatus, setSubmissionStatus] = useState<{
    submitted: boolean;
    success: boolean;
    message: string;
    hashProof?: string;
  } | null>(null);

  useEffect(() => {
    trustService.getVerifiedStays(selectedDestination.id).then((res) => {
      setStays(res);
      if (res.length > 0) setActiveStay(res[0]);
    });
  }, [selectedDestination.id]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeStay) return;

    const payload: NewReviewSubmission = {
      destinationId: selectedDestination.id,
      stayId: activeStay.id,
      bookingVerificationToken: token,
      authorName,
      rating,
      comment,
      pricePaidInr: pricePaid,
    };

    const res = await trustService.submitVerifiedReview(payload);
    setSubmissionStatus({
      submitted: true,
      success: res.success,
      message: res.message,
      hashProof: res.hashProof,
    });

    if (res.success && res.earnedYatraPoints) {
      addYatraPoints(res.earnedYatraPoints);
    }
  };

  return (
    <div className="trust-page">
      {/* Header */}
      <div className="trust-header">
        <div>
          <div className="badge-row">
            <span className="pill-badge pill-purple">
              <Sparkles size={14} /> Trust Layer & Anti-Fraud Architecture
            </span>
            <span className="pill-badge pill-green">
              <ShieldCheck size={14} /> Hash-Chained Audit Ledger
            </span>
          </div>
          <h2>Verified Stays, Artisans & Immutable Reviews</h2>
          <p className="subtitle">
            Combating fake reviews with tokenized check-in verification and transparent seasonal pricing history.
          </p>
        </div>
      </div>

      <div className="trust-layout-grid">
        {/* Left Column: Verified Stays & Price Transparency */}
        <div className="stays-column">
          <div className="stays-header-box glass-panel">
            <div className="stay-title-row">
              <div>
                <span className="sub-label">LOCAL ECOSYSTEM PARTNERS (FR-TRUST-01)</span>
                <h3>Verified Stays & Artisans</h3>
              </div>
              <HeartHandshake size={20} className="text-purple" />
            </div>
            <p className="stay-sub">
              Direct-to-host stays certified by local community panchayats and government tourism desks.
            </p>
          </div>

          <div className="stays-list">
            {stays.map((stay) => (
              <div 
                key={stay.id} 
                className={`stay-card glass-panel ${activeStay?.id === stay.id ? 'active-stay-card' : ''}`}
                onClick={() => setActiveStay(stay)}
              >
                <div className="stay-top">
                  <div>
                    <span className="stay-type">{stay.type}</span>
                    <h4>{stay.name}</h4>
                    <span className="stay-host">Host: <strong>{stay.hostName}</strong></span>
                  </div>
                  <div className="stay-price-tag">
                    <strong>₹{stay.pricePerNightInr}</strong>
                    <small>/night</small>
                  </div>
                </div>

                <div className="verification-pills">
                  <span className="badge-gov-ver">
                    <ShieldCheck size={12} /> {stay.verificationBadge}
                  </span>
                  <span className="badge-sustain">
                    {stay.sustainabilityRating}/100 Eco Score
                  </span>
                </div>

                {/* Price Transparency History */}
                <div className="price-history-box">
                  <div className="price-hist-head">
                    <TrendingUp size={14} className="text-secondary" />
                    <span>Price Transparency (Seasonal Rate History)</span>
                  </div>
                  <div className="price-bars">
                    {stay.priceHistory.map((ph, pi) => (
                      <div className="price-bar-col" key={pi}>
                        <span className="p-amt">₹{ph.price}</span>
                        <div 
                          className="p-bar-fill" 
                          style={{ height: `${(ph.price / 5000) * 40}px` }}
                        ></div>
                        <span className="p-month">{ph.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Audit Ledger Proof */}
                <div className="audit-hash-row">
                  <FileCode size={12} className="text-secondary" />
                  <span>Ledger Node: <code>{stay.auditHash}</code></span>
                </div>
              </div>
            ))}
          </div>

          {/* Existing Verified Reviews */}
          {activeStay && (
            <div className="reviews-card glass-panel">
              <div className="rev-head">
                <h4>Verified Reviews for {activeStay.name}</h4>
                <div className="rev-stat">
                  <Star size={14} className="text-gold" />
                  <strong>{activeStay.averageRating}</strong> ({activeStay.reviewCount} verified guests)
                </div>
              </div>

              <div className="rev-list">
                {activeStay.reviews.map((rev) => (
                  <div className="rev-item" key={rev.id}>
                    <div className="rev-top">
                      <span className="rev-author">{rev.author}</span>
                      <span className="rev-date">{rev.date}</span>
                    </div>
                    <p className="rev-comment">"{rev.comment}"</p>
                    <div className="rev-hash">
                      <Lock size={12} className="text-green" />
                      <span>Tamper-evident proof: {rev.hashProof}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Verified Review Submission Simulation (Anti-Fraud Gate) */}
        <div className="review-form-column">
          <div className="review-form-card glass-panel">
            <div className="form-card-head">
              <div>
                <span className="sub-label">ANTI-FRAUD PROTOCOL (FR-TRUST-02)</span>
                <h3>Submit a Verified Review</h3>
              </div>
              <Lock size={20} className="text-green" />
            </div>

            <p className="form-desc">
              Reviews are cryptographically locked until a valid check-in token is verified. Unverified reviews are rejected at protocol level.
            </p>

            <form onSubmit={handleSubmitReview} className="review-form">
              <div className="form-group">
                <label>Verified Stay Booking Token *</label>
                <div className="token-input-wrap">
                  <input 
                    type="text" 
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="e.g. YS-AHM-9921"
                    required
                  />
                  <span className="token-valid-tag">
                    <CheckCircle2 size={12} /> Eligible
                  </span>
                </div>
                <small className="hint">Try erasing token to test the anti-fraud blocker.</small>
              </div>

              <div className="form-group">
                <label>Your Name / Handle</label>
                <input 
                  type="text" 
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Experience Rating</label>
                <div className="rating-select">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      className={`star-btn ${rating >= s ? 'star-active' : ''}`}
                      onClick={() => setRating(s)}
                    >
                      ★
                    </button>
                  ))}
                  <span className="rating-num">{rating} / 5 Stars</span>
                </div>
              </div>

              <div className="form-group">
                <label>Observed Ground Experience & Notes</label>
                <textarea 
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share details regarding crowd, noise, cleanliness, and local support..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Actual Price Paid (INR)</label>
                <input 
                  type="number" 
                  value={pricePaid}
                  onChange={(e) => setPricePaid(Number(e.target.value))}
                  required
                />
              </div>

              <button type="submit" className="btn-submit-review">
                <ShieldCheck size={16} />
                <span>Verify & Commit to Review Ledger (+250 Yatra Points)</span>
              </button>
            </form>

            {/* Submission Feedback Result */}
            {submissionStatus && (
              <div className={`submission-result ${submissionStatus.success ? 'res-success' : 'res-error'}`}>
                {submissionStatus.success ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <div>
                  <strong>{submissionStatus.message}</strong>
                  {submissionStatus.hashProof && (
                    <div className="proof-code">
                      <span>Audit Proof:</span> <code>{submissionStatus.hashProof}</code>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
