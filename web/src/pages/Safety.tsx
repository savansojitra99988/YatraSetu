import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { safetyService, type OfflineTripPack } from '../services/safetyService';
import { 
  ShieldAlert, 
  PhoneCall, 
  Wrench, 
  Download, 
  Wifi, 
  WifiOff, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileText
} from 'lucide-react';
import './Safety.css';

export default function Safety() {
  const { 
    selectedDestination, 
    offlinePacksDownloaded, 
    toggleOfflinePack,
    isSosActive,
    setIsSosActive,
    addYatraPoints
  } = useApp();

  const [sosResult, setSosResult] = useState<{
    status: string;
    incidentId: string;
    timestamp: string;
    locationShared: string;
    notifiedAuthorities: string[];
    nearestHospital: { name: string; distanceKm: number; phone: string };
    nearestPolice: { station: string; distanceKm: number; phone: string };
  } | null>(null);

  const [offlinePack, setOfflinePack] = useState<OfflineTripPack | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [selectedMechanic, setSelectedMechanic] = useState<string | null>(null);
  const [mechanicRequestSent, setMechanicRequestSent] = useState<boolean>(false);

  const isOfflineSaved = offlinePacksDownloaded.includes(selectedDestination.id);
  const { safety } = selectedDestination;

  const handleTriggerSOS = async () => {
    const res = await safetyService.triggerSOS(selectedDestination.id);
    setSosResult(res);
    setIsSosActive(true);
  };

  const handleDownloadPack = async () => {
    setIsDownloading(true);
    const pack = await safetyService.downloadOfflinePack(selectedDestination.id);
    setOfflinePack(pack);
    toggleOfflinePack(selectedDestination.id);
    setIsDownloading(false);
    addYatraPoints(75);
  };

  const handleRequestMechanic = (mechId: string) => {
    setSelectedMechanic(mechId);
    setMechanicRequestSent(true);
  };

  return (
    <div className="safety-page">
      {/* Header */}
      <div className="safety-header">
        <div>
          <div className="badge-row">
            <span className="pill-badge pill-red">
              <ShieldAlert size={14} /> Remote Area & Resilience Hub
            </span>
            <span className="pill-badge pill-purple">
              Active Zone: {selectedDestination.region}
            </span>
          </div>
          <h2>Safety Indicator, SOS & Remote Assistance</h2>
          <p className="subtitle">
            Proactive risk evaluation, verified emergency response, and zero-connectivity resilience.
          </p>
        </div>

        <button 
          className="btn-trigger-sos"
          onClick={handleTriggerSOS}
        >
          <PhoneCall size={18} />
          <span>One-Tap SOS Simulation</span>
        </button>
      </div>

      {/* SOS Active Overlay Banner */}
      {isSosActive && sosResult && (
        <div className="sos-banner glass-panel">
          <div className="sos-banner-head">
            <div className="pulse-red"></div>
            <div>
              <h3>EMERGENCY BROADCAST ACTIVE (SIMULATION)</h3>
              <p>Incident Ref: <strong>{sosResult.incidentId}</strong> · Dispatched at {sosResult.timestamp}</p>
            </div>
          </div>

          <div className="sos-grid">
            <div className="sos-box">
              <span className="sos-sub">Last Known GPS Coordinates</span>
              <strong>{sosResult.locationShared}</strong>
            </div>
            <div className="sos-box">
              <span className="sos-sub">Nearest Trauma Centre</span>
              <strong>{sosResult.nearestHospital.name} ({sosResult.nearestHospital.distanceKm} km)</strong>
              <small>Dial: {sosResult.nearestHospital.phone}</small>
            </div>
            <div className="sos-box">
              <span className="sos-sub">Dispatched Authority Cell</span>
              <strong>{sosResult.nearestPolice.station} ({sosResult.nearestPolice.distanceKm} km)</strong>
              <small>Dial: {sosResult.nearestPolice.phone}</small>
            </div>
          </div>

          <button className="btn-cancel-sos" onClick={() => setIsSosActive(false)}>
            Close Emergency Simulation
          </button>
        </div>
      )}

      {/* Remote Area Warning Banner if applicable */}
      {selectedDestination.isRemoteArea && (
        <div className="remote-warning-banner glass-panel">
          <AlertTriangle size={24} className="text-amber" />
          <div className="remote-warn-text">
            <h4>Remote Area Protocol Triggered ({selectedDestination.name})</h4>
            <p>
              This zone features limited mobile coverage. Nearest hospital is <strong>{safety.nearestHospitalKm} km away</strong> and nearest fuel is <strong>{safety.nearestFuelKm} km away</strong>. Offline pack is strongly recommended prior to departure.
            </p>
          </div>
          <button 
            className={`btn-offline-quick ${isOfflineSaved ? 'saved' : ''}`}
            onClick={handleDownloadPack}
            disabled={isDownloading}
          >
            <Download size={16} />
            <span>{isOfflineSaved ? 'Pack Synced' : isDownloading ? 'Downloading...' : 'Save Offline Pack'}</span>
          </button>
        </div>
      )}

      <div className="safety-layout-grid">
        {/* Left Column: Safety Indicator (Factors, Proximity, Freshness) */}
        <div className="safety-indicator-card glass-panel">
          <div className="indicator-top">
            <div>
              <span className="sub-label">SAFETY INDICATOR (FR-SAFE-02)</span>
              <h3>Contextual Safety Rating: <span className={`text-${safety.level === 'High' ? 'green' : 'amber'}`}>{safety.level}</span></h3>
            </div>
            <div className="safety-score-pill">
              <strong>{safety.score}</strong>
              <small>/100</small>
            </div>
          </div>

          <p className="safety-disclaimer">
            *YatraSetu never guarantees absolute safety. This indicator represents verified risk factors, medical distance, and telemetry freshness.
          </p>

          {/* Infrastructure Metrics */}
          <div className="infra-stats-grid">
            <div className="infra-stat">
              <span className="stat-label">Connectivity</span>
              <div className="stat-val">
                {safety.networkConnectivity.includes('Zero') ? <WifiOff size={16} className="text-red" /> : <Wifi size={16} className="text-green" />}
                <span>{safety.networkConnectivity}</span>
              </div>
            </div>
            <div className="infra-stat">
              <span className="stat-label">Hospital Distance</span>
              <strong>{safety.nearestHospitalKm} km</strong>
            </div>
            <div className="infra-stat">
              <span className="stat-label">Police Assistance</span>
              <strong>{safety.nearestPoliceKm} km</strong>
            </div>
            <div className="infra-stat">
              <span className="stat-label">Fuel Station</span>
              <strong>{safety.nearestFuelKm} km</strong>
            </div>
          </div>

          {/* Factor Breakdown */}
          <div className="factors-section">
            <h4>Live Risk & Condition Factors</h4>
            <div className="factors-list">
              {safety.factors.map((f, fi) => (
                <div className="factor-row" key={fi}>
                  <div className={`factor-status-dot dot-${f.status}`}></div>
                  <div className="factor-info">
                    <div className="factor-name-row">
                      <strong>{f.name}</strong>
                      <small>Verified {f.lastVerified}</small>
                    </div>
                    <p>{f.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="road-condition-note">
            <Clock size={16} className="text-secondary" />
            <span><strong>Road Status:</strong> {safety.routeConditions}</span>
          </div>
        </div>

        {/* Right Column: Mechanic Assistance & Offline Pack */}
        <div className="support-tools-col">
          {/* Mechanic Breakdown Assistance (New Feature #3) */}
          <div className="mechanic-card glass-panel">
            <div className="mech-card-header">
              <div>
                <span className="sub-label">ROADSIDE RESILIENCE</span>
                <h3>Mechanic Breakdown Assistance</h3>
              </div>
              <Wrench size={20} className="text-amber" />
            </div>
            <p className="mech-intro">
              If your vehicle experiences engine fault or tyre punctures, request verified local repair dispatch.
            </p>

            <div className="mechanics-list">
              {selectedDestination.mechanics.map((mech) => (
                <div className="mech-item" key={mech.id}>
                  <div className="mech-info-top">
                    <div>
                      <h4>{mech.name}</h4>
                      <span className="mech-shop">{mech.shopName}</span>
                    </div>
                    <div className="mech-dist">
                      <strong>{mech.distanceKm} km</strong>
                      <span className="mech-available-tag">AVAILABLE</span>
                    </div>
                  </div>

                  <p className="mech-spec">{mech.specialty}</p>

                  <div className="mech-foot">
                    <span className="mech-fee">Est. Callout: ₹{mech.estimatedChargeInr}</span>
                    {mechanicRequestSent && selectedMechanic === mech.id ? (
                      <span className="btn-requested">
                        <CheckCircle2 size={14} /> Dispatch Requested
                      </span>
                    ) : (
                      <button 
                        className="btn-call-mech"
                        onClick={() => handleRequestMechanic(mech.id)}
                      >
                        <PhoneCall size={14} />
                        <span>Request Assistance</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Offline Pack Manager (New Feature #6) */}
          <div className="offline-pack-card glass-panel">
            <div className="offline-card-top">
              <div>
                <span className="sub-label">OFFLINE TRIP PACK (FR-SAFE-05)</span>
                <h3>{isOfflineSaved ? 'Offline Trip Pack Synced' : 'Download Trip for Offline Use'}</h3>
              </div>
              <FileText size={20} className="text-blue" />
            </div>

            <p className="offline-desc">
              Stores route maps, emergency police/hospital contacts, and mechanic profiles locally in device storage.
            </p>

            {offlinePack && (
              <div className="offline-bundle-preview">
                <div className="bundle-stat">
                  <span>Pack Size:</span> <strong>{(offlinePack.sizeKb / 1024).toFixed(2)} MB</strong>
                </div>
                <div className="bundle-stat">
                  <span>Contacts Cached:</span> <strong>{offlinePack.emergencyContacts.length} Emergency Nodes</strong>
                </div>
                <div className="bundle-stat">
                  <span>Safe Staging:</span> <strong>{offlinePack.safeNodes[0]}</strong>
                </div>
              </div>
            )}

            <button 
              className={`btn-offline-toggle ${isOfflineSaved ? 'btn-synced' : ''}`}
              onClick={handleDownloadPack}
              disabled={isDownloading}
            >
              <Download size={16} />
              <span>{isOfflineSaved ? '✓ Offline Pack Ready (Simulate Offline Mode)' : isDownloading ? 'Building Encrypted Pack...' : 'Download Complete Trip Pack'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
