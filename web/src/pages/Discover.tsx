import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SEED_DESTINATIONS, type TravellerProfile } from '../data/seed';
import { 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  Users, 
  Sliders, 
  ArrowRight,
  ShieldCheck,
  Award,
  Zap
} from 'lucide-react';
import './Discover.css';

export default function Discover() {
  const { 
    profile, 
    setProfile, 
    selectedDestination, 
    setSelectedDestinationId,
    evaluation,
    alternatives,
    isEvaluating,
    addYatraPoints
  } = useApp();

  const [activeTab, setActiveTab] = useState<'decision' | 'assessment'>('decision');

  return (
    <div className="discover-page">
      {/* Header & Mode Switcher */}
      <div className="discover-header">
        <div>
          <div className="badge-row">
            <span className="pill-badge pill-purple">
              <Sparkles size={14} /> AI Decision & Reality Engine
            </span>
            <span className="pill-badge pill-blue">
              Ruleset: {evaluation?.rulesetVersion || 'v2.6'}
            </span>
          </div>
          <h2>Destination Reality & Personal Suitability</h2>
          <p className="subtitle">
            Transparent deterministic evaluation matching your travel lens to live on-ground signals.
          </p>
        </div>

        <div className="tab-switcher glass-panel">
          <button 
            className={`tab-btn ${activeTab === 'decision' ? 'active' : ''}`}
            onClick={() => setActiveTab('decision')}
          >
            <Compass size={16} />
            <span>Decision Intelligence</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'assessment' ? 'active' : ''}`}
            onClick={() => setActiveTab('assessment')}
          >
            <Sliders size={16} />
            <span>Traveller Assessment</span>
          </button>
        </div>
      </div>

      {activeTab === 'assessment' ? (
        /* Traveller Assessment Form */
        <div className="assessment-card glass-panel">
          <div className="card-top">
            <div>
              <h3>Personalise Your Travel Lens (FR-PROF)</h3>
              <p>Tailor your intent to receive context-aware suitability scores and recommendations.</p>
            </div>
            <span className="pill-badge pill-gold">Live Preference Engine</span>
          </div>

          <div className="assessment-form-grid">
            <div className="form-group full-width">
              <label>Experience Vision & Natural Language Intent</label>
              <textarea 
                value={profile.experienceIntent}
                onChange={(e) => setProfile({ ...profile, experienceIntent: e.target.value })}
                placeholder="e.g. peaceful heritage photography, offbeat forest ruins, local artisan workshops..."
                rows={2}
              />
              <span className="field-hint">Natural language keywords are normalized to attribute vectors by the AI Engine.</span>
            </div>

            <div className="form-group">
              <label>Budget Model</label>
              <select 
                value={profile.budget}
                onChange={(e) => setProfile({ ...profile, budget: e.target.value as TravellerProfile['budget'] })}
              >
                <option value="value">Value-led (Budget conscious & eco-homestays)</option>
                <option value="comfortable">Comfortable (Balanced comfort & heritage properties)</option>
                <option value="flexible">Flexible (Premium experiences & curated guides)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Travel Pace</label>
              <select 
                value={profile.pace}
                onChange={(e) => setProfile({ ...profile, pace: e.target.value as TravellerProfile['pace'] })}
              >
                <option value="slow">Slow & Immersive (Deep cultural stays)</option>
                <option value="balanced">Balanced (2-3 signature highlights daily)</option>
                <option value="fast">Fast & Expedited (Full itinerary coverage)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Crowd & Atmosphere Preference</label>
              <div className="chip-group">
                {(['quiet', 'balanced', 'lively'] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`choice-chip ${profile.crowdPreference === c ? 'active' : ''}`}
                    onClick={() => setProfile({ ...profile, crowdPreference: c })}
                  >
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Transport Preference</label>
              <select 
                value={profile.transportPreference}
                onChange={(e) => setProfile({ ...profile, transportPreference: e.target.value as TravellerProfile['transportPreference'] })}
              >
                <option value="self-drive">Self-Drive / Rental Vehicle</option>
                <option value="public">Public Multimodal (Train/Bus/Metro)</option>
                <option value="chauffeur">Chauffeur / Private Tourist Cab</option>
                <option value="mixed">Mixed Multimodal + EV Last Mile</option>
              </select>
            </div>

            <div className="form-group full-width checkbox-row">
              <label className="custom-checkbox">
                <input 
                  type="checkbox" 
                  checked={profile.accessibilityNeeded}
                  onChange={(e) => setProfile({ ...profile, accessibilityNeeded: e.target.checked })}
                />
                <span>Require physical accessibility support (Wheelchair friendly, step-free access, audio/visual aids)</span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button className="btn-primary" onClick={() => setActiveTab('decision')}>
              <span>Apply Travel Lens & Re-evaluate</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        /* Decision Intelligence & Reality Check */
        <div className="discover-content-layout">
          {/* Left Column: Destination Selector & Decision Card */}
          <div className="main-decision-col">
            {/* Destination Selector Bar */}
            <div className="destination-selector-bar glass-panel">
              <div className="dest-label">
                <Users size={16} />
                <span>Evaluate Destination:</span>
              </div>
              <select 
                value={selectedDestination.id}
                onChange={(e) => setSelectedDestinationId(e.target.value)}
                className="dest-select-input"
              >
                {SEED_DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.region}) · {d.crowdLevel.toUpperCase()} Footfall
                  </option>
                ))}
              </select>
            </div>

            {/* Core Decision Engine Card */}
            <div className="decision-banner glass-panel">
              <div className="decision-banner-top">
                <div>
                  <span className="sub-label">{selectedDestination.category}</span>
                  <h2>{selectedDestination.name}</h2>
                  <p className="dest-suitability-lead">{selectedDestination.suitabilityNote}</p>
                </div>

                <div className={`decision-badge badge-${evaluation?.decision.toLowerCase() || 'go'}`}>
                  <span className="badge-action-label">RECOMMENDED ACTION</span>
                  <div className="badge-main-text">
                    {isEvaluating ? 'EVALUATING...' : evaluation?.decision}
                  </div>
                  <small>{evaluation?.suitabilityScore}/100 Suitability</small>
                </div>
              </div>

              {/* Gauge Row */}
              <div className="gauges-grid">
                <div className="gauge-item">
                  <div className="gauge-header">
                    <span>Personal Suitability</span>
                    <strong>{evaluation?.suitabilityScore}%</strong>
                  </div>
                  <div className="gauge-bar-bg">
                    <div 
                      className="gauge-bar-fill fill-blue" 
                      style={{ width: `${evaluation?.suitabilityScore || 80}%` }}
                    ></div>
                  </div>
                  <span className="gauge-sub">Matched to active travel lens</span>
                </div>

                <div className="gauge-item">
                  <div className="gauge-header">
                    <span>Reality Confidence</span>
                    <strong>{evaluation?.confidenceScore}%</strong>
                  </div>
                  <div className="gauge-bar-bg">
                    <div 
                      className="gauge-bar-fill fill-green" 
                      style={{ width: `${evaluation?.confidenceScore || 90}%` }}
                    ></div>
                  </div>
                  <span className="gauge-sub">Based on live sensor & authority feeds</span>
                </div>
              </div>

              {/* Explicit Explanation List */}
              <div className="explanation-section">
                <h4>
                  <ShieldCheck size={18} />
                  <span>Explainable Decision Rationale (No Black Box)</span>
                </h4>
                <ul className="reasons-list">
                  {evaluation?.reasons.map((reason, idx) => (
                    <li key={idx} className="reason-item">
                      <div className="reason-bullet"></div>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Action Box */}
              <div className="action-box">
                <Zap size={18} />
                <div>
                  <strong>Next Operational Step:</strong>
                  <p>{evaluation?.recommendedAction}</p>
                </div>
              </div>
            </div>

            {/* Live Signals & Telemetry Evidence */}
            <div className="signals-card glass-panel">
              <div className="signals-header">
                <h3>Live Ground Telemetry & Evidence (FR-DEST-03)</h3>
                <span className="pill-badge pill-purple">Real-time Verified Signals</span>
              </div>
              <div className="signals-grid">
                {selectedDestination.evidence.map((ev, i) => (
                  <div className="signal-box" key={i}>
                    <div className="signal-top">
                      <span className="signal-label">{ev.label}</span>
                      <span className={`confidence-tag conf-${ev.confidence}`}>
                        {ev.confidence.toUpperCase()} CONFIDENCE
                      </span>
                    </div>
                    <strong className="signal-value">{ev.value}</strong>
                    <div className="signal-foot">
                      <span>Source: {ev.source}</span>
                      <span>{ev.collectedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Experience-Equivalent Alternatives (De-congestion Engine) */}
          <div className="alternatives-col">
            <div className="alt-header-box glass-panel">
              <div className="alt-title-row">
                <div>
                  <span className="sub-label">DE-CONGESTION INTELLIGENCE</span>
                  <h3>Experience-Equivalent Alternatives</h3>
                </div>
                <Award size={20} className="text-gold" />
              </div>
              <p className="alt-desc">
                When reality changes or crowds peak, YatraSetu finds alternative destinations providing identical emotional & photography value without proximity bias.
              </p>
            </div>

            <div className="alternatives-list">
              {alternatives.map((alt) => (
                <div className="alt-card glass-panel" key={alt.destination.id}>
                  <div className="alt-card-header">
                    <div>
                      <span className="alt-region">{alt.destination.region}</span>
                      <h4>{alt.destination.name}</h4>
                    </div>
                    <div className="similarity-badge">
                      <span>{alt.similarityScore}%</span>
                      <small>Fit</small>
                    </div>
                  </div>

                  <p className="alt-suit-note">{alt.destination.suitabilityNote}</p>

                  <div className="match-factors">
                    {alt.experienceMatchFactors.map((factor, fi) => (
                      <span className="factor-tag" key={fi}>
                        <CheckCircle2 size={12} /> {factor}
                      </span>
                    ))}
                  </div>

                  <div className="decongestion-reward">
                    <span className="decon-label">{alt.pressureReductionBenefit}</span>
                    <span className="reward-pill">+{alt.yatraPointsBonus} Yatra Points</span>
                  </div>

                  <button 
                    className="btn-switch-alt"
                    onClick={() => {
                      setSelectedDestinationId(alt.destination.id);
                      addYatraPoints(50);
                    }}
                  >
                    <span>Switch to this Destination</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
