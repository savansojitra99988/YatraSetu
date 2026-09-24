import { useState, useEffect } from 'react';
import { govService, type DemandHeatmapData } from '../services/govService';
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  Activity, 
  Compass, 
  Award
} from 'lucide-react';
import './Gov.css';

export default function Gov() {
  const [data, setData] = useState<DemandHeatmapData | null>(null);

  useEffect(() => {
    govService.getDemandAnalytics().then(setData);
  }, []);

  return (
    <div className="gov-page">
      {/* Header */}
      <div className="gov-header">
        <div>
          <div className="badge-row">
            <span className="pill-badge pill-purple">
              <Sparkles size={14} /> Tourism Board & Governance Portal
            </span>
            <span className="pill-badge pill-blue">
              {data?.timeWindow || 'Live Gujarat Telemetry'}
            </span>
          </div>
          <h2>Demand Distribution & Footfall Heatmap</h2>
          <p className="subtitle">
            Anonymized macro demand analytics for state authorities to manage congestion and stimulate rural economic benefit.
          </p>
        </div>
      </div>

      {/* Macro Metrics KPI Grid */}
      <div className="macro-kpi-grid">
        <div className="kpi-card glass-panel">
          <div className="kpi-icon icon-blue">
            <Users size={22} />
          </div>
          <span className="kpi-label">Active Telemetry Footfall</span>
          <strong className="kpi-val">{data?.totalActiveTravellers.toLocaleString() || '14,820'}</strong>
          <span className="kpi-sub">Gujarat Pilot Corridor</span>
        </div>

        <div className="kpi-card glass-panel">
          <div className="kpi-icon icon-green">
            <Compass size={22} />
          </div>
          <span className="kpi-label">Diverted from Overcrowding</span>
          <strong className="kpi-val text-green">{data?.divertedFootfallPercent || 28.4}%</strong>
          <span className="kpi-sub">Via Experience-Equivalent Routing</span>
        </div>

        <div className="kpi-card glass-panel">
          <div className="kpi-icon icon-purple">
            <TrendingUp size={22} />
          </div>
          <span className="kpi-label">Rural Economy Injection</span>
          <strong className="kpi-val text-purple">₹{((data?.economicBenefitDistributedInr || 4850000) / 100000).toFixed(1)} Lakhs</strong>
          <span className="kpi-sub">Direct to Homestays & Artisans</span>
        </div>

        <div className="kpi-card glass-panel">
          <div className="kpi-icon icon-gold">
            <Award size={22} />
          </div>
          <span className="kpi-label">State Sustainability Index</span>
          <strong className="kpi-val text-gold">{data?.sustainabilityIndex || 86}/100</strong>
          <span className="kpi-sub">Eco & Cultural Integrity Score</span>
        </div>
      </div>

      {/* Regional Capacity & Heatmap Table */}
      <div className="heatmap-card glass-panel">
        <div className="heatmap-head">
          <div>
            <span className="sub-label">REAL-TIME CONGESTION VISIBILITY (FR-STAKE-01)</span>
            <h3>Regional Footfall vs Ecological Carrying Capacity</h3>
          </div>
          <Activity size={20} className="text-blue" />
        </div>

        <div className="regions-table-container">
          <table className="regions-table">
            <thead>
              <tr>
                <th>Region Corridor</th>
                <th>Live Footfall</th>
                <th>Carrying Capacity</th>
                <th>Load Status</th>
                <th>Carrying Load %</th>
                <th>De-congestion Target Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.regions.map((reg, ri) => (
                <tr key={ri}>
                  <td><strong>{reg.region}</strong></td>
                  <td>{reg.currentVisitors.toLocaleString()}</td>
                  <td>{reg.capacityLimit.toLocaleString()}</td>
                  <td>
                    <span className={`status-pill pill-${reg.status.toLowerCase().includes('critical') ? 'critical' : reg.status.toLowerCase().includes('optimal') ? 'optimal' : 'under'}`}>
                      {reg.status}
                    </span>
                  </td>
                  <td>
                    <div className="capacity-bar-cell">
                      <div className="mini-bar-bg">
                        <div 
                          className={`mini-bar-fill fill-${reg.occupancyPercent > 100 ? 'red' : reg.occupancyPercent > 70 ? 'amber' : 'green'}`}
                          style={{ width: `${Math.min(100, reg.occupancyPercent)}%` }}
                        ></div>
                      </div>
                      <span>{reg.occupancyPercent}%</span>
                    </div>
                  </td>
                  <td className="target-cell">{reg.decongestionTarget}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
