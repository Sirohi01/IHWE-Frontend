const fs = require('fs');

const filePath = '/Users/mac/Downloads/9th IHWE/frontend/src/components/conference/Arogyasangostiform.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Update Colors
content = content.replace(/const TEAL = "#1A5C5A";/, 'const TEAL = "#0B3C49";');
content = content.replace(/const GOLD = "#B8962E";/, 'const GOLD = "#B8962E";');
content = content.replace(/const LIGHT_TEAL_BG = "#EAF4F3";/, 'const LIGHT_TEAL_BG = "#F4F7F7";');

// 2. Update SectionHeader
const newSectionHeader = `const SectionHeader: React.FC<{
    number: string;
    title: string;
    icon: React.ReactNode;
    gold?: boolean;
}> = ({ number, title, icon, gold = false }) => (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <div 
            style={{ 
                background: gold ? GOLD : TEAL, 
                display: "flex", 
                alignItems: "center",
                padding: "8px 36px 8px 16px",
                clipPath: "polygon(0 0, 100% 0, 92% 100%, 0 100%)",
                minWidth: 280
            }}
        >
            <span style={{ color: "white", fontSize: 20, fontWeight: 800, marginRight: 16 }}>{number}</span>
            <div style={{ 
                border: "1.5px solid rgba(255,255,255,0.6)", 
                borderRadius: "50%", 
                width: 28, height: 28,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginRight: 12
            }}>
                {icon}
            </div>
            <span style={{ color: "white", fontSize: 16, fontWeight: 700, letterSpacing: 1.5, fontFamily: "'Segoe UI', sans-serif" }}>
                {title.toUpperCase()}
            </span>
        </div>
        <div style={{ flex: 1, borderBottom: \`2px solid \${gold ? GOLD : TEAL}\`, opacity: 0.1, marginLeft: -20, zIndex: -1 }}></div>
    </div>
);`;

content = content.replace(/const SectionHeader[\s\S]*?(?=const FormField)/, newSectionHeader + '\n\n');

// 3. Update FormField
const newFormField = `const FormField: React.FC<{
    label: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    type?: string;
    value?: string;
    onChange?: (v: string) => void;
    placeholder?: string;
}> = ({ label, icon, children, type = "text", value, onChange, placeholder }) => (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 14, gap: 12 }}>
        {icon && <span style={{ minWidth: 20, display: "flex", alignItems: "center" }}>{icon}</span>}
        <label
            style={{
                minWidth: 160,
                fontSize: 13,
                color: TEXT_DARK,
                fontFamily: "'Segoe UI', sans-serif",
                fontWeight: 600,
            }}
        >
            {label}
        </label>
        <span style={{ color: TEXT_DARK, fontWeight: 600 }}>:</span>
        {children ?? (
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange?.(e.target.value)}
                style={{
                    flex: 1,
                    border: \`1px solid \${BORDER_COLOR}\`,
                    borderRadius: 4,
                    outline: "none",
                    fontSize: 13,
                    padding: "8px 12px",
                    fontFamily: "'Segoe UI', sans-serif",
                    color: TEXT_DARK,
                    background: "#FAFAFA",
                }}
            />
        )}
    </div>
);`;

content = content.replace(/const FormField[\s\S]*?(?=const CategoryChip)/, newFormField + '\n\n');

// 4. Fix top Header to match Image
// Let's replace the whole top header div
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
                    <img src="/arogyasangosti.png" alt="Arogya Sanghosthi" style={{ height: 90, objectFit: 'contain' }} />
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
content = content.replace(/<section style={{ background: "white", borderRadius: 10, padding: "20px 22px", boxShadow: "0 1px 8px rgba\(26,92,90,0.07\)", border: `1px solid \${BORDER_COLOR}` }}>/g, '<section style={{ marginBottom: 40 }}>');

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Updated!");
