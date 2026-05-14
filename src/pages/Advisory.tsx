import { useState } from "react";

const googleFontsLink = document.createElement("link");
googleFontsLink.rel = "stylesheet";
googleFontsLink.href =
    "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;500;600;700&display=swap";
document.head.appendChild(googleFontsLink);

const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  body, #root {
    font-family: 'Open Sans', sans-serif;
    background: #f5f5f5;
  }

  .page-wrapper {
    max-width: 900px;
    margin: 0 auto;
    background: #fff;
    font-family: 'Open Sans', sans-serif;
  }

  /* ── HERO BANNER ── */
  .hero {
    background: linear-gradient(135deg, #1a3a1a 0%, #2d5a2d 30%, #4a8a3a 55%, #6aaa4a 75%, #c8d840 100%);
    padding: 22px 28px 18px 28px;
    position: relative;
    overflow: hidden;
    min-height: 120px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: -20px; right: -20px;
    width: 260px; height: 260px;
    background: radial-gradient(circle, rgba(255,220,50,0.18) 0%, transparent 70%);
    border-radius: 50%;
  }

  .hero-left {
    display: flex;
    align-items: center;
    gap: 14px;
    z-index: 2;
  }

  .logo-circle {
    width: 68px; height: 68px;
    border-radius: 50%;
    background: linear-gradient(145deg, #c8d840, #8ab820);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 34px;
    font-weight: 900;
    color: #1a3a1a;
    flex-shrink: 0;
    border: 3px solid rgba(255,255,255,0.3);
    box-shadow: 0 4px 16px rgba(0,0,0,0.25);
  }

  .logo-text { z-index: 2; }

  .logo-text .title-top {
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: #e8f5e8;
    letter-spacing: 2px;
    text-transform: uppercase;
    line-height: 1.2;
  }

  .logo-text .title-main {
    font-family: 'Montserrat', sans-serif;
    font-size: 26px;
    font-weight: 900;
    color: #f5e535;
    letter-spacing: 1px;
    line-height: 1;
  }

  .hero-tagline {
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: #c8e8b0;
    letter-spacing: 0.5px;
    margin-top: 4px;
  }

  .hero-center {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    position: relative;
  }

  .hero-figure {
    width: 70px; height: 90px;
    position: relative;
  }

  .hero-figure-svg {
    width: 70px; height: 90px;
    filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3));
  }

  .hero-globe {
    position: absolute;
    right: -40px; top: -10px;
    width: 120px; height: 120px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, rgba(180,220,255,0.5) 0%, rgba(80,160,80,0.3) 50%, transparent 80%);
    border: 1px solid rgba(255,255,255,0.2);
  }

  .hero-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
    z-index: 2;
  }

  .hex-icons {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .hex-icon {
    width: 44px; height: 50px;
    background: rgba(255,255,255,0.12);
    border: 1.5px solid rgba(255,255,255,0.25);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }

  /* ── BODY LAYOUT ── */
  .body-layout {
    display: flex;
    gap: 0;
  }

  /* ── SIDEBAR ── */
  .sidebar {
    width: 220px;
    flex-shrink: 0;
    padding: 28px 20px 24px 24px;
    background: #fff;
    border-right: 1px solid #f0f0f0;
  }

  .sidebar-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 22px;
    font-weight: 900;
    color: #1a3a1a;
    line-height: 1.15;
    margin-bottom: 4px;
  }

  .sidebar-subtitle {
    font-family: 'Montserrat', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: #333;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
  }

  .sidebar-divider {
    width: 40px; height: 3px;
    background: #f5a623;
    border-radius: 2px;
    margin-bottom: 14px;
  }

  .sidebar-desc {
    font-size: 11.5px;
    color: #555;
    line-height: 1.65;
    margin-bottom: 28px;
  }

  .why-nominate-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 12.5px;
    font-weight: 800;
    color: #1a3a1a;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 3px;
  }

  .why-divider {
    width: 30px; height: 2.5px;
    background: #f5a623;
    border-radius: 2px;
    margin-bottom: 16px;
  }

  .why-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 14px;
  }

  .why-icon {
    width: 34px; height: 34px;
    border-radius: 50%;
    background: #f0f8f0;
    border: 1.5px solid #c8e0c0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .why-text h4 {
    font-family: 'Montserrat', sans-serif;
    font-size: 11.5px;
    font-weight: 700;
    color: #1a3a1a;
    margin-bottom: 2px;
  }

  .why-text p {
    font-size: 10.5px;
    color: #666;
    line-height: 1.5;
  }

  .help-box {
    background: #1a3a1a;
    border-radius: 10px;
    padding: 16px;
    margin-top: 24px;
    color: #fff;
  }

  .help-box-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }

  .help-icon {
    width: 30px; height: 30px;
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }

  .help-box-header span {
    font-family: 'Montserrat', sans-serif;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.5px;
  }

  .help-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    color: #c8e8b0;
    margin-bottom: 8px;
  }

  .help-item .icon { font-size: 12px; }

  .help-divider {
    height: 1px;
    background: rgba(255,255,255,0.15);
    margin: 10px 0;
  }

  .help-assist {
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: rgba(255,255,255,0.7);
    text-align: center;
    margin-top: 4px;
  }

  /* ── MAIN FORM ── */
  .form-area {
    flex: 1;
    padding: 28px 28px 28px 28px;
    background: #f9f9f9;
  }

  .section-block {
    background: #fff;
    border-radius: 8px;
    border: 1px solid #e8e8e8;
    padding: 22px 22px 20px 22px;
    margin-bottom: 20px;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    padding-bottom: 14px;
    border-bottom: 1.5px solid #e8e8e8;
  }

  .section-num {
    width: 28px; height: 28px;
    background: #1a3a1a;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    font-weight: 800;
    color: #fff;
    flex-shrink: 0;
  }

  .section-icon {
    font-size: 18px;
    color: #2d7a2d;
  }

  .section-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 13px;
    font-weight: 800;
    color: #1a3a1a;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .section-line {
    flex: 1;
    height: 1.5px;
    background: #e0e0e0;
    margin-left: 4px;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }

  .form-row.single {
    grid-template-columns: 1fr;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .form-label {
    font-size: 11.5px;
    font-weight: 600;
    color: #333;
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .form-label .req {
    color: #e53935;
    font-size: 12px;
    margin-left: 1px;
  }

  .form-input {
    height: 38px;
    border: 1px solid #d0d0d0;
    border-radius: 6px;
    padding: 0 11px;
    font-size: 12px;
    font-family: 'Open Sans', sans-serif;
    color: #333;
    background: #fff;
    outline: none;
    transition: border-color 0.2s;
  }

  .form-input:focus {
    border-color: #2d7a2d;
    box-shadow: 0 0 0 2px rgba(45,122,45,0.1);
  }

  .form-input::placeholder { color: #bbb; }

  .form-input.with-icon {
    padding-left: 32px;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-icon {
    position: absolute;
    left: 10px;
    font-size: 13px;
    color: #aaa;
    pointer-events: none;
    z-index: 1;
  }

  .form-select {
    height: 38px;
    border: 1px solid #d0d0d0;
    border-radius: 6px;
    padding: 0 32px 0 11px;
    font-size: 12px;
    font-family: 'Open Sans', sans-serif;
    color: #bbb;
    background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E") no-repeat right 10px center;
    appearance: none;
    outline: none;
    transition: border-color 0.2s;
    cursor: pointer;
    width: 100%;
  }

  .form-select:focus {
    border-color: #2d7a2d;
    box-shadow: 0 0 0 2px rgba(45,122,45,0.1);
  }

  .form-select.selected { color: #333; }

  .form-textarea {
    border: 1px solid #d0d0d0;
    border-radius: 6px;
    padding: 10px 11px;
    font-size: 12px;
    font-family: 'Open Sans', sans-serif;
    color: #333;
    background: #fff;
    outline: none;
    resize: none;
    transition: border-color 0.2s;
    width: 100%;
    min-height: 80px;
  }

  .form-textarea:focus {
    border-color: #2d7a2d;
    box-shadow: 0 0 0 2px rgba(45,122,45,0.1);
  }

  .form-textarea::placeholder { color: #bbb; font-size: 11.5px; }

  .char-count {
    text-align: right;
    font-size: 10.5px;
    color: #bbb;
    margin-top: 3px;
  }

  .phone-row {
    display: flex;
    gap: 0;
    align-items: center;
    border: 1px solid #d0d0d0;
    border-radius: 6px;
    overflow: hidden;
    background: #fff;
    transition: border-color 0.2s;
  }

  .phone-row:focus-within {
    border-color: #2d7a2d;
    box-shadow: 0 0 0 2px rgba(45,122,45,0.1);
  }

  .phone-prefix {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 0 10px;
    border-right: 1px solid #e0e0e0;
    font-size: 12px;
    color: #333;
    background: #fafafa;
    height: 38px;
    flex-shrink: 0;
    cursor: pointer;
    user-select: none;
  }

  .flag { font-size: 16px; }

  .phone-arrow {
    font-size: 9px;
    color: #999;
  }

  .phone-input {
    flex: 1;
    height: 38px;
    border: none;
    padding: 0 10px;
    font-size: 12px;
    font-family: 'Open Sans', sans-serif;
    color: #333;
    outline: none;
    background: transparent;
  }

  .phone-input::placeholder { color: #bbb; }

  .info-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px; height: 14px;
    border-radius: 50%;
    border: 1.5px solid #999;
    font-size: 9px;
    color: #999;
    font-style: italic;
    font-family: serif;
    font-weight: 700;
    cursor: pointer;
    margin-left: 4px;
  }

  .textarea-wrap {
    position: relative;
  }

  /* Upload area */
  .upload-row {
    display: flex;
    align-items: stretch;
    gap: 16px;
  }

  .upload-label-block {
    flex: 1;
  }

  .upload-label-block .form-label {
    margin-bottom: 3px;
  }

  .upload-hint {
    font-size: 10.5px;
    color: #999;
    margin-top: 1px;
  }

  .upload-box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 4px;
    border: 1.5px dashed #b0c8b0;
    border-radius: 8px;
    padding: 14px 20px;
    background: #f5fbf5;
    cursor: pointer;
    min-width: 180px;
    transition: border-color 0.2s;
  }

  .upload-box:hover { border-color: #2d7a2d; }

  .upload-box .upload-icon { font-size: 22px; color: #2d7a2d; }

  .upload-box-text {
    font-size: 11.5px;
    font-weight: 600;
    color: #2d7a2d;
    text-align: center;
  }

  .upload-box-sub {
    font-size: 10.5px;
    color: #888;
    text-align: center;
  }

  /* Checkbox row */
  .checkbox-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-top: 6px;
  }

  .form-checkbox {
    width: 15px; height: 15px;
    margin-top: 1px;
    accent-color: #2d7a2d;
    cursor: pointer;
    flex-shrink: 0;
  }

  .checkbox-label {
    font-size: 11px;
    color: #444;
    line-height: 1.5;
  }

  .checkbox-label .req { color: #e53935; }

  /* Submit button */
  .submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    height: 50px;
    background: #1a3a1a;
    border: none;
    border-radius: 8px;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 800;
    color: #fff;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    margin-top: 18px;
    transition: background 0.2s, transform 0.1s;
  }

  .submit-btn:hover { background: #2d5a2d; }
  .submit-btn:active { transform: scale(0.99); }
  .submit-btn svg { font-size: 16px; }

  .security-note {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-size: 10.5px;
    color: #888;
    margin-top: 10px;
    text-align: center;
  }

  .security-note .lock { font-size: 11px; }
`;

const injectStyles = () => {
    const existing = document.getElementById("advisory-styles");
    if (!existing) {
        const tag = document.createElement("style");
        tag.id = "advisory-styles";
        tag.textContent = styles;
        document.head.appendChild(tag);
    }
};

injectStyles();

const SectionHeader = ({
    num,
    icon,
    title,
}: {
    num: string;
    icon: string;
    title: string;
}) => (
    <div className="section-header">
        <div className="section-num">{num}</div>
        <span className="section-icon">{icon}</span>
        <span className="section-title">{title}</span>
        <div className="section-line" />
    </div>
);

export default function Advisory() {
    const [formData, setFormData] = useState({
        fullName: "",
        designation: "",
        organization: "",
        industry: "",
        email: "",
        phone: "",
        linkedin: "",
        expertise: "",
        years: "",
        summary: "",
        whyRecommend: "",
        contribution: "",
        nominatorName: "",
        nominatorDesig: "",
        nominatorOrg: "",
        nominatorEmail: "",
        nominatorPhone: "",
        relationship: "",
        consent: false,
    });

    const update = (field: string, value: string | boolean) =>
        setFormData((p) => ({ ...p, [field]: value }));

    return (
        <div className="page-wrapper">
            {/* ── HERO ── */}
            <div className="hero">
                <div className="hero-left">
                    <div className="logo-circle">9</div>
                    <div className="logo-text">
                        <div className="title-top">International Health &amp; Wellness</div>
                        <div className="title-main">EXPO 2026</div>
                        <div className="hero-tagline">Global Platform. &nbsp; Limitless Possibilities.</div>
                    </div>
                </div>

                <div className="hero-center">
                    {/* Meditating figure SVG */}
                    <svg className="hero-figure-svg" viewBox="0 0 70 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* glow behind */}
                        <circle cx="35" cy="45" r="38" fill="rgba(100,180,80,0.18)" />
                        {/* body silhouette */}
                        <ellipse cx="35" cy="28" rx="9" ry="9" fill="#2d6a2d" opacity="0.9" />
                        <path d="M26 42 Q35 36 44 42 L46 68 Q35 72 24 68 Z" fill="#2d6a2d" opacity="0.9" />
                        <path d="M26 44 Q18 52 15 62 Q20 65 24 58 Z" fill="#2d6a2d" opacity="0.9" />
                        <path d="M44 44 Q52 52 55 62 Q50 65 46 58 Z" fill="#2d6a2d" opacity="0.9" />
                        <path d="M27 68 Q24 76 22 82 Q28 84 30 78 Z" fill="#2d6a2d" opacity="0.9" />
                        <path d="M43 68 Q46 76 48 82 Q42 84 40 78 Z" fill="#2d6a2d" opacity="0.9" />
                    </svg>
                </div>

                <div className="hero-right">
                    <div className="hex-icons">
                        <div className="hex-icon">💚</div>
                        <div className="hex-icon">👤</div>
                        <div className="hex-icon">🌿</div>
                        <div className="hex-icon">🏥</div>
                    </div>
                </div>
            </div>

            {/* ── BODY ── */}
            <div className="body-layout">
                {/* SIDEBAR */}
                <div className="sidebar">
                    <div className="sidebar-title">ADVISORY<br />BOARD<br />MEMBERS</div>
                    <div className="sidebar-subtitle">NOMINATION FORM</div>
                    <div className="sidebar-divider" />
                    <p className="sidebar-desc">
                        Nominate an exceptional leader to join the Advisory Board of the International Health &amp; Wellness Expo 2026 and help shape the future of global health &amp; wellness.
                    </p>

                    <div className="why-nominate-title">WHY NOMINATE?</div>
                    <div className="why-divider" />

                    {[
                        { icon: "👥", title: "Shape the Future", desc: "Contribute to strategic direction and innovation in health & wellness." },
                        { icon: "🌐", title: "Global Impact", desc: "Be part of a global platform driving positive change." },
                        { icon: "🤝", title: "Network & Collaborate", desc: "Connect with industry leaders and changemakers worldwide." },
                        { icon: "⭐", title: "Recognition", desc: "Celebrate excellence and leadership in the health & wellness ecosystem." },
                    ].map((item) => (
                        <div className="why-item" key={item.title}>
                            <div className="why-icon">{item.icon}</div>
                            <div className="why-text">
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        </div>
                    ))}

                    <div className="help-box">
                        <div className="help-box-header">
                            <div className="help-icon">🎧</div>
                            <span>NEED HELP?</span>
                        </div>
                        <div className="help-item"><span className="icon">✉️</span> support@ihwe.in</div>
                        <div className="help-item"><span className="icon">📞</span> +91 98765 43210</div>
                        <div className="help-divider" />
                        <div className="help-assist">We're here to assist you!</div>
                    </div>
                </div>

                {/* FORM AREA */}
                <div className="form-area">
                    {/* Section 01 */}
                    <div className="section-block">
                        <SectionHeader num="01" icon="👤" title="NOMINEE INFORMATION" />

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Full Name of Nominee <span className="req">*</span></label>
                                <input className="form-input" placeholder="Enter full name" value={formData.fullName} onChange={(e) => update("fullName", e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Designation / Title <span className="req">*</span></label>
                                <input className="form-input" placeholder="Enter designation" value={formData.designation} onChange={(e) => update("designation", e.target.value)} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Organization / Institution <span className="req">*</span></label>
                                <div className="input-wrapper">
                                    <span className="input-icon">🏢</span>
                                    <input className="form-input with-icon" style={{ width: "100%" }} placeholder="Enter organization / institution" value={formData.organization} onChange={(e) => update("organization", e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Industry / Sector <span className="req">*</span></label>
                                <select className={`form-select ${formData.industry ? "selected" : ""}`} value={formData.industry} onChange={(e) => update("industry", e.target.value)}>
                                    <option value="">Select industry / sector</option>
                                    <option value="healthcare">Healthcare</option>
                                    <option value="wellness">Wellness</option>
                                    <option value="pharma">Pharmaceuticals</option>
                                    <option value="nutrition">Nutrition</option>
                                    <option value="fitness">Fitness</option>
                                    <option value="technology">Technology</option>
                                    <option value="research">Research</option>
                                    <option value="education">Education</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Email Address <span className="req">*</span></label>
                                <div className="input-wrapper">
                                    <span className="input-icon">✉️</span>
                                    <input className="form-input with-icon" style={{ width: "100%" }} type="email" placeholder="Enter email address" value={formData.email} onChange={(e) => update("email", e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone Number <span className="req">*</span></label>
                                <div className="phone-row">
                                    <div className="phone-prefix">
                                        <span className="flag">🇮🇳</span>
                                        <span style={{ fontSize: 12, color: "#333" }}>+91</span>
                                        <span className="phone-arrow">▼</span>
                                    </div>
                                    <input className="phone-input" type="tel" placeholder="Enter phone number" value={formData.phone} onChange={(e) => update("phone", e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="form-row single">
                            <div className="form-group">
                                <label className="form-label">LinkedIn Profile (if available)</label>
                                <div className="input-wrapper">
                                    <span className="input-icon" style={{ fontSize: 15, color: "#0077b5" }}>in</span>
                                    <input className="form-input with-icon" style={{ width: "100%" }} placeholder="https://www.linkedin.com/in/yourprofile" value={formData.linkedin} onChange={(e) => update("linkedin", e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 02 */}
                    <div className="section-block">
                        <SectionHeader num="02" icon="💼" title="NOMINEE'S EXPERTISE & BACKGROUND" />

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Areas of Expertise <span className="req">*</span></label>
                                <select className={`form-select ${formData.expertise ? "selected" : ""}`} value={formData.expertise} onChange={(e) => update("expertise", e.target.value)}>
                                    <option value="">Select one or more areas</option>
                                    <option value="clinical">Clinical Medicine</option>
                                    <option value="public-health">Public Health</option>
                                    <option value="nutrition">Nutrition & Dietetics</option>
                                    <option value="mental-health">Mental Health</option>
                                    <option value="holistic">Holistic Wellness</option>
                                    <option value="research">Medical Research</option>
                                    <option value="policy">Health Policy</option>
                                    <option value="technology">Health Technology</option>
                                    <option value="fitness">Sports & Fitness</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Years of Experience <span className="req">*</span></label>
                                <input className="form-input" type="number" placeholder="Enter total years of experience" value={formData.years} onChange={(e) => update("years", e.target.value)} />
                            </div>
                        </div>

                        <div className="form-row single">
                            <div className="form-group">
                                <label className="form-label">
                                    Professional Summary <span className="req">*</span>
                                    <span className="info-icon">i</span>
                                </label>
                                <div className="textarea-wrap">
                                    <textarea
                                        className="form-textarea"
                                        style={{ minHeight: 90 }}
                                        placeholder="Briefly describe the nominee's professional background, key achievements and contributions."
                                        maxLength={1000}
                                        value={formData.summary}
                                        onChange={(e) => update("summary", e.target.value)}
                                    />
                                    <div className="char-count">{formData.summary.length} / 1000</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 03 */}
                    <div className="section-block">
                        <SectionHeader num="03" icon="🎯" title="NOMINATION DETAILS" />

                        <div className="form-row single">
                            <div className="form-group">
                                <label className="form-label">
                                    Why do you recommend this nominee for the Advisory Board? <span className="req">*</span>
                                    <span className="info-icon">i</span>
                                </label>
                                <div className="textarea-wrap">
                                    <textarea
                                        className="form-textarea"
                                        style={{ minHeight: 80 }}
                                        placeholder="Share your reasons and how their expertise will add value to IHWE Expo 2026."
                                        maxLength={1000}
                                        value={formData.whyRecommend}
                                        onChange={(e) => update("whyRecommend", e.target.value)}
                                    />
                                    <div className="char-count">{formData.whyRecommend.length} / 1000</div>
                                </div>
                            </div>
                        </div>

                        <div className="form-row single">
                            <div className="form-group">
                                <label className="form-label">
                                    How will the nominee contribute to the goals of IHWE Expo 2026? <span className="req">*</span>
                                    <span className="info-icon">i</span>
                                </label>
                                <div className="textarea-wrap">
                                    <textarea
                                        className="form-textarea"
                                        style={{ minHeight: 80 }}
                                        placeholder="Describe the potential impact and value the nominee will bring."
                                        maxLength={1000}
                                        value={formData.contribution}
                                        onChange={(e) => update("contribution", e.target.value)}
                                    />
                                    <div className="char-count">{formData.contribution.length} / 1000</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 04 */}
                    <div className="section-block">
                        <SectionHeader num="04" icon="👤" title="NOMINATOR INFORMATION" />

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Your Full Name <span className="req">*</span></label>
                                <input className="form-input" placeholder="Enter your full name" value={formData.nominatorName} onChange={(e) => update("nominatorName", e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Designation / Title <span className="req">*</span></label>
                                <input className="form-input" placeholder="Enter designation" value={formData.nominatorDesig} onChange={(e) => update("nominatorDesig", e.target.value)} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Organization / Institution <span className="req">*</span></label>
                                <div className="input-wrapper">
                                    <span className="input-icon">🏢</span>
                                    <input className="form-input with-icon" style={{ width: "100%" }} placeholder="Enter organization" value={formData.nominatorOrg} onChange={(e) => update("nominatorOrg", e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email Address <span className="req">*</span></label>
                                <div className="input-wrapper">
                                    <span className="input-icon">✉️</span>
                                    <input className="form-input with-icon" style={{ width: "100%" }} type="email" placeholder="Enter email address" value={formData.nominatorEmail} onChange={(e) => update("nominatorEmail", e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Phone Number <span className="req">*</span></label>
                                <div className="phone-row">
                                    <div className="phone-prefix">
                                        <span className="flag">🇮🇳</span>
                                        <span style={{ fontSize: 12, color: "#333" }}>+91</span>
                                        <span className="phone-arrow">▼</span>
                                    </div>
                                    <input className="phone-input" type="tel" placeholder="Enter phone number" value={formData.nominatorPhone} onChange={(e) => update("nominatorPhone", e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Relationship with Nominee <span className="req">*</span></label>
                                <select className={`form-select ${formData.relationship ? "selected" : ""}`} value={formData.relationship} onChange={(e) => update("relationship", e.target.value)}>
                                    <option value="">Select relationship</option>
                                    <option value="colleague">Colleague</option>
                                    <option value="supervisor">Supervisor / Manager</option>
                                    <option value="mentor">Mentor</option>
                                    <option value="peer">Industry Peer</option>
                                    <option value="collaborator">Research Collaborator</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 05 */}
                    <div className="section-block">
                        <SectionHeader num="05" icon="📎" title="ADDITIONAL INFORMATION" />

                        <div className="upload-row">
                            <div className="upload-label-block">
                                <label className="form-label">Upload Nominee's CV / Profile <span style={{ color: "#888", fontWeight: 400 }}>(Optional)</span></label>
                                <div className="upload-hint">PDF, DOC, or DOCX (Max. 5MB)</div>
                            </div>
                            <div className="upload-box" onClick={() => { }}>
                                <span className="upload-icon">☁️</span>
                                <div className="upload-box-text">Click to upload</div>
                                <div className="upload-box-sub">or drag and drop file here</div>
                            </div>
                        </div>

                        <div className="checkbox-row" style={{ marginTop: 18 }}>
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                id="consent-check"
                                checked={formData.consent}
                                onChange={(e) => update("consent", e.target.checked)}
                            />
                            <label htmlFor="consent-check" className="checkbox-label">
                                I confirm that the information provided is accurate and I have the nominee's consent to submit this nomination. <span className="req">*</span>
                            </label>
                        </div>

                        <button className="submit-btn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                            SUBMIT NOMINATION
                        </button>

                        <div className="security-note">
                            <span className="lock">🔒</span>
                            Your information is secure and will be used only for IHWE Expo 2026 Advisory Board selection.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}