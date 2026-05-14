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
    background: #f0f2f0;
    min-width: 1400px;
  }

  .page-wrapper {
    width: 1400px;
    margin: 0 auto;
    background: #fff;
    font-family: 'Open Sans', sans-serif;
    box-shadow: 0 0 40px rgba(0,0,0,0.10);
  }

  /* ── HERO BANNER ── */
  .hero {
    background: linear-gradient(120deg, #12280f 0%, #1e4a1a 18%, #2e6e28 38%, #4a9038 56%, #78b830 74%, #b8d430 88%, #d8e840 100%);
    padding: 28px 56px 24px 48px;
    position: relative;
    overflow: hidden;
    min-height: 140px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .hero::after {
    content: '';
    position: absolute;
    top: -30px; right: 200px;
    width: 340px; height: 340px;
    background: radial-gradient(circle, rgba(255,230,60,0.13) 0%, transparent 68%);
    border-radius: 50%;
    pointer-events: none;
  }

  .hero-left {
    display: flex;
    align-items: center;
    gap: 18px;
    z-index: 2;
    flex-shrink: 0;
  }

  .logo-circle {
    width: 78px; height: 78px;
    border-radius: 50%;
    background: linear-gradient(145deg, #c8d840, #8ab820);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 38px;
    font-weight: 900;
    color: #1a3a1a;
    flex-shrink: 0;
    border: 3px solid rgba(255,255,255,0.32);
    box-shadow: 0 6px 20px rgba(0,0,0,0.28);
  }

  .logo-text { z-index: 2; }

  .logo-text .title-top {
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    font-weight: 700;
    color: #dff0d8;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    line-height: 1.3;
  }

  .logo-text .title-main {
    font-family: 'Montserrat', sans-serif;
    font-size: 30px;
    font-weight: 900;
    color: #f5e535;
    letter-spacing: 1.5px;
    line-height: 1.05;
  }

  .hero-tagline {
    font-family: 'Open Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #c2e2a0;
    letter-spacing: 0.5px;
    margin-top: 5px;
  }

  .hero-center {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    position: relative;
  }

  .hero-figure-svg {
    width: 86px; height: 110px;
    filter: drop-shadow(0 3px 10px rgba(0,0,0,0.32));
  }

  .hero-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
    z-index: 2;
    flex-shrink: 0;
  }

  .hex-icons {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .hex-icon {
    width: 52px; height: 58px;
    background: rgba(255,255,255,0.13);
    border: 1.5px solid rgba(255,255,255,0.28);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
  }

  /* ── BODY LAYOUT ── */
  .body-layout {
    display: flex;
    align-items: flex-start;
  }

  /* ── SIDEBAR ── */
  .sidebar {
    width: 290px;
    flex-shrink: 0;
    padding: 36px 26px 32px 32px;
    background: #fff;
    border-right: 1.5px solid #efefef;
  }

  .sidebar-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 26px;
    font-weight: 900;
    color: #1a3a1a;
    line-height: 1.18;
    margin-bottom: 5px;
  }

  .sidebar-subtitle {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #333;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    margin-bottom: 8px;
  }

  .sidebar-divider {
    width: 44px; height: 3.5px;
    background: #f5a623;
    border-radius: 2px;
    margin-bottom: 18px;
  }

  .sidebar-desc {
    font-size: 12.5px;
    color: #555;
    line-height: 1.7;
    margin-bottom: 32px;
  }

  .why-nominate-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 13px;
    font-weight: 800;
    color: #1a3a1a;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    margin-bottom: 4px;
  }

  .why-divider {
    width: 32px; height: 3px;
    background: #f5a623;
    border-radius: 2px;
    margin-bottom: 20px;
  }

  .why-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 18px;
  }

  .why-icon {
    width: 38px; height: 38px;
    border-radius: 50%;
    background: #f0f8f0;
    border: 1.5px solid #c0dcc0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .why-text h4 {
    font-family: 'Montserrat', sans-serif;
    font-size: 12.5px;
    font-weight: 700;
    color: #1a3a1a;
    margin-bottom: 3px;
  }

  .why-text p {
    font-size: 11.5px;
    color: #666;
    line-height: 1.55;
  }

  .help-box {
    background: #1a3a1a;
    border-radius: 12px;
    padding: 20px 18px;
    margin-top: 28px;
  }

  .help-box-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
  }

  .help-icon {
    width: 34px; height: 34px;
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }

  .help-box-header span {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 800;
    color: #fff;
    letter-spacing: 0.5px;
  }

  .help-item {
    display: flex;
    align-items: center;
    gap: 9px;
    font-size: 12px;
    color: #b8e0a0;
    margin-bottom: 9px;
  }

  .help-divider {
    height: 1px;
    background: rgba(255,255,255,0.15);
    margin: 12px 0;
  }

  .help-assist {
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    font-weight: 700;
    color: rgba(255,255,255,0.65);
    text-align: center;
    margin-top: 4px;
  }

  /* ── MAIN FORM ── */
  .form-area {
    flex: 1;
    padding: 36px 40px 40px 36px;
    background: #f7f8f7;
    min-width: 0;
  }

  .section-block {
    background: #fff;
    border-radius: 10px;
    border: 1px solid #e4e8e4;
    padding: 28px 28px 26px 28px;
    margin-bottom: 24px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1.5px solid #e8ebe8;
  }

  .section-num {
    width: 30px; height: 30px;
    background: #1a3a1a;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 13px;
    font-weight: 800;
    color: #fff;
    flex-shrink: 0;
  }

  .section-icon { font-size: 20px; flex-shrink: 0; }

  .section-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 800;
    color: #1a3a1a;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .section-line {
    flex: 1;
    height: 1.5px;
    background: #e0e4e0;
    margin-left: 6px;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 20px;
  }

  .form-row.single { grid-template-columns: 1fr; }
  .form-row:last-child { margin-bottom: 0; }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .form-label {
    font-size: 12.5px;
    font-weight: 600;
    color: #2a2a2a;
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .form-label .req { color: #e53935; font-size: 13px; }

  .form-input {
    height: 42px;
    border: 1px solid #d4d8d4;
    border-radius: 7px;
    padding: 0 13px;
    font-size: 13px;
    font-family: 'Open Sans', sans-serif;
    color: #333;
    background: #fff;
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s;
    width: 100%;
  }

  .form-input:focus {
    border-color: #2d7a2d;
    box-shadow: 0 0 0 3px rgba(45,122,45,0.10);
  }

  .form-input::placeholder { color: #c0c4c0; font-size: 12.5px; }
  .form-input.with-icon { padding-left: 36px; }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-icon {
    position: absolute;
    left: 11px;
    font-size: 14px;
    color: #aaa;
    pointer-events: none;
    z-index: 1;
  }

  .form-select {
    height: 42px;
    border: 1px solid #d4d8d4;
    border-radius: 7px;
    padding: 0 36px 0 13px;
    font-size: 13px;
    font-family: 'Open Sans', sans-serif;
    color: #c0c4c0;
    background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E") no-repeat right 12px center;
    appearance: none;
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s;
    cursor: pointer;
    width: 100%;
  }

  .form-select:focus {
    border-color: #2d7a2d;
    box-shadow: 0 0 0 3px rgba(45,122,45,0.10);
  }

  .form-select.selected { color: #333; }

  .form-textarea {
    border: 1px solid #d4d8d4;
    border-radius: 7px;
    padding: 12px 13px;
    font-size: 13px;
    font-family: 'Open Sans', sans-serif;
    color: #333;
    background: #fff;
    outline: none;
    resize: none;
    transition: border-color 0.18s, box-shadow 0.18s;
    width: 100%;
    line-height: 1.6;
  }

  .form-textarea:focus {
    border-color: #2d7a2d;
    box-shadow: 0 0 0 3px rgba(45,122,45,0.10);
  }

  .form-textarea::placeholder { color: #c0c4c0; font-size: 12.5px; }

  .char-count {
    text-align: right;
    font-size: 11px;
    color: #bbb;
    margin-top: 4px;
  }

  .phone-row {
    display: flex;
    align-items: center;
    border: 1px solid #d4d8d4;
    border-radius: 7px;
    overflow: hidden;
    background: #fff;
    height: 42px;
    transition: border-color 0.18s, box-shadow 0.18s;
  }

  .phone-row:focus-within {
    border-color: #2d7a2d;
    box-shadow: 0 0 0 3px rgba(45,122,45,0.10);
  }

  .phone-prefix {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 12px;
    border-right: 1px solid #e0e4e0;
    font-size: 13px;
    color: #333;
    background: #f8faf8;
    height: 100%;
    flex-shrink: 0;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
  }

  .flag { font-size: 17px; }
  .phone-arrow { font-size: 9px; color: #888; }

  .phone-input {
    flex: 1;
    height: 100%;
    border: none;
    padding: 0 12px;
    font-size: 13px;
    font-family: 'Open Sans', sans-serif;
    color: #333;
    outline: none;
    background: transparent;
    min-width: 0;
  }

  .phone-input::placeholder { color: #c0c4c0; font-size: 12.5px; }

  .info-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 15px; height: 15px;
    border-radius: 50%;
    border: 1.5px solid #aaa;
    font-size: 9px;
    color: #888;
    font-style: italic;
    font-family: serif;
    font-weight: 700;
    cursor: pointer;
    margin-left: 5px;
  }

  .textarea-wrap { display: flex; flex-direction: column; }

  .upload-row {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .upload-label-block { flex: 1; }
  .upload-label-block .form-label { margin-bottom: 4px; }

  .upload-hint {
    font-size: 11.5px;
    color: #999;
    margin-top: 2px;
  }

  .upload-box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
    border: 2px dashed #a8c8a8;
    border-radius: 10px;
    padding: 18px 40px;
    background: #f4fbf4;
    cursor: pointer;
    min-width: 240px;
    transition: border-color 0.2s, background 0.2s;
  }

  .upload-box:hover { border-color: #2d7a2d; background: #edf7ed; }
  .upload-icon { font-size: 26px; }

  .upload-box-text {
    font-size: 13px;
    font-weight: 600;
    color: #2d7a2d;
    text-align: center;
  }

  .upload-box-sub {
    font-size: 11.5px;
    color: #888;
    text-align: center;
  }

  .checkbox-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-top: 8px;
  }

  .form-checkbox {
    width: 16px; height: 16px;
    margin-top: 1px;
    accent-color: #2d7a2d;
    cursor: pointer;
    flex-shrink: 0;
  }

  .checkbox-label {
    font-size: 12px;
    color: #444;
    line-height: 1.55;
  }

  .checkbox-label .req { color: #e53935; }

  .submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    height: 54px;
    background: #1a3a1a;
    border: none;
    border-radius: 9px;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    font-weight: 800;
    color: #fff;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    cursor: pointer;
    margin-top: 22px;
    transition: background 0.2s, transform 0.1s;
    box-shadow: 0 4px 16px rgba(26,58,26,0.18);
  }

  .submit-btn:hover { background: #264a26; }
  .submit-btn:active { transform: scale(0.993); }

  .security-note {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 11.5px;
    color: #888;
    margin-top: 12px;
    text-align: center;
  }
`;

(() => {
    const existing = document.getElementById("advisory-styles");
    if (!existing) {
        const tag = document.createElement("style");
        tag.id = "advisory-styles";
        tag.textContent = styles;
        document.head.appendChild(tag);
    }
})();

const SectionHeader = ({ num, icon, title }: { num: string; icon: string; title: string }) => (
    <div className="section-header">
        <div className="section-num">{num}</div>
        <span className="section-icon">{icon}</span>
        <span className="section-title">{title}</span>
        <div className="section-line" />
    </div>
);

export default function Advisory() {
    const [formData, setFormData] = useState({
        fullName: "", designation: "", organization: "", industry: "",
        email: "", phone: "", linkedin: "", expertise: "", years: "",
        summary: "", whyRecommend: "", contribution: "",
        nominatorName: "", nominatorDesig: "", nominatorOrg: "",
        nominatorEmail: "", nominatorPhone: "", relationship: "",
        consent: false,
    });

    const update = (field: string, value: string | boolean) =>
        setFormData((p) => ({ ...p, [field]: value }));

    return (
        <div className="page-wrapper">

            {/* HERO */}
            <div className="hero">
                <div className="hero-left">
                    <div className="logo-circle">9</div>
                    <div className="logo-text">
                        <div className="title-top">International Health &amp; Wellness</div>
                        <div className="title-main">EXPO 2026</div>
                        <div className="hero-tagline">Global Platform.&nbsp;&nbsp;&nbsp;Limitless Possibilities.</div>
                    </div>
                </div>

                <div className="hero-center">
                    <svg className="hero-figure-svg" viewBox="0 0 86 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="43" cy="55" r="46" fill="rgba(100,180,80,0.15)" />
                        <ellipse cx="43" cy="28" rx="11" ry="11" fill="#2d6a2d" opacity="0.92" />
                        <path d="M31 46 Q43 38 55 46 L58 84 Q43 90 28 84 Z" fill="#2d6a2d" opacity="0.92" />
                        <path d="M31 48 Q21 58 18 72 Q24 76 29 68 Z" fill="#2d6a2d" opacity="0.92" />
                        <path d="M55 48 Q65 58 68 72 Q62 76 57 68 Z" fill="#2d6a2d" opacity="0.92" />
                        <path d="M32 84 Q29 94 27 102 Q34 105 37 97 Z" fill="#2d6a2d" opacity="0.92" />
                        <path d="M54 84 Q57 94 59 102 Q52 105 49 97 Z" fill="#2d6a2d" opacity="0.92" />
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

            {/* BODY */}
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
                        <div className="help-item"><span>✉️</span> support@ihwe.in</div>
                        <div className="help-item"><span>📞</span> +91 98765 43210</div>
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
                                <input className="form-input" placeholder="Enter full name"
                                    value={formData.fullName} onChange={(e) => update("fullName", e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Designation / Title <span className="req">*</span></label>
                                <input className="form-input" placeholder="Enter designation"
                                    value={formData.designation} onChange={(e) => update("designation", e.target.value)} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Organization / Institution <span className="req">*</span></label>
                                <div className="input-wrapper">
                                    <span className="input-icon">🏢</span>
                                    <input className="form-input with-icon" placeholder="Enter organization / institution"
                                        value={formData.organization} onChange={(e) => update("organization", e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Industry / Sector <span className="req">*</span></label>
                                <select className={`form-select${formData.industry ? " selected" : ""}`}
                                    value={formData.industry} onChange={(e) => update("industry", e.target.value)}>
                                    <option value="">Select industry / sector</option>
                                    <option>Healthcare</option><option>Wellness</option>
                                    <option>Pharmaceuticals</option><option>Nutrition</option>
                                    <option>Fitness</option><option>Technology</option>
                                    <option>Research</option><option>Education</option><option>Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Email Address <span className="req">*</span></label>
                                <div className="input-wrapper">
                                    <span className="input-icon">✉️</span>
                                    <input className="form-input with-icon" type="email" placeholder="Enter email address"
                                        value={formData.email} onChange={(e) => update("email", e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone Number <span className="req">*</span></label>
                                <div className="phone-row">
                                    <div className="phone-prefix">
                                        <span className="flag">🇮🇳</span>
                                        <span>+91</span>
                                        <span className="phone-arrow">▼</span>
                                    </div>
                                    <input className="phone-input" type="tel" placeholder="Enter phone number"
                                        value={formData.phone} onChange={(e) => update("phone", e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="form-row single">
                            <div className="form-group">
                                <label className="form-label">LinkedIn Profile (if available)</label>
                                <div className="input-wrapper">
                                    <span className="input-icon" style={{ fontFamily: "sans-serif", fontWeight: 700, fontSize: 13, color: "#0077b5" }}>in</span>
                                    <input className="form-input with-icon" placeholder="https://www.linkedin.com/in/yourprofile"
                                        value={formData.linkedin} onChange={(e) => update("linkedin", e.target.value)} />
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
                                <select className={`form-select${formData.expertise ? " selected" : ""}`}
                                    value={formData.expertise} onChange={(e) => update("expertise", e.target.value)}>
                                    <option value="">Select one or more areas</option>
                                    <option>Clinical Medicine</option><option>Public Health</option>
                                    <option>Nutrition &amp; Dietetics</option><option>Mental Health</option>
                                    <option>Holistic Wellness</option><option>Medical Research</option>
                                    <option>Health Policy</option><option>Health Technology</option>
                                    <option>Sports &amp; Fitness</option><option>Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Years of Experience <span className="req">*</span></label>
                                <input className="form-input" type="number" placeholder="Enter total years of experience"
                                    value={formData.years} onChange={(e) => update("years", e.target.value)} />
                            </div>
                        </div>

                        <div className="form-row single">
                            <div className="form-group">
                                <label className="form-label">
                                    Professional Summary <span className="req">*</span>
                                    <span className="info-icon">i</span>
                                </label>
                                <div className="textarea-wrap">
                                    <textarea className="form-textarea" style={{ minHeight: 96 }}
                                        placeholder="Briefly describe the nominee's professional background, key achievements and contributions."
                                        maxLength={1000} value={formData.summary}
                                        onChange={(e) => update("summary", e.target.value)} />
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
                                    <textarea className="form-textarea" style={{ minHeight: 88 }}
                                        placeholder="Share your reasons and how their expertise will add value to IHWE Expo 2026."
                                        maxLength={1000} value={formData.whyRecommend}
                                        onChange={(e) => update("whyRecommend", e.target.value)} />
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
                                    <textarea className="form-textarea" style={{ minHeight: 88 }}
                                        placeholder="Describe the potential impact and value the nominee will bring."
                                        maxLength={1000} value={formData.contribution}
                                        onChange={(e) => update("contribution", e.target.value)} />
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
                                <input className="form-input" placeholder="Enter your full name"
                                    value={formData.nominatorName} onChange={(e) => update("nominatorName", e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Designation / Title <span className="req">*</span></label>
                                <input className="form-input" placeholder="Enter designation"
                                    value={formData.nominatorDesig} onChange={(e) => update("nominatorDesig", e.target.value)} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Organization / Institution <span className="req">*</span></label>
                                <div className="input-wrapper">
                                    <span className="input-icon">🏢</span>
                                    <input className="form-input with-icon" placeholder="Enter organization"
                                        value={formData.nominatorOrg} onChange={(e) => update("nominatorOrg", e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email Address <span className="req">*</span></label>
                                <div className="input-wrapper">
                                    <span className="input-icon">✉️</span>
                                    <input className="form-input with-icon" type="email" placeholder="Enter email address"
                                        value={formData.nominatorEmail} onChange={(e) => update("nominatorEmail", e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Phone Number <span className="req">*</span></label>
                                <div className="phone-row">
                                    <div className="phone-prefix">
                                        <span className="flag">🇮🇳</span>
                                        <span>+91</span>
                                        <span className="phone-arrow">▼</span>
                                    </div>
                                    <input className="phone-input" type="tel" placeholder="Enter phone number"
                                        value={formData.nominatorPhone} onChange={(e) => update("nominatorPhone", e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Relationship with Nominee <span className="req">*</span></label>
                                <select className={`form-select${formData.relationship ? " selected" : ""}`}
                                    value={formData.relationship} onChange={(e) => update("relationship", e.target.value)}>
                                    <option value="">Select relationship</option>
                                    <option>Colleague</option><option>Supervisor / Manager</option>
                                    <option>Mentor</option><option>Industry Peer</option>
                                    <option>Research Collaborator</option><option>Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 05 */}
                    <div className="section-block">
                        <SectionHeader num="05" icon="📎" title="ADDITIONAL INFORMATION" />

                        <div className="upload-row">
                            <div className="upload-label-block">
                                <label className="form-label">
                                    Upload Nominee's CV / Profile&nbsp;
                                    <span style={{ color: "#888", fontWeight: 400 }}>(Optional)</span>
                                </label>
                                <div className="upload-hint">PDF, DOC, or DOCX (Max. 5MB)</div>
                            </div>
                            <div className="upload-box">
                                <span className="upload-icon">☁️</span>
                                <div className="upload-box-text">Click to upload</div>
                                <div className="upload-box-sub">or drag and drop file here</div>
                            </div>
                        </div>

                        <div className="checkbox-row" style={{ marginTop: 22 }}>
                            <input type="checkbox" className="form-checkbox" id="consent-check"
                                checked={formData.consent} onChange={(e) => update("consent", e.target.checked)} />
                            <label htmlFor="consent-check" className="checkbox-label">
                                I confirm that the information provided is accurate and I have the nominee's consent to submit this nomination.{" "}
                                <span className="req">*</span>
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
                            🔒&nbsp; Your information is secure and will be used only for IHWE Expo 2026 Advisory Board selection.
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}