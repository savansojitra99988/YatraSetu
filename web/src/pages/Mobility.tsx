import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { mobilityService, type SmartRoutePlan } from '../services/mobilityService';
import { type VehicleRentalOption } from '../data/seed';
import { 
  Navigation, 
  MapPin, 
  Clock, 
  Car, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle, 
  Leaf,
  Wrench
} from 'lucide-react';
import './Mobility.css';

export default function Mobility() {
  const { selectedDestination, addYatraPoints } = useApp();
  const [routePlan, setRoutePlan] = useState<SmartRoutePlan | null>(null);
  const [rentals, setRentals] = useState<VehicleRentalOption[]>([]);
  const [bookedRentalId, setBookedRentalId] = useState<string | null>(null);
  const [bookingConfirmation, setBookingConfirmation] = useState<{ id: string; code: string } | null>(null);
  const [originCity, setOriginCity] = useState<string>('Ahmedabad Junction');

  useEffect(() => {
    mobilityService.getRoutePlan(originCity, selectedDestination.id).then(setRoutePlan);
    mobilityService.getVehicleRentals(selectedDestination.id).then(setRentals);
  }, [originCity, selectedDestination.id]);

  const handleBookRental = async (rental: VehicleRentalOption) => {
    const res = await mobilityService.bookRental(rental.id, '14-18 Nov 2026');
    setBookedRentalId(rental.id);
    setBookingConfirmation({ id: res.confirmationId, code: res.voucherCode });
    addYatraPoints(100);
  };

  return (
    <div className="mobility-page">
      {/* Header */}
      <div className="mobility-header">
        <div>
          <div className="badge-row">
            <span className="pill-badge pill-purple">
              <Sparkles size={14} /> Smart Mobility Layer
            </span>
            <span className="pill-badge pill-green">
              <Leaf size={14} /> {routePlan?.carbonSavedKg || 4.5} kg CO₂ Saved
            </span>
          </div>
          <h2>Smart Routes, Drop Points & Vehicle Rentals</h2>
          <p className="subtitle">
            Multimodal transit optimization and verified local vehicle access designed for Indian road realities.
          </p>
        </div>

        <div className="origin-picker glass-panel">
          <MapPin size={16} className="text-secondary" />
          <span>Origin:</span>
          <select 
            value={originCity} 
            onChange={(e) => setOriginCity(e.target.value)}
            className="origin-select"
          >
            <option value="Ahmedabad Junction">Ahmedabad Junction</option>
            <option value="Gandhinagar Capital">Gandhinagar Capital</option>
            <option value="Vadodara Central">Vadodara Central</option>
          </select>
        </div>
      </div>

      <div className="mobility-grid">
        {/* Left Column: Smart Route & Smart Arrival Point */}
        <div className="route-column">
          {/* Smart Arrival Point Spotlight (Our distinctive feature) */}
          <div className="arrival-spotlight glass-panel">
            <div className="spotlight-top">
              <div className="spotlight-badge">
                <Navigation size={16} />
                <span>RECOMMENDED SMART ARRIVAL POINT (FR-MOB-02)</span>
              </div>
              <span className="pill-badge pill-gold">Nearest ≠ Best</span>
            </div>

            <h3>{selectedDestination.arrivalPoint.name}</h3>
            <p className="arrival-reason">
              "{selectedDestination.arrivalPoint.reason}"
            </p>

            <div className="arrival-metrics-row">
              <div className="arrival-stat">
                <Clock size={16} />
                <span>{selectedDestination.arrivalPoint.walkTime}</span>
              </div>
              <div className="arrival-stat">
                <MapPin size={16} />
                <span>{selectedDestination.arrivalPoint.distanceToDestinationKm} km from core</span>
              </div>
              <div className="arrival-stat">
                <ShieldCheck size={16} />
                <span>{selectedDestination.arrivalPoint.accessibilityScore}/100 Access</span>
              </div>
            </div>

            <div className="facilities-cluster">
              <span className="fac-label">Verified Arrival Facilities:</span>
              <div className="facilities-tags">
                {selectedDestination.arrivalPoint.facilities.map((f, i) => (
                  <span className="fac-tag" key={i}>
                    <CheckCircle size={12} /> {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Multimodal Route Legs */}
          <div className="route-legs-card glass-panel">
            <div className="legs-header">
              <h3>Multimodal Journey Breakdown</h3>
              <span className="total-time">
                Total: {routePlan?.totalDurationMinutes} mins ({routePlan?.totalDistanceKm} km)
              </span>
            </div>

            <div className="timeline-container">
              {routePlan?.segments.map((seg, idx) => (
                <div className="timeline-item" key={idx}>
                  <div className="timeline-marker">
                    <div className="marker-dot"></div>
                    {idx < (routePlan?.segments.length || 0) - 1 && <div className="marker-line"></div>}
                  </div>
                  <div className="timeline-content">
                    <div className="seg-top">
                      <span className="seg-mode">{seg.mode}</span>
                      <span className="seg-stats">{seg.durationMinutes} min · {seg.distanceKm} km</span>
                    </div>
                    <div className="seg-places">
                      <strong>{seg.from}</strong> → <strong>{seg.to}</strong>
                    </div>
                    <p className="seg-notes">{seg.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Vehicle Rental Marketplace & Mechanics */}
        <div className="rentals-column">
          <div className="rentals-header-box glass-panel">
            <div className="rent-title-row">
              <div>
                <span className="sub-label">ON-DEMAND MOBILITY</span>
                <h3>Verified Vehicle Rentals</h3>
              </div>
              <Car size={20} className="text-blue" />
            </div>
            <p className="rent-desc">
              Terrain-matched vehicles from registered local operators for hassle-free remote exploration.
            </p>
          </div>

          {/* Rental Options List */}
          <div className="rentals-list">
            {rentals.map((rental) => {
              const isBooked = bookedRentalId === rental.id;
              return (
                <div className={`rental-card glass-panel ${isBooked ? 'card-booked' : ''}`} key={rental.id}>
                  <div className="rental-top">
                    <div>
                      <span className="rental-type">{rental.type}</span>
                      <h4>{rental.model}</h4>
                      <span className="rental-provider">
                        <ShieldCheck size={12} className="text-green" /> {rental.provider}
                      </span>
                    </div>
                    <div className="rental-price">
                      <strong>₹{rental.dailyRateInr}</strong>
                      <small>/day</small>
                    </div>
                  </div>

                  <div className="terrain-tags">
                    <span className="terrain-label">Terrain Fit:</span>
                    {rental.suitableTerrain.map((t, ti) => (
                      <span className="t-tag" key={ti}>{t}</span>
                    ))}
                  </div>

                  <div className="rental-meta-row">
                    <span>{rental.transmission}</span>
                    <span>·</span>
                    <span>{rental.capacity} Persons</span>
                    <span>·</span>
                    <span>★ {rental.rating}</span>
                  </div>

                  {isBooked ? (
                    <div className="booking-pass">
                      <CheckCircle size={16} />
                      <div>
                        <strong>Verified Voucher Issued</strong>
                        <small>Ref: {bookingConfirmation?.id} · Code: {bookingConfirmation?.code}</small>
                      </div>
                    </div>
                  ) : (
                    <button className="btn-book-rental" onClick={() => handleBookRental(rental)}>
                      <span>Reserve with Verified Provider</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Local Mechanic Quick Bar */}
          <div className="mechanic-preview-card glass-panel">
            <div className="mech-top">
              <Wrench size={18} className="text-amber" />
              <div>
                <h4>{selectedDestination.mechanics.length} Verified Mechanics On-Call</h4>
                <p>Available within {selectedDestination.safety.nearestMechanicKm} km with roadside assistance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
