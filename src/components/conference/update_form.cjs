const fs = require('fs');

const filePath = '/Users/mac/Downloads/9th IHWE/frontend/src/components/conference/Arogyasangostiform.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

// 4. Fix top Header to match Image
const headerRegex = /\{\/\* ── HEADER ──[\s\S]*?(?=\{\/\* ── FORM BODY ──)/;
const newHeader = `{/* ── HEADER ─────────────────────────────────────────────────────────── */}
            <div
                style={{
                    background: "white",
                    padding: "30px 40px",
                    borderBottom: \`2px solid \${TEAL}\`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <img src="/assets/arogyasangosti.png" alt="Arogya Sanghosthi" style={{ height: 90, objectFit: 'contain' }} />
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", borderLeft: \`3px solid \${TEAL}\`, paddingLeft: 24 }}>
                    <div style={{ color: TEAL, fontWeight: 900, fontSize: 36, lineHeight: 1, letterSpacing: 1 }}>
                        SPEAKER
                    </div>
                    <div style={{ color: TEAL, fontWeight: 900, fontSize: 36, lineHeight: 1, letterSpacing: 1 }}>
                        NOMINATION FORM
                    </div>
                    <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, color: TEXT_DARK, fontSize: 14, fontWeight: 500 }}>
                            <span style={{ color: TEAL }}>❖</span> Share Your Knowledge.
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, color: TEXT_DARK, fontSize: 14, fontWeight: 500 }}>
                            <span style={{ color: TEAL }}>❖</span> Inspire Change. Shape the Future.
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        background: TEAL,
                        borderRadius: 8,
                        padding: "20px 16px",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 10,
                        border: \`2px solid \${GOLD}\`
                    }}
                >
                    <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                        <path d="M24 4 L40 18 L32 18 L32 40 L16 40 L16 18 L8 18 Z" fill={GOLD} />
                    </svg>
                    <div style={{ color: "white", fontWeight: 700, fontSize: 12, lineHeight: 1.4, textAlign: "center", letterSpacing: 1 }}>
                        BUILDING A<br />HEALTHIER<br />FUTURE<br />TOGETHER
                    </div>
                </div>
            </div>
            `;
content = content.replace(headerRegex, newHeader);

// Remove the section wrapping styles to make it look like a seamless form
const sectionRegex = /<section style=\{\{ background: "white", borderRadius: 10, padding: "20px 22px", boxShadow: "0 1px 8px rgba\(26,92,90,0\.07\)", border: `1px solid \$\{BORDER_COLOR\}` \}\}>/g;
content = content.replace(sectionRegex, '<section style={{ marginBottom: 40 }}>');

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Updated Header and Sections!");
