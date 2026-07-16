import { useState } from 'react';
import {
    ArrowRight,
    Building2,
    CalendarDays,
    Check,
    CheckCircle2,
    ChevronDown,
    ClipboardCheck,
    ClipboardList,
    Clock3,
    Headphones,
    Hotel,
    Lightbulb,
    Mail,
    MapPin,
    Megaphone,
    MessageCircle,
    Package,
    Phone,
    Plane,
    Save,
    ShieldCheck,
    Store,
    Truck,
    UserRound,
    WalletCards,
} from 'lucide-react';

const safe = (value, fallback = '—') => {
    if (value === null || value === undefined || value === '') return fallback;
    return value;
};

const fieldValue = (data, paths, fallback) => {
    for (const path of paths) {
        const value = path.split('.').reduce((obj, key) => obj?.[key], data);
        if (value !== null && value !== undefined && value !== '') return value;
    }
    return fallback;
};

function InfoField({ label, value, required, type = 'text', options = [], onChange, className = '' }) {
    return (
        <label className={`pms-field ${className}`}>
            <span className="pms-field-label">
                {label}
                {required && <b>*</b>}
            </span>

            <div className="pms-input-wrap">
                {type === 'select' ? (
                    <>
                        <select className="pms-input" value={value ?? ''} onChange={(event) => onChange?.(event.target.value)}>
                            {options.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        <ChevronDown className="pms-select-icon" size={13} strokeWidth={1.8} />
                    </>
                ) : (
                    <input
                        className="pms-input"
                        value={value ?? ''}
                        onChange={(event) => onChange?.(event.target.value)}
                        title={String(value ?? '')}
                    />
                )}
            </div>
        </label>
    );
}

function Section({ icon, letter, title, note, children, className = '' }) {
    return (
        <section className={`pms-section ${className}`}>
            <div className="pms-section-title">
                <span className="pms-section-icon">{icon}</span>
                <strong>{letter}. {title}</strong>
                {note && <small>{note}</small>}
            </div>
            {children}
        </section>
    );
}

function Step({ number, label, active }) {
    return (
        <div className={`pms-step ${active ? 'is-active' : ''}`}>
            <span className="pms-step-number">{number}</span>
            <small>{label}</small>
        </div>
    );
}

function SummaryRow({ label, value, checked = true, navy = false }) {
    return (
        <div className="pms-summary-row">
            <span>{label}</span>
            <strong className={navy ? 'is-navy' : ''}>{value}</strong>
            {checked ? <CheckCircle2 size={13} strokeWidth={2.4} /> : <i />}
        </div>
    );
}

function ExpenseCard({ icon, title, note, selected, onClick }) {
    return (
        <button type="button" className={`pms-expense-card ${selected ? 'is-selected' : ''}`} onClick={onClick}>
            <span className="pms-check">{selected && <Check size={11} strokeWidth={3} />}</span>
            <span className="pms-expense-icon">{icon}</span>
            <strong>{title}</strong>
            {note && <small>{note}</small>}
        </button>
    );
}

export default function MSMEPMSApplication({ data }) {
    const initialCompanyName = fieldValue(
        data,
        ['exhibitorName', 'companyName', 'organizationName'],
        'Velruma Pvt. Ltd.'
    );

    const stallNo = fieldValue(
        data,
        ['participation.stallFor', 'participation.stall.stallNumber', 'participation.stallNumber', 'stallFor', 'participation.stallNo', 'stallNo'],
        '139'
    );

    const hallNo = fieldValue(
        data,
        ['participation.stall.hallNo', 'participation.hallNo', 'hallNo'],
        'Hall 9'
    );

    const stallSize = fieldValue(
        data,
        ['participation.stallSize', 'participation.stall.area', 'participation.area', 'stallSize'],
        '18 Sqm'
    );

    const contactName = [data?.contact1?.firstName, data?.contact1?.lastName]
        .filter(Boolean)
        .join(' ') || 'Manish Sirohi';

    const [form, setForm] = useState(() => ({
        companyName: initialCompanyName,
        udyamRegNo: safe(data?.msme?.udyamRegNo, 'UP09D0012345'),
        gstNumber: safe(data?.gstNo || data?.gstNumber, '09AAACV1234A1Z5'),
        panNumber: safe(data?.panNo || data?.panNumber, 'AAACV1234A'),
        organizationType: safe(data?.organizationType, 'Private Limited Company'),
        yearOfEstablishment: safe(data?.yearOfEstablishment, '2021'),
        msmeCategory: safe(data?.msme?.msmeCategory, 'Micro'),
        contactName,
        designation: safe(data?.contact1?.designation, 'Director'),
        mobileNumber: safe(data?.contact1?.mobile, '+91 95682 59784'),
        alternateNumber: safe(data?.contact1?.alternateNo, '+91 98102 42071'),
        addressLine1: safe(data?.address, '12/52, Site-II, Loni Road, Industrial Area'),
        addressLine2: safe(data?.addressLine2, 'Mohan Nagar'),
        country: safe(data?.country, 'India'),
        state: safe(data?.state, 'Uttar Pradesh'),
        city: safe(data?.city, 'Ghaziabad'),
        pincode: safe(data?.pincode, '201007'),
        eventName: '9th International Health & Wellness Expo 2026',
        stallNo,
        hallNo,
        stallSize,
        participationType: 'Shell Space',
        bookingStatus: 'Confirmed',
        paymentStatus: 'Fully Paid',
    }));
    const [selectedExpenses, setSelectedExpenses] = useState(['Stall Charges']);

    const setField = (name, value) => {
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const toggleExpense = (title) => {
        if (title === 'Stall Charges') return;
        setSelectedExpenses(prev => (
            prev.includes(title)
                ? prev.filter(item => item !== title)
                : [...prev, title]
        ));
    };

    const companyName = form.companyName;

    const companyFields = [
        { name: 'companyName', label: 'Company Name', required: true },
        { name: 'udyamRegNo', label: 'Udyam Registration Number', required: true },
        { name: 'gstNumber', label: 'GST Number', required: true },
        { name: 'panNumber', label: 'PAN Number', required: true },
        { name: 'organizationType', label: 'Type of Organization', required: true, type: 'select', options: ['Private Limited Company', 'Proprietorship', 'Partnership', 'LLP', 'Public Limited Company', 'Trust', 'Society'] },
        { name: 'yearOfEstablishment', label: 'Year of Establishment', required: true, type: 'select', options: Array.from({ length: 77 }, (_, index) => String(2026 - index)) },
    ];

    const personFields = [
        { name: 'contactName', label: 'Contact Person Name', required: true },
        { name: 'designation', label: 'Designation', required: true },
        { name: 'mobileNumber', label: 'Mobile Number', required: true },
        { name: 'alternateNumber', label: 'Alternative Contact Number', required: false },
    ];

    const addressFields = [
        { name: 'addressLine1', label: 'Address Line 1', required: true },
        { name: 'addressLine2', label: 'Address Line 2', required: false },
        { name: 'country', label: 'Country', required: true, type: 'select', options: ['India', 'Afghanistan', 'Bangladesh', 'Bhutan', 'Nepal', 'Sri Lanka', 'United Arab Emirates', 'United States'] },
        { name: 'state', label: 'State', required: true, type: 'select', options: ['Uttar Pradesh', 'Delhi', 'Haryana', 'Maharashtra', 'Gujarat', 'Rajasthan', 'Punjab', 'Karnataka', 'Tamil Nadu', 'West Bengal'] },
        { name: 'city', label: 'City', required: true },
        { name: 'pincode', label: 'Pincode', required: true },
    ];

    const coordinatorImage = safe(
        data?.pmsCoordinator?.photo,
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit&backgroundColor=eef2f7'
    );

    return (
        <>
            <style>{styles}</style>

            <div className="pms-page">
                <header className="pms-topbar">
                    <div className="pms-title">
                        <h1>MSME PMS Application Form</h1>
                        <p><b>Step 1 of 5</b> - Applicant &amp; MSME Details</p>
                    </div>

                    <div className="pms-meta">
                        <div className="pms-meta-id">
                            <span>Application ID</span>
                            <strong>{safe(data?.applicationId, 'PMS-IHWE-2026-00139')}</strong>
                        </div>
                        <div>
                            <span>Status</span>
                            <strong className="draft">Draft</strong>
                        </div>
                        <div>
                            <span>Progress</span>
                            <strong className="progress">20%</strong>
                        </div>
                    </div>
                </header>

                <div className="pms-workspace">
                    <div className="pms-left-column">
                        <div className="pms-stepper">
                            <Step number="1" label="Applicant Details" active />
                            <Step number="2" label="Business Details" />
                            <Step number="3" label="Documents" />
                            <Step number="4" label="Review" />
                            <Step number="5" label="Submit" />
                        </div>

                        <main className="pms-main">
                            <Section
                                letter="A"
                                title="Company / Organization Details"
                                icon={<Building2 size={17} strokeWidth={1.8} />}
                            >
                                <div className="pms-grid company-top-grid">
                                    {companyFields.slice(0, 4).map(field => (
                                        <InfoField
                                            key={field.name}
                                            label={field.label}
                                            value={form[field.name]}
                                            required={field.required}
                                            type={field.type}
                                            options={field.options}
                                            onChange={(value) => setField(field.name, value)}
                                        />
                                    ))}
                                </div>

                                <div className="pms-grid company-bottom-grid">
                                    {companyFields.slice(4).map(field => (
                                        <InfoField
                                            key={field.name}
                                            label={field.label}
                                            value={form[field.name]}
                                            required={field.required}
                                            type={field.type}
                                            options={field.options}
                                            onChange={(value) => setField(field.name, value)}
                                        />
                                    ))}

                                    <div className="pms-field pms-msme-field">
                                        <span className="pms-field-label">MSME Category <b>*</b></span>
                                        <div className="pms-radio-row">
                                            {['Micro', 'Small', 'Medium'].map(category => (
                                                <label key={category}>
                                                    <input
                                                        type="radio"
                                                        name="msmeCategory"
                                                        value={category}
                                                        checked={form.msmeCategory === category}
                                                        onChange={(event) => setField('msmeCategory', event.target.value)}
                                                    />
                                                    <i className={form.msmeCategory === category ? 'selected' : ''} />
                                                    {category}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Section>

                            <div className="pms-two-sections">
                                <Section
                                    letter="B"
                                    title="Authorized Person Details"
                                    icon={<UserRound size={17} strokeWidth={1.8} />}
                                >
                                    <div className="pms-grid person-top-grid">
                                        {personFields.slice(0, 3).map(field => (
                                            <InfoField
                                                key={field.name}
                                                label={field.label}
                                                value={form[field.name]}
                                                required={field.required}
                                                onChange={(value) => setField(field.name, value)}
                                            />
                                        ))}
                                    </div>

                                    <InfoField
                                        label={personFields[3].label}
                                        value={form[personFields[3].name]}
                                        required={personFields[3].required}
                                        className="pms-alt-contact"
                                        onChange={(value) => setField(personFields[3].name, value)}
                                    />
                                </Section>

                                <Section
                                    letter="C"
                                    title="Registered Address"
                                    icon={<MapPin size={17} strokeWidth={1.8} />}
                                >
                                    <div className="pms-grid address-top-grid">
                                        {addressFields.slice(0, 2).map(field => (
                                            <InfoField
                                                key={field.name}
                                                label={field.label}
                                                value={form[field.name]}
                                                required={field.required}
                                                onChange={(value) => setField(field.name, value)}
                                            />
                                        ))}
                                    </div>

                                    <div className="pms-grid address-bottom-grid">
                                        {addressFields.slice(2).map(field => (
                                            <InfoField
                                                key={field.name}
                                                label={field.label}
                                                value={form[field.name]}
                                                required={field.required}
                                                type={field.type}
                                                options={field.options}
                                                onChange={(value) => setField(field.name, value)}
                                            />
                                        ))}
                                    </div>
                                </Section>
                            </div>

                            <Section
                                letter="D"
                                title="Event Participation Details"
                                note="(Auto-fetched from IHWE)"
                                icon={<CalendarDays size={17} strokeWidth={1.8} />}
                                className="pms-event-section"
                            >
                                <div className="pms-grid event-grid">
                                    <InfoField
                                        label="Event Name"
                                        value={form.eventName}
                                        className="pms-event-name"
                                        onChange={(value) => setField('eventName', value)}
                                    />
                                    <InfoField label="Stall Number" value={form.stallNo} onChange={(value) => setField('stallNo', value)} />
                                    <InfoField label="Hall Number" value={form.hallNo} onChange={(value) => setField('hallNo', value)} />
                                    <InfoField label="Stall Size" value={form.stallSize} onChange={(value) => setField('stallSize', value)} />
                                    <InfoField
                                        label="Participation Type"
                                        value={form.participationType}
                                        type="select"
                                        options={['Shell Space', 'Bare Space', 'Sponsorship', 'Table Space']}
                                        onChange={(value) => setField('participationType', value)}
                                    />
                                    <InfoField
                                        label="Booking Status"
                                        value={form.bookingStatus}
                                        type="select"
                                        options={['Confirmed', 'Pending', 'Cancelled']}
                                        className="green-input"
                                        onChange={(value) => setField('bookingStatus', value)}
                                    />
                                    <InfoField
                                        label="Payment Status"
                                        value={form.paymentStatus}
                                        type="select"
                                        options={['Fully Paid', 'Partially Paid', 'Pending']}
                                        className="green-input"
                                        onChange={(value) => setField('paymentStatus', value)}
                                    />
                                </div>
                            </Section>

                            <Section
                                letter="E"
                                title="Expense Categories"
                                note="(Select all that apply)"
                                icon={<ClipboardList size={17} strokeWidth={1.8} />}
                                className="pms-expense-section"
                            >
                                <div className="pms-expense-grid">
                                    <ExpenseCard
                                        icon={<Store size={25} strokeWidth={1.7} />}
                                        title="Stall Charges"
                                        note="(Mandatory)"
                                        selected={selectedExpenses.includes('Stall Charges')}
                                        onClick={() => toggleExpense('Stall Charges')}
                                    />
                                    <ExpenseCard icon={<Hotel size={25} strokeWidth={1.7} />} title="Hotel Stay" selected={selectedExpenses.includes('Hotel Stay')} onClick={() => toggleExpense('Hotel Stay')} />
                                    <ExpenseCard icon={<Plane size={25} strokeWidth={1.7} />} title="Travel" selected={selectedExpenses.includes('Travel')} onClick={() => toggleExpense('Travel')} />
                                    <ExpenseCard icon={<Truck size={25} strokeWidth={1.7} />} title="Courier" selected={selectedExpenses.includes('Courier')} onClick={() => toggleExpense('Courier')} />
                                    <ExpenseCard icon={<Megaphone size={25} strokeWidth={1.7} />} title="Marketing Material" selected={selectedExpenses.includes('Marketing Material')} onClick={() => toggleExpense('Marketing Material')} />
                                    <ExpenseCard icon={<Package size={25} strokeWidth={1.7} />} title="Logistics / Others" selected={selectedExpenses.includes('Logistics / Others')} onClick={() => toggleExpense('Logistics / Others')} />
                                </div>
                            </Section>

                            <footer className="pms-actions">
                                <button type="button" className="pms-draft-button">
                                    <Save size={15} strokeWidth={2} />
                                    Save Draft
                                </button>

                                <span className="pms-security-note">
                                    <ShieldCheck size={14} strokeWidth={2.2} />
                                    Your information is secure and will only be used for PMS scheme processing.
                                </span>

                                <button type="button" className="pms-continue-button">
                                    Save &amp; Continue
                                    <ArrowRight size={18} strokeWidth={2} />
                                </button>
                            </footer>
                        </main>
                    </div>

                    <aside className="pms-side">
                        <section className="pms-side-card pms-summary-card">
                            <h2>
                                <span className="pms-side-title-icon"><ClipboardCheck size={18} strokeWidth={1.8} /></span>
                                Application Summary
                            </h2>
                            <SummaryRow label="Company Name" value={companyName} checked={false} navy />
                            <SummaryRow label="Udyam Registration" value="Verified" />
                            <SummaryRow label="GST Number" value="Verified" />
                            <SummaryRow label="IHWE Booking" value="Confirmed" />
                            <SummaryRow label="Payment Status" value="Fully Paid" />
                        </section>

                        <section className="pms-side-card pms-reimbursement-card">
                            <h2>Estimated Reimbursement <small>(Indicative)</small></h2>
                            <strong>₹ 1,50,000*</strong>
                            <p>Maximum benefit subject to scheme rules and authority approval.</p>
                            <button type="button">
                                <WalletCards size={16} strokeWidth={1.9} />
                                View Claim Calculation
                            </button>
                        </section>

                        <section className="pms-side-card pms-helpdesk-card">
                            <h2><Headphones size={19} strokeWidth={1.8} /> PMS Help Desk</h2>

                            <div className="pms-agent">
                                <div className="pms-agent-avatar">
                                    <span>RS</span>
                                    <img
                                        src={coordinatorImage}
                                        alt="Rohit Sharma"
                                        onError={(event) => { event.currentTarget.style.display = 'none'; }}
                                    />
                                </div>
                                <div>
                                    <strong>Rohit Sharma</strong>
                                    <span>PMS Scheme Coordinator</span>
                                </div>
                            </div>

                            <a href="tel:+919654900525">
                                <Phone size={15} strokeWidth={1.9} />
                                <span>+91 96549 00525</span>
                            </a>
                            <a href="https://wa.me/919654900525" target="_blank" rel="noreferrer">
                                <MessageCircle size={15} strokeWidth={1.9} />
                                <span>WhatsApp Support</span>
                            </a>
                            <a href="mailto:pms.support@ihwe.com">
                                <Mail size={15} strokeWidth={1.9} />
                                <span>pms.support@ihwe.com</span>
                            </a>

                            <div className="pms-hours">
                                <Clock3 size={15} strokeWidth={1.9} />
                                <div>
                                    <b>Support Hours</b>
                                    <span>Mon - Sat | 09:00 AM - 07:00 PM (IST)</span>
                                </div>
                            </div>
                        </section>

                        <section className="pms-assist">
                            <Lightbulb size={24} strokeWidth={1.7} />
                            <div>
                                <strong>Need Assistance?</strong>
                                <p>Our team will help you at every step of your PMS application.</p>
                            </div>
                        </section>
                    </aside>
                </div>
            </div>
        </>
    );
}

const styles = `
.pms-page,
.pms-page * {
    box-sizing: border-box;
}

.pms-page {
    --pms-navy: #061743;
    --pms-green: #087536;
    --pms-purple: #5924c6;
    --pms-border: #dbe4ef;
    --pms-soft-border: #e9eef4;
    --pms-muted: #3a4b70;

    width: 100%;
    height: calc(100dvh - 58px);
    min-height: 0;
    max-height: calc(100dvh - 58px);
    overflow: hidden;
    padding: 20px 24px 18px;
    background: #ffffff;
    color: var(--pms-navy);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: geometricPrecision;
}

.pms-page button,
.pms-page input,
.pms-page select {
    font: inherit;
}

.pms-topbar {
    height: 61px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 22px;
}

.pms-title {
    padding-top: 2px;
}

.pms-title h1 {
    margin: 0;
    color: var(--pms-navy);
    font-size: 24px;
    line-height: 1.08;
    font-weight: 600;
    letter-spacing: -0.35px;
}

.pms-title p {
    margin: 7px 0 0;
    color: var(--pms-navy);
    font-size: 14px;
    line-height: 1.2;
    font-weight: 700;
}

.pms-title p b {
    color: var(--pms-green);
    font-weight: 800;
}

.pms-meta {
    display: grid;
    grid-template-columns: 181px 93px 126px;
    gap: 14px;
}

.pms-meta > div {
    height: 55px;
    padding: 10px 16px 8px;
    border: 1px solid var(--pms-border);
    border-radius: 7px;
    background: #ffffff;
    box-shadow: 0 1px 2px rgba(5, 23, 67, 0.02);
}

.pms-meta span {
    display: block;
    color: #31436b;
    font-size: 10px;
    line-height: 1;
    font-weight: 500;
}

.pms-meta strong {
    display: block;
    margin-top: 7px;
    color: var(--pms-navy);
    font-size: 12px;
    line-height: 1;
    font-weight: 800;
    white-space: nowrap;
}

.pms-meta strong.draft {
    color: #f25a1d;
}

.pms-meta strong.progress {
    color: var(--pms-green);
}

.pms-workspace {
    height: calc(100% - 61px);
    min-height: 0;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 278px;
    gap: 22px;
}

.pms-left-column {
    min-width: 0;
    min-height: 0;
    display: grid;
    grid-template-rows: 58px minmax(0, 1fr);
    gap: 12px;
}

.pms-stepper {
    position: relative;
    min-width: 0;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    align-items: start;
    padding-top: 0;
}

.pms-stepper::before,
.pms-stepper::after {
    content: "";
    position: absolute;
    left: 5px;
    top: 16px;
    height: 2px;
    border-radius: 999px;
}

.pms-stepper::before {
    right: 5px;
    background: #dce3ed;
}

.pms-stepper::after {
    width: calc(20% - 1px);
    background: var(--pms-green);
}

.pms-step {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 9px;
    color: var(--pms-navy);
}

.pms-step-number {
    width: 28px;
    height: 28px;
    display: grid;
    place-items: center;
    border: 3px solid #ffffff;
    border-radius: 50%;
    background: #e7ebf3;
    color: var(--pms-navy);
    box-shadow: 0 0 0 1px rgba(219, 228, 239, 0.15);
    font-size: 11px;
    line-height: 1;
    font-weight: 800;
}

.pms-step.is-active .pms-step-number {
    background: var(--pms-green);
    color: #ffffff;
    box-shadow: 0 4px 10px rgba(8, 117, 54, 0.18);
}

.pms-step small {
    color: var(--pms-navy);
    font-size: 10px;
    line-height: 1;
    font-weight: 600;
    white-space: nowrap;
}

.pms-step.is-active small {
    color: var(--pms-green);
    font-weight: 700;
}

.pms-main {
    min-width: 0;
    min-height: 0;
    display: grid;
    grid-template-rows: 188px 186px 128px 164px 52px;
    gap: 12px;
    overflow: hidden;
}

.pms-section {
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    padding: 13px 15px 14px;
    border: 1px solid var(--pms-border);
    border-radius: 9px;
    background: #ffffff;
    box-shadow: 0 2px 8px rgba(9, 32, 74, 0.025);
}

.pms-section-title {
    height: 24px;
    display: flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 12px;
    color: var(--pms-green);
}

.pms-section-icon,
.pms-side-title-icon {
    flex: 0 0 auto;
    width: 25px;
    height: 25px;
    display: grid;
    place-items: center;
    border: 1px solid #d9eee2;
    border-radius: 5px;
    background: #eff9f3;
    color: var(--pms-green);
}

.pms-section-title strong {
    color: var(--pms-green);
    font-size: 13px;
    line-height: 1;
    font-weight: 800;
    white-space: nowrap;
}

.pms-section-title small {
    margin-left: -3px;
    color: #31446c;
    font-size: 9px;
    line-height: 1;
    font-weight: 500;
    white-space: nowrap;
}

.pms-grid {
    display: grid;
    min-width: 0;
}

.company-top-grid {
    grid-template-columns: 1.14fr 1.09fr 1.1fr 0.99fr;
    gap: 30px;
}

.company-bottom-grid {
    grid-template-columns: 1.08fr 1.01fr 1.39fr;
    gap: 30px;
    margin-top: 15px;
}

.pms-two-sections {
    min-width: 0;
    min-height: 0;
    display: grid;
    grid-template-columns: 0.91fr 1.04fr;
    gap: 20px;
}

.person-top-grid {
    grid-template-columns: 1.23fr 0.9fr 1.07fr;
    gap: 20px;
}

.pms-alt-contact {
    width: 43%;
    margin-top: 15px;
}

.address-top-grid {
    grid-template-columns: 1.08fr 1fr;
    gap: 24px;
}

.address-bottom-grid {
    grid-template-columns: 1.12fr 1.17fr 1.03fr 0.92fr;
    gap: 19px;
    margin-top: 15px;
}

.event-grid {
    grid-template-columns: 1.78fr 0.91fr 0.95fr 0.9fr 1.08fr 1.03fr 1.03fr;
    gap: 26px;
}

.pms-field {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 7px;
}

.pms-field-label {
    min-width: 0;
    color: var(--pms-navy);
    font-size: 10px;
    line-height: 1;
    font-weight: 600;
    white-space: nowrap;
}

.pms-field-label b {
    margin-left: 3px;
    color: #e62f28;
    font-size: 10px;
    font-weight: 800;
}

.pms-input-wrap {
    position: relative;
    min-width: 0;
    height: 33px;
}

.pms-input {
    width: 100%;
    min-width: 0;
    height: 33px;
    display: flex;
    align-items: center;
    padding: 0 11px;
    border: 1px solid #d8e1ec;
    border-radius: 5px;
    background: #ffffff;
    color: var(--pms-navy);
    box-shadow: inset 0 1px 1px rgba(6, 23, 67, 0.01);
    font-size: 9px;
    line-height: 1.2;
    font-weight: 600;
    outline: none;
}

.pms-input:focus {
    border-color: var(--pms-green);
    box-shadow: 0 0 0 3px rgba(8, 117, 54, 0.09);
}

.pms-page select.pms-input {
    appearance: none;
    cursor: pointer;
    padding-right: 28px;
}

.pms-page input.pms-input {
    text-overflow: ellipsis;
}

/* Force the same compact text size for inputs and dropdowns,
   even when global project CSS has a stronger font rule. */
.pms-page input.pms-input,
.pms-page select.pms-input {
    font-size: 10px !important;
}

.pms-select-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--pms-navy);
}

.green-input .pms-input {
    width: fit-content;
    min-width: 78px;
    border-color: #d0e9da;
    background: #f2faf5;
    color: var(--pms-green);
    font-weight: 700;
}

.pms-radio-row {
    height: 33px;
    display: flex;
    align-items: center;
    gap: 31px;
}

.pms-radio-row label {
    position: relative;
    display: flex;
    align-items: center;
    gap: 7px;
    color: var(--pms-navy);
    font-size: 10.5px;
    line-height: 1;
    font-weight: 500;
    cursor: pointer;
}

.pms-radio-row input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}

.pms-radio-row i {
    width: 13px;
    height: 13px;
    display: inline-block;
    border: 1.4px solid #8090ad;
    border-radius: 50%;
    background: #ffffff;
}

.pms-radio-row i.selected {
    border: 4px solid var(--pms-green);
}

.pms-event-section .pms-section-title {
    margin-bottom: 11px;
}

.pms-expense-section .pms-section-title {
    margin-bottom: 13px;
}

.pms-expense-grid {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 22px;
}

.pms-expense-card {
    position: relative;
    min-width: 0;
    height: 88px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 13px 8px 8px;
    border: 1px solid #dce4ed;
    border-radius: 8px;
    background: #ffffff;
    color: var(--pms-green);
    cursor: pointer;
    transition: border-color 0.18s ease, transform 0.18s ease;
}

.pms-expense-card:hover {
    border-color: #a9d4ba;
    transform: translateY(-1px);
}

.pms-expense-card.is-selected {
    border-color: #8dc7a3;
    background: #f3fbf6;
}

.pms-check {
    position: absolute;
    top: 9px;
    left: 10px;
    width: 15px;
    height: 15px;
    display: grid;
    place-items: center;
    border: 1px solid #b7c4d4;
    border-radius: 3px;
    background: #ffffff;
    color: #ffffff;
}

.pms-expense-card.is-selected .pms-check {
    border-color: var(--pms-green);
    background: var(--pms-green);
}

.pms-expense-icon {
    height: 29px;
    display: grid;
    place-items: center;
    color: var(--pms-green);
}

.pms-expense-card strong {
    color: #050f2f;
    font-size: 10px;
    line-height: 1;
    font-weight: 700;
    white-space: nowrap;
}

.pms-expense-card small {
    margin-top: -1px;
    color: #1e3974;
    font-size: 8px;
    line-height: 1;
    font-weight: 500;
}

.pms-actions {
    min-width: 0;
    height: 52px;
    display: grid;
    grid-template-columns: 141px minmax(0, 1fr) 180px;
    align-items: center;
    gap: 14px;
    padding: 7px 8px;
    border: 1px solid var(--pms-border);
    border-radius: 8px;
    background: #ffffff;
}

.pms-actions button {
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    border-radius: 5px;
    font-size: 10px;
    line-height: 1;
    font-weight: 700;
    cursor: pointer;
}

.pms-draft-button {
    border: 1px solid #d5deea;
    background: #ffffff;
    color: var(--pms-navy);
}

.pms-continue-button {
    position: relative;
    border: 0;
    background: linear-gradient(90deg, #0b7137 0%, #087536 100%);
    color: #ffffff;
    box-shadow: 0 4px 9px rgba(8, 117, 54, 0.18);
}

.pms-continue-button svg {
    position: absolute;
    right: 13px;
    margin: 0;
}

.pms-security-note {
    justify-self: center;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #26385f;
    font-size: 9px;
    line-height: 1;
    font-weight: 500;
    white-space: nowrap;
}

.pms-security-note svg {
    flex: 0 0 auto;
    color: var(--pms-green);
}

.pms-side {
    min-width: 0;
    min-height: 0;
    display: grid;
    grid-template-rows: 238px 190px 270px 70px;
    gap: 14px;
    overflow: hidden;
}

.pms-side-card,
.pms-assist {
    min-width: 0;
    overflow: hidden;
    border: 1px solid var(--pms-border);
    border-radius: 9px;
    background: #ffffff;
}

.pms-side-card {
    padding: 15px;
}

.pms-side-card h2 {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 9px;
    color: var(--pms-green);
    font-size: 13px;
    line-height: 1;
    font-weight: 800;
}

.pms-summary-card h2 {
    margin-bottom: 12px;
}

.pms-summary-row {
    height: 35px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto 14px;
    align-items: center;
    gap: 7px;
    border-bottom: 1px solid #e9eef4;
}

.pms-summary-row:last-child {
    border-bottom: 0;
}

.pms-summary-row > span {
    min-width: 0;
    color: var(--pms-navy);
    font-size: 10px;
    line-height: 1;
    font-weight: 700;
    white-space: nowrap;
}

.pms-summary-row strong {
    min-width: 0;
    max-width: 112px;
    overflow: hidden;
    color: var(--pms-green);
    font-size: 10px;
    line-height: 1;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.pms-summary-row strong.is-navy {
    color: var(--pms-navy);
    font-weight: 500;
}

.pms-summary-row svg {
    color: var(--pms-green);
    fill: var(--pms-green);
    stroke: #ffffff;
}

.pms-reimbursement-card {
    background: linear-gradient(135deg, #ffffff 0%, #f8fcfa 100%);
}

.pms-reimbursement-card h2 {
    margin-bottom: 19px;
    white-space: nowrap;
}

.pms-reimbursement-card h2 small {
    margin-left: -5px;
    color: #31446c;
    font-size: 8px;
    font-weight: 500;
}

.pms-reimbursement-card > strong {
    display: block;
    color: var(--pms-green);
    font-size: 28px;
    line-height: 1;
    font-weight: 800;
    letter-spacing: 0.3px;
}

.pms-reimbursement-card p {
    margin: 12px 0 14px;
    color: #31446c;
    font-size: 9.5px;
    line-height: 1.55;
    font-weight: 500;
}

.pms-reimbursement-card button {
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    border: 1px solid #bac8da;
    border-radius: 5px;
    background: #ffffff;
    color: var(--pms-navy);
    font-size: 10px;
    line-height: 1;
    font-weight: 700;
    cursor: pointer;
}

.pms-helpdesk-card h2 {
    margin-bottom: 13px;
    color: var(--pms-purple);
}

.pms-agent {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
}

.pms-agent-avatar {
    position: relative;
    flex: 0 0 auto;
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    overflow: hidden;
    border-radius: 50%;
    background: #eef2f7;
    color: var(--pms-navy);
    font-size: 12px;
    font-weight: 800;
}

.pms-agent-avatar img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.pms-agent strong {
    display: block;
    color: var(--pms-navy);
    font-size: 12px;
    line-height: 1;
    font-weight: 800;
}

.pms-agent span {
    display: block;
    margin-top: 7px;
    color: #31446c;
    font-size: 9px;
    line-height: 1;
    font-weight: 500;
}

.pms-helpdesk-card > a,
.pms-hours {
    width: 100%;
    min-width: 0;
    height: 31px;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 5px;
    padding: 0 9px;
    border: 1px solid #e0e7f0;
    border-radius: 5px;
    background: #ffffff;
    color: var(--pms-navy);
    text-decoration: none;
    font-size: 9.5px;
    line-height: 1;
    font-weight: 700;
}

.pms-helpdesk-card > a svg,
.pms-hours > svg {
    flex: 0 0 auto;
    color: var(--pms-purple);
}

.pms-helpdesk-card > a:nth-of-type(2) svg {
    color: #089a50;
}

.pms-hours {
    height: 42px;
    align-items: flex-start;
    padding-top: 7px;
}

.pms-hours > div {
    min-width: 0;
}

.pms-hours b,
.pms-hours span {
    display: block;
}

.pms-hours b {
    color: var(--pms-navy);
    font-size: 9px;
    line-height: 1;
    font-weight: 800;
}

.pms-hours span {
    margin-top: 5px;
    color: #31446c;
    font-size: 8px;
    line-height: 1;
    font-weight: 500;
    white-space: nowrap;
}

.pms-assist {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 14px;
    border-color: #f1d9ad;
    background: #fffaf1;
    color: #f28c00;
}

.pms-assist > svg {
    flex: 0 0 auto;
}

.pms-assist strong {
    display: block;
    color: #f07800;
    font-size: 10px;
    line-height: 1;
    font-weight: 700;
}

.pms-assist p {
    margin: 6px 0 0;
    color: #31446c;
    font-size: 9px;
    line-height: 1.35;
    font-weight: 500;
}

@media (max-height: 1100px) and (min-width: 1181px) {
    .pms-page {
        padding: 13px 20px 10px;
    }

    .pms-topbar {
        height: 52px;
    }

    .pms-title {
        padding-top: 0;
    }

    .pms-title h1 {
        font-size: 21px;
    }

    .pms-title p {
        margin-top: 5px;
        font-size: 12px;
    }

    .pms-meta {
        grid-template-columns: 174px 92px 118px;
        gap: 10px;
    }

    .pms-meta > div {
        height: 49px;
        padding: 8px 13px 7px;
    }

    .pms-meta strong {
        margin-top: 6px;
    }

    .pms-workspace {
        height: calc(100% - 52px);
        gap: 16px;
    }

    .pms-left-column {
        grid-template-rows: 50px minmax(0, 1fr);
        gap: 8px;
    }

    .pms-stepper::before,
    .pms-stepper::after {
        top: 14px;
    }

    .pms-step {
        gap: 6px;
    }

    .pms-step-number {
        width: 26px;
        height: 26px;
    }

    .pms-step small {
        font-size: 9px;
    }

    .pms-main {
        grid-template-rows: 164px 160px 108px 132px 46px;
        gap: 8px;
    }

    .pms-section {
        padding: 9px 13px 10px;
    }

    .pms-section-title {
        height: 22px;
        margin-bottom: 8px;
    }

    .pms-section-icon,
    .pms-side-title-icon {
        width: 23px;
        height: 23px;
    }

    .pms-section-title strong {
        font-size: 12px;
    }

    .company-top-grid,
    .company-bottom-grid,
    .event-grid {
        gap: 18px;
    }

    .company-bottom-grid,
    .address-bottom-grid,
    .pms-alt-contact {
        margin-top: 9px;
    }

    .person-top-grid {
        gap: 14px;
    }

    .address-top-grid {
        gap: 18px;
    }

    .address-bottom-grid {
        gap: 14px;
    }

    .pms-field {
        gap: 5px;
    }

    .pms-input,
    .pms-radio-row {
        height: 29px;
    }

    .pms-expense-section .pms-section-title {
        margin-bottom: 8px;
    }

    .pms-expense-grid {
        gap: 14px;
    }

    .pms-expense-card {
        height: 78px;
        gap: 4px;
        padding-top: 10px;
    }

    .pms-expense-icon {
        height: 25px;
    }

    .pms-check {
        top: 7px;
        left: 8px;
        width: 14px;
        height: 14px;
    }

    .pms-actions {
        height: 46px;
        padding: 5px 7px;
    }

    .pms-actions button {
        height: 32px;
    }

    .pms-side {
        grid-template-rows: 210px 168px 232px 60px;
        gap: 8px;
    }

    .pms-side-card {
        padding: 11px 13px;
    }

    .pms-summary-card h2 {
        margin-bottom: 7px;
    }

    .pms-summary-row {
        height: 30px;
    }

    .pms-reimbursement-card h2 {
        margin-bottom: 12px;
    }

    .pms-reimbursement-card > strong {
        font-size: 25px;
    }

    .pms-reimbursement-card p {
        margin: 8px 0 10px;
        line-height: 1.35;
    }

    .pms-reimbursement-card button {
        height: 31px;
    }

    .pms-helpdesk-card h2 {
        margin-bottom: 8px;
    }

    .pms-agent {
        margin-bottom: 6px;
    }

    .pms-agent-avatar {
        width: 42px;
        height: 42px;
    }

    .pms-helpdesk-card > a,
    .pms-hours {
        height: 27px;
        margin-top: 4px;
    }

    .pms-hours {
        height: 36px;
        padding-top: 5px;
    }

    .pms-assist {
        padding: 8px 12px;
    }
}

@media (max-width: 1365px) and (min-width: 1181px) {
    .pms-page {
        padding-left: 18px;
        padding-right: 18px;
    }

    .pms-workspace {
        grid-template-columns: minmax(0, 1fr) 260px;
        gap: 16px;
    }

    .company-top-grid,
    .company-bottom-grid,
    .event-grid {
        gap: 16px;
    }

    .pms-expense-grid {
        gap: 12px;
    }

    .pms-field-label,
    .pms-input,
    .pms-summary-row > span,
    .pms-summary-row strong {
        font-size: 9px;
    }
}

@media (max-width: 1180px) {
    .pms-page {
        height: auto;
        min-height: calc(100dvh - 58px);
        overflow: auto;
        padding: 18px;
    }

    .pms-topbar {
        height: auto;
        margin-bottom: 18px;
    }

    .pms-workspace,
    .pms-left-column,
    .pms-main,
    .pms-side {
        height: auto;
        overflow: visible;
    }

    .pms-workspace {
        grid-template-columns: 1fr;
    }

    .pms-left-column {
        grid-template-rows: auto auto;
    }

    .pms-stepper {
        height: 60px;
    }

    .pms-main {
        grid-template-rows: auto;
    }

    .pms-section,
    .pms-actions {
        min-height: auto;
    }

    .pms-side {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-template-rows: auto;
    }
}

@media (max-width: 820px) {
    .pms-topbar,
    .pms-two-sections {
        display: block;
    }

    .pms-meta {
        grid-template-columns: 1fr;
        margin-top: 16px;
    }

    .company-top-grid,
    .company-bottom-grid,
    .person-top-grid,
    .address-top-grid,
    .address-bottom-grid,
    .event-grid,
    .pms-expense-grid,
    .pms-actions,
    .pms-side {
        grid-template-columns: 1fr;
    }

    .pms-two-sections > .pms-section + .pms-section {
        margin-top: 12px;
    }

    .pms-alt-contact {
        width: 100%;
    }

    .pms-stepper {
        overflow-x: auto;
        grid-template-columns: repeat(5, 125px);
    }

    .pms-actions {
        height: auto;
    }

    .pms-security-note {
        white-space: normal;
        text-align: center;
    }
}
`;
