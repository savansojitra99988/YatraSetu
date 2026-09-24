import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ShieldAlert, 
  ArrowRight, 
  Award, 
  Download, 
  Navigation,
  Compass
} from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const { 
    selectedDestination, 
    evaluation, 
    yatraPoints, 
    offlinePacksDownloaded, 
    toggleOfflinePack,
    isEvaluating 
  } = useApp();
  
  const navigate = useNavigate();
  const isOfflineSaved = offlinePacksDownloaded.includes(selectedDestination.id);

  const mainBubbleRef = useRef<SVGGElement>(null);
  const secondaryBubbleRef = useRef<SVGGElement>(null);
  const dropBubbleRef = useRef<SVGGElement>(null);

  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const PARALLAX_INTENSITY = 0.55;
    const PARALLAX_SMOOTHNESS = 0.03;

    const handlePointerMove = (e: MouseEvent) => {
      const normalizedX = e.clientX / window.innerWidth - 0.5;
      const normalizedY = e.clientY / window.innerHeight - 0.5;
      targetX = normalizedX * 180 * PARALLAX_INTENSITY;
      targetY = normalizedY * 130 * PARALLAX_INTENSITY;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    window.addEventListener('pointermove', handlePointerMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    let animId: number;
    const render = () => {
      currentX += (targetX - currentX) * PARALLAX_SMOOTHNESS;
      currentY += (targetY - currentY) * PARALLAX_SMOOTHNESS;

      if (mainBubbleRef.current) {
        mainBubbleRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }
      if (secondaryBubbleRef.current) {
        secondaryBubbleRef.current.style.transform = `translate(${currentX * 1.55}px, ${currentY * 1.55}px)`;
      }
      if (dropBubbleRef.current) {
        dropBubbleRef.current.style.transform = `translate(${currentX * 2.15}px, ${currentY * 2.15}px)`;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="dashboard-container">
      {/* Aurora Liquid Hero Header */}
      <div className="hero" style={{ borderRadius: '24px', margin: '0 0 2rem 0', minHeight: '85vh' }}>
        <main className="hero__body">
          <section className="content">
            <div className="eyebrow">
              <span></span>
              ADAPTIVE TRAVEL INTELLIGENCE · GUJARAT PILOT
            </div>

            <h1 style={{ fontSize: 'clamp(50px, 5.5vw, 100px)' }}>
              SCULPTED
              <br />
              <span style={{ color: '#0d9488', fontStyle: 'italic', fontWeight: 300 }}>JOURNEYS</span>
            </h1>

            <p className="intro">
              YatraSetu reads your personal travel intent alongside real-time on-ground reality, giving you clear GO / MODIFY decisions and remote resilience.
            </p>

            <div className="actions">
              <button className="btn btn--primary" onClick={() => navigate('/discover')}>
                <Compass size={18} />
                <span>EXPLORE DECISION ENGINE</span>
                <span>↗</span>
              </button>
              <button className="btn btn--secondary" onClick={() => navigate('/mobility')}>
                <span>SMART ROUTES</span>
                <span>→</span>
              </button>
            </div>

            <div className="meta">
              <div className="meta__item">
                <small>ACTIVE DESTINATION</small>
                <strong>{selectedDestination.name}</strong>
              </div>

              <div className="meta__item">
                <small>DECISION</small>
                <strong style={{ color: evaluation?.decision === 'GO' ? '#16a34a' : '#d97706' }}>
                  {isEvaluating ? 'Evaluating...' : evaluation?.decision} ({evaluation?.suitabilityScore || 85}% fit)
                </strong>
              </div>

              <div className="meta__item">
                <small>YATRA POINTS</small>
                <strong>{yatraPoints} PTS</strong>
              </div>
            </div>
          </section>

          {/* Morphing Liquid SVG Scene */}
          <section className="visual" id="visual">
            <div className="visual-lighting" aria-hidden="true">
              <span className="visual-glow visual-glow--ambient"></span>
              <span className="visual-glow visual-glow--core"></span>
              <span className="visual-glow visual-glow--sun"></span>
              <span className="visual-glow visual-glow--bottom"></span>
              <span className="visual-glow visual-glow--secondary"></span>
              <span className="visual-glow visual-glow--drop"></span>
            </div>

            <svg className="liquid-scene" viewBox="0 0 1100 850" preserveAspectRatio="xMidYMid meet">
              <defs>
                <path id="mainBubblePath" d="
                  M 305 154
                  C 430 88 638 77 781 126
                  C 906 169 978 281 961 405
                  C 945 524 858 620 735 651
                  C 631 678 558 647 494 620
                  C 434 595 380 592 322 552
                  C 247 501 204 426 218 345
                  C 231 267 258 196 305 154
                  Z
                ">
                  <animate attributeName="d" dur="14s" repeatCount="indefinite" calcMode="spline" keyTimes="0; .34; .68; 1" keySplines=".42 0 .58 1; .42 0 .58 1; .42 0 .58 1" values="
                    M 305 154 C 430 88 638 77 781 126 C 906 169 978 281 961 405 C 945 524 858 620 735 651 C 631 678 558 647 494 620 C 434 595 380 592 322 552 C 247 501 204 426 218 345 C 231 267 258 196 305 154 Z;
                    M 286 171 C 411 91 626 68 792 135 C 922 187 966 296 949 420 C 929 552 829 622 722 649 C 614 677 541 627 478 617 C 405 605 345 612 297 553 C 242 486 192 415 218 324 C 241 244 244 207 286 171 Z;
                    M 321 142 C 468 78 651 91 801 145 C 916 186 988 301 955 430 C 923 551 844 634 712 656 C 600 674 540 650 468 611 C 403 575 345 592 293 533 C 230 462 216 380 234 309 C 251 240 279 170 321 142 Z;
                    M 305 154 C 430 88 638 77 781 126 C 906 169 978 281 961 405 C 945 524 858 620 735 651 C 631 678 558 647 494 620 C 434 595 380 592 322 552 C 247 501 204 426 218 345 C 231 267 258 196 305 154 Z
                  " />
                </path>

                <path id="secondaryBubblePath" d="
                  M 224 530 C 291 486 386 489 449 543 C 508 594 500 683 441 731 C 383 779 279 771 223 714 C 168 657 168 568 224 530 Z
                ">
                  <animate attributeName="d" dur="11s" begin="-3s" repeatCount="indefinite" calcMode="spline" keyTimes="0; .5; 1" keySplines=".42 0 .58 1; .42 0 .58 1" values="
                    M 224 530 C 291 486 386 489 449 543 C 508 594 500 683 441 731 C 383 779 279 771 223 714 C 168 657 168 568 224 530 Z;
                    M 207 545 C 272 483 390 493 458 557 C 507 605 483 695 425 737 C 361 783 262 757 211 699 C 165 646 160 588 207 545 Z;
                    M 224 530 C 291 486 386 489 449 543 C 508 594 500 683 441 731 C 383 779 279 771 223 714 C 168 657 168 568 224 530 Z
                  " />
                </path>

                <path id="dropBubblePath" d="
                  M 645 679 C 686 658 741 675 758 713 C 776 753 747 791 704 793 C 665 794 627 765 629 728 C 630 707 632 687 645 679 Z
                ">
                  <animate attributeName="d" dur="8s" begin="-5s" repeatCount="indefinite" calcMode="spline" keyTimes="0; .5; 1" keySplines=".42 0 .58 1; .42 0 .58 1" values="
                    M 645 679 C 686 658 741 675 758 713 C 776 753 747 791 704 793 C 665 794 627 765 629 728 C 630 707 632 687 645 679 Z;
                    M 638 687 C 679 650 746 676 766 718 C 783 754 748 786 711 801 C 667 805 620 767 628 725 C 632 705 626 696 638 687 Z;
                    M 645 679 C 686 658 741 675 758 713 C 776 753 747 791 704 793 C 665 794 627 765 629 728 C 630 707 632 687 645 679 Z
                  " />
                </path>

                <clipPath id="mainBubbleClip"><use href="#mainBubblePath" /></clipPath>
                <clipPath id="secondaryBubbleClip"><use href="#secondaryBubblePath" /></clipPath>
                <clipPath id="dropBubbleClip"><use href="#dropBubblePath" /></clipPath>

                <filter id="mainLiquidFilter" x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
                  <feTurbulence type="fractalNoise" baseFrequency=".008 .010" numOctaves="2" seed="92" result="noise">
                    <animate attributeName="baseFrequency" dur="10s" repeatCount="indefinite" values=".008 .010; .010 .008; .007 .012; .008 .010" />
                  </feTurbulence>
                  <feGaussianBlur in="noise" stdDeviation="1.35" result="blurredNoise" />
                  <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="86" xChannelSelector="R" yChannelSelector="G">
                    <animate attributeName="scale" dur="8s" repeatCount="indefinite" values="78; 94; 84; 90; 78" />
                  </feDisplacementMap>
                </filter>

                <radialGradient id="mainDistortionFade" gradientUnits="userSpaceOnUse" cx="590" cy="385" r="330">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="55%" stopColor="white" stopOpacity="1" />
                  <stop offset="78%" stopColor="white" stopOpacity=".52" />
                  <stop offset="100%" stopColor="black" stopOpacity="0" />
                </radialGradient>

                <mask id="mainDistortionMask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="1100" height="850" fill="black" />
                  <ellipse cx="590" cy="385" rx="335" ry="265" fill="url(#mainDistortionFade)" />
                </mask>

                <linearGradient id="glassStroke" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="16%" stopColor="#fffdf7" stopOpacity=".96" />
                  <stop offset="28%" stopColor="#dff6ff" stopOpacity=".55" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity=".96" />
                </linearGradient>

                <radialGradient id="mainInnerMilk" cx="48%" cy="16%" r="70%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity=".34" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
              </defs>

              <!-- Main Parallax Layer -->
              <g id="mainParallax" ref={mainBubbleRef}>
                <g>
                  <g clipPath="url(#mainBubbleClip)">
                    <image href="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=90" x="125" y="40" width="930" height="720" preserveAspectRatio="xMidYMid slice" />
                    <rect x="0" y="0" width="1100" height="850" fill="url(#mainInnerMilk)" />
                  </g>
                  <g clipPath="url(#mainBubbleClip)" mask="url(#mainDistortionMask)" filter="url(#mainLiquidFilter)" opacity=".90">
                    <image href="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=90" x="125" y="40" width="930" height="720" preserveAspectRatio="xMidYMid slice" />
                  </g>
                  <g className="marquee">
                    <text className="marquee__text" dy="-14">
                      <textPath href="#mainBubblePath" startOffset="0%">
                        YATRASETU GUJARAT PILOT ✦ DECISION ENGINE ✦ SMART MOBILITY ✦ SAFETY RESILIENCE ✦
                        <animate attributeName="startOffset" from="0%" to="100%" dur="22s" repeatCount="indefinite" />
                      </textPath>
                    </text>
                  </g>
                  <use href="#mainBubblePath" className="bubble-edge bubble-edge--main" />
                </g>
              </g>

              {/* Secondary Layer */}
              <g id="secondaryParallax" ref={secondaryBubbleRef}>
                <g>
                  <g clipPath="url(#secondaryBubbleClip)">
                    <image href="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=90" x="60" y="230" width="720" height="650" preserveAspectRatio="xMidYMid slice" />
                  </g>
                  <use href="#secondaryBubblePath" className="bubble-edge" />
                </g>
              </g>

              {/* Drop Layer */}
              <g id="dropParallax" ref={dropBubbleRef}>
                <g>
                  <g clipPath="url(#dropBubbleClip)">
                    <image href="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=90" x="450" y="470" width="520" height="440" preserveAspectRatio="xMidYMid slice" />
                  </g>
                  <use href="#dropBubblePath" className="bubble-edge" />
                </g>
              </g>
            </svg>
          </section>
        </main>
      </div>

      {/* Quick Status Feature Cards Grid */}
      <div className="dashboard-grid">
        <div className="feature-card glass-panel" onClick={() => navigate('/discover')} style={{ background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(16px)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.8)' }}>
          <div className="card-icon icon-blue" style={{ background: 'rgba(232, 89, 26, 0.15)', color: '#e8591a' }}>
            <Compass size={24} />
          </div>
          <h3>AI Decision Engine</h3>
          <p>
            Deterministic suitability scoring, transparent ruleset explanations, and experience-equivalent alternatives.
          </p>
          <div className="card-metric">
            <span>Confidence Index</span>
            <strong>{evaluation?.confidenceScore || 90}%</strong>
          </div>
          <div className="card-link">
            <span>View Reality Engine</span>
            <ArrowRight size={16} />
          </div>
        </div>

        <div className="feature-card glass-panel" onClick={() => navigate('/mobility')} style={{ background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(16px)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.8)' }}>
          <div className="card-icon icon-green" style={{ background: 'rgba(13, 148, 136, 0.15)', color: '#0d9488' }}>
            <Navigation size={24} />
          </div>
          <h3>Smart Mobility &amp; Drop Points</h3>
          <p>
            Multimodal routing with Smart Arrival Point at <strong>{selectedDestination.arrivalPoint.name}</strong>.
          </p>
          <div className="card-metric">
            <span>Vehicles Available</span>
            <strong>{selectedDestination.rentals.length} Verified</strong>
          </div>
          <div className="card-link">
            <span>Open Route &amp; Rentals</span>
            <ArrowRight size={16} />
          </div>
        </div>

        <div className="feature-card glass-panel" onClick={() => navigate('/safety')} style={{ background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(16px)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.8)' }}>
          <div className="card-icon icon-red" style={{ background: 'rgba(192, 57, 43, 0.15)', color: '#c0392b' }}>
            <ShieldAlert size={24} />
          </div>
          <h3>Resilience &amp; Remote SOS</h3>
          <p>
            Live Safety Indicator, one-tap emergency satellite simulation, and {selectedDestination.mechanics.length} local mechanics on standby.
          </p>
          <div className="card-metric">
            <span>Safety Indicator</span>
            <strong className={selectedDestination.safety.level === 'High' ? 'text-green' : 'text-amber'}>
              {selectedDestination.safety.level} ({selectedDestination.safety.score}/100)
            </strong>
          </div>
          <div className="card-link">
            <span>Access Safety Hub</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>

      {/* Real-time Evidence Banner */}
      <section className="evidence-strip glass-panel" style={{ background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(16px)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.8)', marginTop: '2rem' }}>
        <div className="strip-header">
          <div className="pulse-dot"></div>
          <h4>Live Destination Telemetry ({selectedDestination.name})</h4>
        </div>
        <div className="evidence-items">
          {selectedDestination.evidence.map((ev: any, i: number) => (
            <div className="evidence-item" key={i} style={{ background: 'rgba(255, 255, 255, 0.6)', border: '1px solid rgba(45,31,23,0.1)' }}>
              <span className="ev-label">{ev.label}</span>
              <span className="ev-val" style={{ color: '#211914' }}>{ev.value}</span>
              <span className="ev-meta">{ev.source} · {ev.collectedAt}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


