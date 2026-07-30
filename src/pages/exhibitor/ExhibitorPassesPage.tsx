import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    Users, UserCheck, Car, Wrench, ShieldCheck,
    ArrowRight, Check, Sparkles, FileText, Phone, Gift,
    X, Building2, User, Briefcase, Mail, Phone as PhoneIcon, UserCircle,
    CheckCircle2, ChevronRight, Hash
} from "lucide-react";
import { useExhibitorCtx } from "@/context/ExhibitorContext";
import { API_URL } from "@/lib/api";
import passesImg from "@/assets/passes1.webp";
import thaliImg from "@/assets/thali.webp";
import bottleImg from "@/assets/bottle.webp";
import howitworksImg from "@/assets/howitworks.webp";
import notepadImg from "@/assets/notepad.webp";
import shoppingImg from "@/assets/shopping.webp";
import Swal from "sweetalert2";
import DelegateRegistrationModal from "./DelegateRegistrationModal";
import { logActivity } from "@/utils/activityLogger";

const isVehiclePassId = (id?: string) => id === 'vehicle';

export default function ExhibitorPassesPage() {
    const { data } = useExhibitorCtx();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDelegateModalOpen, setIsDelegateModalOpen] = useState(false);
    const [selectedPass, setSelectedPass] = useState<any>(null);
    const [passConfigs, setPassConfigs] = useState<any[]>([]);
    const [passRequests, setPassRequests] = useState<any[]>([]);

    const [personnel, setPersonnel] = useState<any[]>([]);
    const [vehicles, setVehicles] = useState<any[]>([]);
    const quantity = isVehiclePassId(selectedPass?.id) ? vehicles.length : personnel.length;
    const [isSubmitting, setIsSubmitting] = useState(false);

    // New states for payment review
    const [isReviewing, setIsReviewing] = useState(false);
    const [reviewData, setReviewData] = useState<any>(null);

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const getTeamAllocation = (pass: any) => {
        const teamMembers = Array.isArray(data?.teamMembers) ? data.teamMembers : [];
        const previousRequests = passRequests.filter(
            request => request.passType === pass.id && request.status !== 'rejected'
        );
        const previousEntries = previousRequests.flatMap(request => [
            ...(request.personnel || []),
            ...(request.vehicles || [])
        ]);
        const allocatedIds = new Set(
            previousEntries.map(entry => String(entry.teamMemberId || '')).filter(Boolean)
        );
        const allocatedContacts = new Set(
            previousEntries
                .flatMap(entry => [entry.email, entry.phone])
                .filter(Boolean)
                .map(value => String(value).toLowerCase())
        );

        const isAllocated = (member: any) =>
            Boolean(member?.passes?.[pass.id])
            || allocatedIds.has(String(member._id))
            || allocatedContacts.has(String(member.email || '').toLowerCase())
            || allocatedContacts.has(String(member.mobile || '').toLowerCase());

        return {
            available: teamMembers.filter((member: any) => !isAllocated(member)),
            allocated: teamMembers.filter(isAllocated)
        };
    };

    const createPersonnelEntry = (member?: any) => ({
        teamMemberId: member?._id || undefined,
        name: member?.name || '',
        designation: member?.designation || member?.roleAtExhibition || '',
        email: member?.email || '',
        phone: member?.mobile || '',
        photoUrl: member?.photoUrl || member?.photo || '',
        gender: member?.gender || 'male',
        aadhaarNumber: '',
        isTeamMember: Boolean(member)
    });

    const createVehicleEntry = (member?: any, vehicleType: '2-wheeler' | '4-wheeler' = '4-wheeler') => ({
        teamMemberId: member?._id || undefined,
        vehicleType,
        vehicleNumber: '',
        name: member?.name || '',
        email: member?.email || '',
        phone: member?.mobile || '',
        photoUrl: member?.photoUrl || member?.photo || '',
        isTeamMember: Boolean(member)
    });

    // Lunch/Water are simple daily quantity items - always billed to the exhibitor's
    // registered primary contact (contact1), no per-item attendee form needed.
    const createSimpleEntry = () => {
        const contact = data?.contact1 || {};
        const name = [contact.firstName, contact.lastName].filter(Boolean).join(' ') || data?.companyName || '';
        return {
            teamMemberId: undefined,
            name,
            designation: contact.designation || '',
            email: contact.email || '',
            phone: contact.whatsapp || contact.mobile || '',
            gender: 'male',
            aadhaarNumber: '',
            isTeamMember: false
        };
    };

    const handleOpenModal = (pass: any) => {
        const { available } = getTeamAllocation(pass);
        setSelectedPass(pass);
        if (isVehiclePassId(pass.id)) {
            setVehicles(available[0] ? [createVehicleEntry(available[0])] : []);
            setPersonnel([]);
        } else if (pass.simpleFlow) {
            setPersonnel([createSimpleEntry()]);
            setVehicles([]);
        } else {
            setPersonnel(available[0] ? [createPersonnelEntry(available[0])] : []);
            setVehicles([]);
        }
        setIsReviewing(false);
        setReviewData(null);
        setIsModalOpen(true);
    };

    const handleSimpleQuantityChange = (newQty: number) => {
        const maxAllowed = selectedPass?.maxPerRequest || 10;
        if (newQty < 1 || newQty > maxAllowed) return;
        const sharedContact = personnel[0];
        setPersonnel(Array.from({ length: newQty }, () => (sharedContact ? { ...sharedContact } : createSimpleEntry())));
    };

    // Team members are added/removed via checkbox; manual entries only unlock once
    // all currently available team members have been checked off.
    const toggleTeamMember = (member: any) => {
        const isVehiclePass = isVehiclePassId(selectedPass?.id);
        const list = isVehiclePass ? vehicles : personnel;
        const existingIndex = list.findIndex((entry: any) => entry.teamMemberId === member._id);

        if (existingIndex >= 0) {
            const updated = list.filter((_: any, i: number) => i !== existingIndex);
            if (isVehiclePass) setVehicles(updated); else setPersonnel(updated);
            return;
        }

        const maxAllowed = selectedPass?.maxPerRequest || 10;
        if (list.length >= maxAllowed) {
            Swal.fire({ title: 'Limit reached', text: `Max ${maxAllowed} passes allowed per request.`, icon: 'warning', confirmButtonColor: '#15803d' });
            return;
        }

        const newEntry = isVehiclePass ? createVehicleEntry(member) : createPersonnelEntry(member);
        const teamCount = list.filter((entry: any) => entry.isTeamMember).length;
        const updated = [...list.slice(0, teamCount), newEntry, ...list.slice(teamCount)];
        if (isVehiclePass) setVehicles(updated); else setPersonnel(updated);
    };

    const addManualEntry = () => {
        const isVehiclePass = isVehiclePassId(selectedPass?.id);
        const list = isVehiclePass ? vehicles : personnel;
        const maxAllowed = selectedPass?.maxPerRequest || 10;
        if (list.length >= maxAllowed) {
            Swal.fire({ title: 'Limit reached', text: `Max ${maxAllowed} passes allowed per request.`, icon: 'warning', confirmButtonColor: '#15803d' });
            return;
        }
        const newEntry = isVehiclePass ? createVehicleEntry() : createPersonnelEntry();
        if (isVehiclePass) setVehicles([...vehicles, newEntry]); else setPersonnel([...personnel, newEntry]);
    };

    const removeEntry = (index: number) => {
        const isVehiclePass = isVehiclePassId(selectedPass?.id);
        if (isVehiclePass) setVehicles(vehicles.filter((_: any, i: number) => i !== index));
        else setPersonnel(personnel.filter((_: any, i: number) => i !== index));
    };

    const updatePersonnel = (index: number, field: string, value: string) => {
        const updated = [...personnel];
        updated[index] = { ...updated[index], [field]: value };
        setPersonnel(updated);
    };

    const updateVehicle = (index: number, field: string, value: string) => {
        const updated = [...vehicles];
        updated[index] = { ...updated[index], [field]: value };
        setVehicles(updated);
    };

    const fetchPassData = async () => {
        try {
            const token = localStorage.getItem("exhibitorToken");
            const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
            // /my-active returns complimentary quotas computed from this exhibitor's actual
            // stall area; fall back to the flat /active config if not authenticated yet.
            const [configRes, requestRes] = await Promise.all([
                token
                    ? fetch(`${API_URL}/exhibitor-pass-config/my-active`, { headers })
                    : fetch(`${API_URL}/exhibitor-pass-config/active`),
                data?._id
                    ? fetch(`${API_URL}/exhibitor-pass-requests/exhibitor/${data._id}`, { headers })
                    : Promise.resolve(null),
            ]);

            const configResult = await configRes.json();
            if (configResult.success && Array.isArray(configResult.data)) {
                setPassConfigs(configResult.data);
            }

            if (requestRes) {
                const requestResult = await requestRes.json();
                if (requestResult.success && Array.isArray(requestResult.data)) {
                    setPassRequests(requestResult.data);
                }
            }
        } catch (error) {
            console.error("Failed to load pass configuration", error);
        }
    };

    useEffect(() => {
        fetchPassData();
    }, [data?._id]);

    useEffect(() => {
        if (!isModalOpen && !isDelegateModalOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isModalOpen, isDelegateModalOpen]);

    const handleRequestPassSubmit = async (paymentDetails: any = null) => {
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem("exhibitorToken");
            const payload = {
                passType: selectedPass.id,
                quantity,
                vehicles: isVehiclePassId(selectedPass.id) ? vehicles : undefined,
                personnel: !isVehiclePassId(selectedPass.id) ? personnel : undefined,
                paymentDetails
            };

            const res = await fetch(`${API_URL}/exhibitor-auth/pass-request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            const result = await res.json();
            if (result.success || res.ok) {
                Swal.fire({
                    title: 'Success!',
                    text: result.message || "Pass request submitted successfully.",
                    icon: 'success',
                    confirmButtonColor: '#15803d',
                    customClass: { popup: 'rounded-2xl', confirmButton: 'rounded-xl font-bold py-2 px-6' }
                });
                logActivity('Passes & Hospitality', `Requested ${quantity} ${selectedPass.title}`);
                setIsModalOpen(false);
                fetchPassData();
            } else {
                Swal.fire({
                    title: 'Oops...',
                    text: result.message || "Failed to submit pass request.",
                    icon: 'error',
                    confirmButtonColor: '#ef4444',
                    customClass: { popup: 'rounded-2xl', confirmButton: 'rounded-xl font-bold py-2 px-6' }
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: "Failed to submit pass request.",
                icon: 'error',
                confirmButtonColor: '#ef4444',
                customClass: { popup: 'rounded-2xl', confirmButton: 'rounded-xl font-bold py-2 px-6' }
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleProceedToReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (quantity < 1) {
            Swal.fire({ title: 'Select at least one', text: 'Check a team member or add a manual entry to proceed.', icon: 'warning', confirmButtonColor: '#15803d' });
            return;
        }
        if (selectedPass?.id === 'service') {
            const invalidPerson = personnel.find(person => String(person.aadhaarNumber || '').replace(/\D/g, '').length !== 12);
            if (invalidPerson) {
                Swal.fire({
                    title: 'Valid Aadhaar required',
                    text: 'Please enter a valid 12-digit Aadhaar number for every service pass holder.',
                    icon: 'warning',
                    width: 390,
                    confirmButtonColor: '#6b21a8'
                });
                return;
            }
        }

        const complimentaryRemaining = Number(selectedPass?.complimentaryRemaining || 0);
        if (quantity <= complimentaryRemaining) {
            await handleRequestPassSubmit();
            return;
        }

        setIsSubmitting(true);
        try {
            const token = localStorage.getItem("exhibitorToken");
            const payload = {
                passType: selectedPass.id,
                quantity
            };

            const res = await fetch(`${API_URL}/exhibitor-auth/pass-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            const result = await res.json();
            if (result.success) {
                if (result.isFree) {
                    await handleRequestPassSubmit();
                } else {
                    setReviewData(result);
                    setIsReviewing(true);
                }
            } else {
                Swal.fire({ title: 'Error', text: result.message || "Failed to calculate pricing.", icon: 'error', confirmButtonColor: '#ef4444' });
            }
        } catch (error) {
            Swal.fire({ title: 'Error', text: "Failed to communicate with server.", icon: 'error', confirmButtonColor: '#ef4444' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleProceedToPay = async () => {
        const isLoaded = await loadRazorpay();
        if (!isLoaded) {
            Swal.fire({ title: 'Error', text: 'Razorpay SDK failed to load. Are you online?', icon: 'error' });
            return;
        }

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_rYjE4Lms78Wn0s',
            amount: reviewData.order.amount,
            currency: 'INR',
            name: '9th IHWE 2026',
            description: `Payment for ${reviewData.paidQuantity} Extra ${selectedPass.title}`,
            order_id: reviewData.order.id,
            handler: async function (response: any) {
                await handleRequestPassSubmit({
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature
                });
            },
            prefill: {
                name: data?.companyName || 'Exhibitor',
                email: data?.email || '',
                contact: data?.mobile || ''
            },
            theme: { color: '#15803d' }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', function (response: any) {
            Swal.fire({ title: 'Payment Failed', text: response.error.description, icon: 'error', confirmButtonColor: '#ef4444' });
        });
        rzp.open();
    };

    const defaultPasses = [
        {
            id: "exhibitor",
            title: "Exhibitor Pass",
            subtitle: "For Your Team Members",
            icon: UserCheck,
            complimentary: 2,
            used: 0,
            remaining: 2,
            price: 150,
            color: "orange",
            themeClasses: {
                bg: "bg-[#fffaf5]",
                border: "border-orange-100 hover:border-orange-300",
                text: "text-[#ea580c]",
                iconBg: "bg-gradient-to-tr from-[#c2410c] to-[#f97316]",
                badgeBg: "bg-orange-50 text-orange-700 border-orange-100",
                btnBg: "bg-[#ea580c] hover:bg-[#c2410c] text-white shadow-orange-900/10",
                statsBorder: "border-orange-100/60"
            }
        },
        {
            id: "vehicle",
            title: "Vehicle Pass",
            subtitle: "For Exhibitor Vehicles",
            icon: Car,
            complimentary: 2,
            used: 0,
            remaining: 2,
            price: 500,
            color: "green",
            themeClasses: {
                bg: "bg-[#f5fbf7]",
                border: "border-emerald-100 hover:border-emerald-300",
                text: "text-[#15803d]",
                iconBg: "bg-gradient-to-tr from-[#047857] to-[#10b981]",
                badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-100",
                btnBg: "bg-[#15803d] hover:bg-[#0f6b30] text-white shadow-emerald-900/10",
                statsBorder: "border-emerald-100/60"
            }
        },
        {
            id: "service",
            title: "Service Pass",
            subtitle: "For Staff, Workers & Contractors",
            icon: Wrench,
            complimentary: 4,
            used: 0,
            remaining: 4,
            price: 150,
            color: "purple",
            themeClasses: {
                bg: "bg-[#faf5ff]",
                border: "border-purple-100 hover:border-purple-300",
                text: "text-[#6b21a8]",
                iconBg: "bg-gradient-to-tr from-[#7e22ce] to-[#a855f7]",
                badgeBg: "bg-purple-50 text-purple-700 border-purple-100",
                btnBg: "bg-[#6b21a8] hover:bg-[#581c87] text-white shadow-purple-900/10",
                statsBorder: "border-purple-100/60"
            }
        },
        {
            id: "visitor",
            title: "Visitor Pass",
            subtitle: "For Invited Visitors",
            icon: Users,
            complimentary: 10,
            used: 2,
            remaining: 8,
            price: 200,
            color: "blue",
            themeClasses: {
                bg: "bg-[#f0f7ff]",
                border: "border-blue-100 hover:border-blue-300",
                text: "text-[#1a3a7c]",
                iconBg: "bg-gradient-to-tr from-[#1e40af] to-[#3b82f6]",
                badgeBg: "bg-blue-50 text-blue-700 border-blue-100",
                btnBg: "bg-[#1a3a7c] hover:bg-[#112754] text-white shadow-blue-900/10",
                statsBorder: "border-blue-100/60"
            }
        },
        {
            id: "delegate",
            title: "Delegate Pass",
            subtitle: "For Conference Access",
            icon: Sparkles,
            complimentary: 0,
            used: data?.entitlements?.delegatePassUsed || 0,
            remaining: 0,
            price: 5000,
            color: "pink",
            themeClasses: {
                bg: "bg-[#fdf4ff]",
                border: "border-pink-100 hover:border-pink-300",
                text: "text-[#be185d]",
                iconBg: "bg-gradient-to-tr from-[#be185d] to-[#f472b6]",
                badgeBg: "bg-pink-50 text-pink-700 border-pink-100",
                btnBg: "bg-[#be185d] hover:bg-[#9d174d] text-white shadow-pink-900/10",
                statsBorder: "border-pink-100/60"
            }
        }
    ];

    const countsByType = passRequests.reduce<Record<string, { pending: number, approved: number, rejected: number, total: number }>>((acc, request) => {
        const key = request.passType;
        acc[key] = acc[key] || { pending: 0, approved: 0, rejected: 0, total: 0 };
        acc[key][request.status as keyof typeof acc[string]] = (acc[key][request.status as keyof typeof acc[string]] || 0) + Number(request.quantity || 0);
        acc[key].total += Number(request.quantity || 0);
        return acc;
    }, {});

    const passes = defaultPasses
        .filter((pass) => {
            const config = passConfigs.find((item) => item.passType === pass.id);
            return config?.isActive !== false;
        })
        .map((pass) => {
        if (pass.id === 'delegate') {
            const config = passConfigs.find((item) => item.passType === pass.id);
            const complimentary = Number(config?.complimentaryQuota ?? data?.entitlements?.delegatePassQuota ?? pass.complimentary);
            const totalQuota = Number(config?.totalQuota ?? complimentary);
            const used = Number(data?.entitlements?.delegatePassUsed || 0);
            const complimentaryRemaining = Math.max(complimentary - used, 0);
            return {
                ...pass,
                title: config?.title || pass.title,
                subtitle: config?.subtitle || pass.subtitle,
                complimentary,
                used,
                remaining: Math.max(totalQuota - used, 0),
                complimentaryRemaining,
                totalQuota,
                price: null,
                priceTwoWheeler: 0,
                priceFourWheeler: 0,
                complimentaryTwoWheeler: 0,
                complimentaryFourWheeler: 0,
                remainingTwoWheeler: 0,
                remainingFourWheeler: 0,
                maxPerRequest: 1,
                validityDays: Number(config?.validityDays || 0)
            };
        }

        const config = passConfigs.find((item) => item.passType === pass.id);

        if (pass.id === 'vehicle') {
            // The Vehicle Pass has independent free quota + price per vehicle type —
            // count prior usage by type from pass-request history to know what's left.
            const priceTwoWheeler = Number(config?.vehicleTypeConfig?.twoWheeler?.price || 0);
            const priceFourWheeler = Number(config?.vehicleTypeConfig?.fourWheeler?.price || 0);
            const complimentaryTwoWheeler = Number(config?.complimentaryQuotaTwoWheeler ?? config?.vehicleTypeConfig?.twoWheeler?.complimentaryQuota ?? 0);
            const complimentaryFourWheeler = Number(config?.complimentaryQuotaFourWheeler ?? config?.vehicleTypeConfig?.fourWheeler?.complimentaryQuota ?? 0);

            let usedTwoWheeler = 0, usedFourWheeler = 0;
            passRequests
                .filter(r => r.passType === 'vehicle' && r.status !== 'rejected')
                .forEach(r => (r.vehicles || []).forEach((v: any) => {
                    if (v.vehicleType === '2-wheeler') usedTwoWheeler += 1; else usedFourWheeler += 1;
                }));

            const remainingTwoWheeler = Math.max(complimentaryTwoWheeler - usedTwoWheeler, 0);
            const remainingFourWheeler = Math.max(complimentaryFourWheeler - usedFourWheeler, 0);
            const totalQuota = Number(config?.totalQuota ?? 10);
            const totalRequested = countsByType[pass.id]?.total ?? 0;

            return {
                ...pass,
                title: config?.title || pass.title,
                subtitle: config?.subtitle || pass.subtitle,
                complimentary: complimentaryTwoWheeler + complimentaryFourWheeler,
                used: countsByType[pass.id]?.approved ?? 0,
                remaining: Math.max(totalQuota - totalRequested, 0),
                complimentaryRemaining: remainingTwoWheeler + remainingFourWheeler,
                totalQuota,
                price: null,
                priceTwoWheeler,
                priceFourWheeler,
                complimentaryTwoWheeler,
                complimentaryFourWheeler,
                remainingTwoWheeler,
                remainingFourWheeler,
                maxPerRequest: Number(config?.maxPerRequest ?? 10),
                validityDays: Number(config?.validityDays || 0)
            };
        }

        const complimentary = Number(config?.complimentaryQuota ?? pass.complimentary);
        const totalQuota = Number(config?.totalQuota ?? 10);
        const used = countsByType[pass.id]?.approved ?? 0;
        const totalRequested = countsByType[pass.id]?.total ?? 0;
        const complimentaryRemaining = Math.max(complimentary - totalRequested, 0);
        return {
            ...pass,
            title: config?.title || pass.title,
            subtitle: config?.subtitle || pass.subtitle,
            complimentary,
            used,
            remaining: Math.max(totalQuota - totalRequested, 0),
            complimentaryRemaining,
            totalQuota,
            price: Number(config?.price ?? pass.price),
            priceTwoWheeler: 0,
            priceFourWheeler: 0,
            complimentaryTwoWheeler: 0,
            complimentaryFourWheeler: 0,
            remainingTwoWheeler: 0,
            remainingFourWheeler: 0,
            maxPerRequest: Number(config?.maxPerRequest ?? 10),
            validityDays: Number(config?.validityDays || 0)
        };
    });

    const notes = [
        "Use complimentary quota first.",
        "Extra passes, lunch and water bottles can be purchased online.",
        "All passes are non-transferable.",
        "Valid only for the event duration.",
        "Lunch & Water Bottle entitlement for Exhibitor Team (2 persons per day)."
    ];

    // The Vehicle Pass prices/free-quota independently per vehicle type, so its free/paid
    // split has to be computed from the actual 2-wheeler vs car mix currently in the form —
    // a flat quantity vs one price doesn't apply here.
    const isVehicleSelected = isVehiclePassId(selectedPass?.id);
    const selectedTwoWheelerCount = isVehicleSelected ? vehicles.filter(v => v.vehicleType === '2-wheeler').length : 0;
    const selectedFourWheelerCount = isVehicleSelected ? vehicles.length - selectedTwoWheelerCount : 0;
    const selectedFreeTwoWheeler = isVehicleSelected ? Math.min(selectedTwoWheelerCount, Number(selectedPass?.remainingTwoWheeler || 0)) : 0;
    const selectedFreeFourWheeler = isVehicleSelected ? Math.min(selectedFourWheelerCount, Number(selectedPass?.remainingFourWheeler || 0)) : 0;

    const selectedComplimentaryRemaining = isVehicleSelected
        ? Number(selectedPass?.remainingTwoWheeler || 0) + Number(selectedPass?.remainingFourWheeler || 0)
        : Number(selectedPass?.complimentaryRemaining || 0);
    const selectedFreeQuantity = isVehicleSelected
        ? selectedFreeTwoWheeler + selectedFreeFourWheeler
        : Math.min(quantity, selectedComplimentaryRemaining);
    const selectedPaidQuantity = isVehicleSelected
        ? (selectedTwoWheelerCount - selectedFreeTwoWheeler) + (selectedFourWheelerCount - selectedFreeFourWheeler)
        : Math.max(quantity - selectedComplimentaryRemaining, 0);
    const selectedHasSelection = quantity >= 1;
    // Only "fully complimentary" once something is actually selected — 0 selected should
    // never read as "Free", it should read as "nothing chosen yet".
    const selectedIsFullyComplimentary = selectedHasSelection && selectedPaidQuantity === 0;
    const selectedStatusBadge = !selectedHasSelection
        ? { text: 'Nothing selected', cls: 'bg-slate-100 text-slate-500 border-slate-200' }
        : selectedIsFullyComplimentary
        ? { text: 'Complimentary', cls: 'bg-emerald-50 text-emerald-700 border-emerald-100' }
        : { text: 'Extra Payment', cls: 'bg-amber-50 text-amber-700 border-amber-100' };
    const selectedEstimatedPayable = isVehicleSelected
        ? (selectedTwoWheelerCount - selectedFreeTwoWheeler) * Number(selectedPass?.priceTwoWheeler || 0)
            + (selectedFourWheelerCount - selectedFreeFourWheeler) * Number(selectedPass?.priceFourWheeler || 0)
        : selectedPaidQuantity * Number(selectedPass?.price || 0);

    return (
        <motion.div
            key="exhibitor-passes-v1"
            className="px-4 md:px-8 pt-5 pb-8 bg-[#f8fafc]/50 min-h-screen"
            style={{ fontFamily: '"Inter", sans-serif' }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
        >
            {/* ─── TOP HEADER SECTION ─── */}
            <div className="flex flex-col xl:flex-row items-stretch justify-between gap-1.5 mb-1">
                {/* Left Description & Brand Illustration replaced entirely by passes1.webp */}
                <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex items-center justify-center p-0 xl:h-[220px]">
                    <img loading="lazy" decoding="async" src={passesImg} alt="Exhibitor Passes Banner" className="w-full h-full object-contain object-center" />
                </div>

                {/* Right: Complimentary Quota Summary */}
                <div className="w-full xl:w-[480px] bg-[#f7fbf8] rounded-2xl border border-[#e2edd9] shadow-sm flex flex-col justify-between shrink-0 mt-3 xl:mt-0 p-4 xl:h-[220px]">
                    {/* Card Title */}
                    <div className="flex items-center gap-2 mb-1.5 px-1">
                        <Gift size={18} className="text-[#15803d] shrink-0" strokeWidth={2.5} />
                        <h3 className="text-[13px] font-black text-[#11381e] tracking-tight">
                            Complimentary Quota <span className="text-slate-500 font-bold text-xs leading-none">(Use First)</span>
                        </h3>
                    </div>

                    {/* Inner White Card Grid with Dividers */}
                    <div className="bg-white rounded-xl border border-[#e2edd9] py-4 grid grid-cols-2 gap-y-4 sm:gap-y-0 sm:grid-cols-5 sm:divide-x sm:divide-slate-300 shadow-sm mb-1.5">
                        {passes.map((pass) => {
                            const Icon = pass.icon;
                            return (
                                <div key={pass.id} className="flex flex-col items-center justify-center text-center px-1">
                                    <Icon size={28} className={`${pass.themeClasses.text} shrink-0`} />
                                    <span className={`text-[22px] font-black ${pass.themeClasses.text} tracking-tight mt-1.5 leading-none`}>{pass.complimentary}</span>
                                    <span className={`text-[9.5px] font-extrabold ${pass.themeClasses.text} mt-1.5 uppercase tracking-wide`}>{pass.title}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Bottom Info text */}
                    <p className="text-[10px] text-slate-800 font-extrabold tracking-tight text-center leading-normal mb-0.5">
                        Extra passes can be purchased online after using complimentary quota.
                    </p>
                </div>
            </div>

            {/* ─── MAIN PASS CARDS ─── */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-1 mb-1">
                {passes.map((pass) => {
                    const Icon = pass.icon;
                    return (
                        <div
                            key={pass.id}
                            className={`rounded-xl border ${pass.themeClasses.bg} p-3 pt-3 pb-2.5 flex flex-col justify-between transition-all duration-300 hover:shadow-md ${pass.themeClasses.border}`}
                        >
                            <div>
                                {/* Icon + Text + Badge */}
                                <div className="flex items-start justify-between gap-1.5 mb-2.5">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <div className={`w-9 h-9 rounded-full ${pass.themeClasses.iconBg} flex items-center justify-center text-white shadow-sm flex-shrink-0`}>
                                            <Icon size={17} />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-[13px] font-black text-slate-800 tracking-tight leading-tight">
                                                {pass.title}
                                            </h3>
                                            <p className="text-[10px] text-slate-500 font-bold mt-0.5 truncate">
                                                {pass.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`inline-flex px-1.5 py-0.5 rounded text-[8.5px] font-extrabold border shrink-0 mt-0.5 ${pass.themeClasses.badgeBg}`}>
                                        {pass.id === 'vehicle'
                                            ? `2W ${pass.complimentaryTwoWheeler} · Car ${pass.complimentaryFourWheeler} Free`
                                            : `${pass.complimentary} Complimentary`}
                                    </span>
                                </div>

                                {!!pass.validityDays && (
                                    <p className="mb-2 text-[9px] font-extrabold text-slate-400 uppercase tracking-wide">
                                        ⏱ Valid for {pass.validityDays} Day{pass.validityDays > 1 ? 's' : ''} only
                                    </p>
                                )}

                                {/* Statistics Table - Mockup style without outer border */}
                                {pass.id === 'vehicle' ? (
                                    <div className="grid grid-cols-2 divide-x divide-slate-200/80 mb-2 text-center">
                                        <div className="flex flex-col items-center justify-center px-1">
                                            <span className="text-[9px] font-extrabold text-slate-500 leading-none">2-Wheeler</span>
                                            <span className="text-[10px] font-black text-slate-800 mt-1">{pass.remainingTwoWheeler} free · ₹{pass.priceTwoWheeler}/extra</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center px-1">
                                            <span className="text-[9px] font-extrabold text-slate-500 leading-none">Car / 4-Wheeler</span>
                                            <span className="text-[10px] font-black text-slate-800 mt-1">{pass.remainingFourWheeler} free · ₹{pass.priceFourWheeler}/extra</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-3 divide-x divide-slate-200/80 mb-2 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <span className="text-[9px] font-extrabold text-slate-500 leading-none">Used</span>
                                            <span className="text-[13px] font-black text-slate-800 mt-1">{pass.used}</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center">
                                            <span className="text-[9px] font-extrabold text-slate-500 leading-none">Remaining</span>
                                            <span className="text-[13px] font-black text-slate-800 mt-1">{pass.remaining}</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center">
                                            <span className="text-[9px] font-extrabold text-slate-500 leading-none">{pass.id === 'delegate' ? 'Total Passes' : 'Extra Price'}</span>
                                            <span className="text-[9.5px] font-black text-slate-800 mt-1">
                                                {pass.id === 'delegate' ? pass.totalQuota : `₹${pass.price} / Pass`}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Button */}
                            <button
                                onClick={() => {
                                    if (pass.id === 'delegate') {
                                        setIsDelegateModalOpen(true);
                                    } else {
                                        handleOpenModal(pass);
                                    }
                                }}
                                className={`w-full h-7 px-2.5 rounded-md text-[10px] font-extrabold transition-all duration-200 flex items-center justify-between shadow-sm hover:shadow-md ${pass.themeClasses.btnBg}`}
                            >
                                <span className="flex-1 text-center">
                                    {(countsByType[pass.id]?.pending || 0) > 0 ? `${countsByType[pass.id].pending} Pending` : (pass.id === 'delegate' ? 'Register Delegate' : 'Request / Purchase Extra')}
                                </span>
                                <ArrowRight size={11} className="shrink-0" />
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* ─── BOTTOM SECTION: 3 COLUMNS ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mb-1">
                {/* Column 1: Exhibitor Entitlement */}
                <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-50">
                            <Gift size={16} className="text-[#15803d]" strokeWidth={2.5} />
                            <h3 className="font-extrabold text-[12px] text-[#11381e]">
                                Exhibitor Entitlement <span className="text-slate-500 font-bold text-[9.5px] lowercase tracking-normal">(daily for all 3 days)</span>
                            </h3>
                        </div>

                        {/* Entitlement Items */}
                        <div className="grid grid-cols-2 gap-1 mb-2">
                            {/* Lunch */}
                            <div className="bg-[#fbfcfa] border border-[#e2edd9] rounded-xl p-2 flex flex-col justify-between hover:shadow-md cursor-pointer transition-all" onClick={() => {
                                const config = passConfigs.find(c => c.passType === 'lunch');
                                const comp = Number(config?.complimentaryQuota ?? 2);
                                const req = countsByType['lunch']?.total || 0;
                                const complimentaryRemaining = Math.max(comp - req, 0);
                                handleOpenModal({
                                    id: 'lunch',
                                    title: 'Packed Thali Lunch',
                                    subtitle: 'Daily Entitlement',
                                    icon: Gift,
                                    price: Number(config?.price || 250),
                                    complimentary: comp,
                                    remaining: complimentaryRemaining,
                                    complimentaryRemaining,
                                    maxPerRequest: Number(config?.maxPerRequest || 10),
                                    gstPercentage: Number(config?.gstPercentage || 18),
                                    simpleFlow: true,
                                    themeClasses: {
                                        bg: "bg-[#f4fbf6]",
                                        border: "border-[#d2edd9]",
                                        text: "text-[#15803d]",
                                        iconBg: "bg-gradient-to-tr from-[#166534] to-[#22c55e]",
                                        badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-100",
                                        btnBg: "bg-[#15803d] hover:bg-[#166534] text-white",
                                        statsBorder: "border-emerald-100/60"
                                    }
                                });
                            }}>
                                <span className="text-[9.5px] font-black text-slate-800 text-center mb-1 block">Packed Thali Lunch</span>
                                <div className="flex items-center justify-between gap-1">
                                    <img loading="lazy" decoding="async" src={thaliImg} alt="Packed Thali Lunch" className="w-[40px] h-[35px] object-contain shrink-0" />
                                    <div className="text-center flex-1">
                                        <span className="text-[18px] font-black text-[#15803d] leading-none block">
                                            {passConfigs.find(c => c.passType === 'lunch')?.complimentaryQuota ?? 2}
                                        </span>
                                        <span className="text-[7.5px] font-bold text-slate-400 block leading-tight mt-0.5 uppercase tracking-wide">Persons<br />Per Day</span>
                                    </div>
                                </div>
                            </div>

                            {/* Water Bottle */}
                            <div className="bg-[#f7fbff] border border-[#e3efff] rounded-xl p-2 flex flex-col justify-between hover:shadow-md cursor-pointer transition-all" onClick={() => {
                                const config = passConfigs.find(c => c.passType === 'water');
                                const comp = Number(config?.complimentaryQuota ?? 2);
                                const req = countsByType['water']?.total || 0;
                                const complimentaryRemaining = Math.max(comp - req, 0);
                                handleOpenModal({
                                    id: 'water',
                                    title: 'Water Bottle',
                                    subtitle: 'Daily Entitlement',
                                    icon: Gift,
                                    price: Number(config?.price || 20),
                                    complimentary: comp,
                                    remaining: complimentaryRemaining,
                                    complimentaryRemaining,
                                    maxPerRequest: Number(config?.maxPerRequest || 10),
                                    gstPercentage: Number(config?.gstPercentage || 18),
                                    simpleFlow: true,
                                    themeClasses: {
                                        bg: "bg-[#f0f7ff]",
                                        border: "border-blue-100",
                                        text: "text-[#1a3a7c]",
                                        iconBg: "bg-gradient-to-tr from-[#1e40af] to-[#3b82f6]",
                                        badgeBg: "bg-blue-50 text-blue-700 border-blue-100",
                                        btnBg: "bg-blue-600 hover:bg-blue-700 text-white",
                                        statsBorder: "border-blue-100/60"
                                    }
                                });
                            }}>
                                <span className="text-[9.5px] font-black text-slate-800 text-center mb-1 block">Water Bottle</span>
                                <div className="flex items-center justify-between gap-1">
                                    <img loading="lazy" decoding="async" src={bottleImg} alt="Water Bottle" className="w-[40px] h-[35px] object-contain shrink-0" />
                                    <div className="text-center flex-1">
                                        <span className="text-[18px] font-black text-blue-600 leading-none block">
                                            {passConfigs.find(c => c.passType === 'water')?.complimentaryQuota ?? 2}
                                        </span>
                                        <span className="text-[7.5px] font-bold text-slate-400 block leading-tight mt-0.5 uppercase tracking-wide">Bottles<br />Per Day</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        {/* Period Badge */}
                        <div className="w-full bg-[#f4fbf6] border border-[#d2edd9] py-1 px-1.5 rounded-lg flex items-center justify-center gap-1.5 mb-1.5">
                            <span className="text-[9px] font-black text-[#15803d] flex items-center gap-1">
                                📅 Provided for ALL 3 DAYS (21 – 23 August 2026)
                            </span>
                        </div>
                        {/* Needs block */}
                        <div className="w-full bg-[#fcfdfc] border border-dashed border-[#15803d]/30 py-1 px-1.5 rounded-lg flex items-center justify-center gap-1">
                            <span className="text-[9px] font-extrabold text-[#15803d] flex items-center gap-1">
                                🛒 Need more? Extra lunch and water bottles can be purchased online.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Column 2: How It Works */}
                <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex flex-col gap-0.5 mb-1.5">
                            <h3 className="font-extrabold text-[12px] text-[#11381e]">How It Works</h3>
                            <div className="w-8 h-0.5 bg-[#15803d] rounded-full" />
                        </div>

                        {/* Steps Image */}
                        <div className="flex items-center justify-center py-0.5">
                            <img loading="lazy" decoding="async" src={howitworksImg} alt="How it Works" className="w-[95%] h-auto object-contain max-h-[64px]" />
                        </div>

                        {/* Steps Text Grid */}
                        <div className="grid grid-cols-4 gap-0.5 text-center mt-1.5 mb-1.5">
                            <div className="flex flex-col items-center">
                                <span className="text-[9px] font-black text-slate-800 leading-tight">Apply Online</span>
                                <span className="text-[7.5px] text-slate-500 font-bold mt-0.5 leading-tight">Select the<br />pass type</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-[9px] font-black text-slate-800 leading-tight">Make Payment</span>
                                <span className="text-[7.5px] text-slate-500 font-bold mt-0.5 leading-tight">Secure online<br />payment</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-[9px] font-black text-slate-800 leading-tight">Get Approved</span>
                                <span className="text-[7.5px] text-slate-500 font-bold mt-0.5 leading-tight">Quick verification<br />& approval</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-[9px] font-black text-slate-800 leading-tight">Receive Pass</span>
                                <span className="text-[7.5px] text-slate-500 font-bold mt-0.5 leading-tight">Instant digital<br />pass on email</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#f4fbf6] border border-[#d2edd9] rounded-lg p-2 flex items-start gap-1.5 mt-auto">
                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 text-[9px]">
                            <Check size={9} strokeWidth={3.5} />
                        </div>
                        <p className="text-[9px] text-[#15803d] font-bold leading-tight">
                            All passes are digital with QR code and will be sent to your email.
                        </p>
                    </div>
                </div>

                {/* Column 3: Important Notes */}
                <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-50">
                            <svg viewBox="0 0 24 24" width="16" height="16" className="text-amber-500 shrink-0 fill-amber-500">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h3 className="font-extrabold text-[12px] text-[#11381e]">Important Notes</h3>
                        </div>

                        {/* Content Area */}
                        <div className="flex items-start gap-1.5 flex-1 justify-between">
                            {/* Checklist */}
                            <div className="space-y-1.5 flex-1">
                                {notes.map((note, i) => (
                                    <div key={i} className="flex items-start gap-1 group">
                                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Check size={9} strokeWidth={3.5} />
                                        </div>
                                        <span className="text-[10px] text-slate-700 font-extrabold leading-tight">
                                            {note}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {/* Notepad Clipboard image */}
                            <div className="w-[95px] shrink-0 flex items-center justify-center self-center">
                                <img loading="lazy" decoding="async" src={notepadImg} alt="Notepad Clipboard" className="max-w-full h-auto object-contain max-h-[105px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── BOTTOM TWO BANNERS ─── */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5">
                {/* Left Banner: Complimentary Entitlement Detail */}
                <div className="xl:col-span-7 bg-[#f4faf5] border border-[#e2ede4] text-slate-800 rounded-xl shadow-sm p-3 flex items-center gap-3 relative overflow-hidden group">
                    {/* Serrated Starburst FREE Badge */}
                    <div className="shrink-0 transform hover:scale-105 transition-all duration-300">
                        <svg viewBox="0 0 100 100" width="58" height="58">
                            <polygon points="50,5 57,14 68,10 72,21 82,21 82,32 90,36 86,47 95,50 86,53 90,64 82,68 82,79 72,79 68,90 57,86 50,95 43,86 32,90 28,79 18,79 18,68 10,64 14,53 5,50 14,47 10,36 18,32 18,21 28,21 32,10 43,14" fill="#3ca353" />
                            <polygon points="50,8 55,16 65,12 69,22 79,22 79,32 87,36 83,46 91,49 83,52 87,62 79,66 79,76 69,76 65,86 55,82 50,90 45,82 35,86 31,76 21,76 21,66 13,62 17,52 9,49 17,46 13,36 21,32 21,22 31,22 35,12 45,16" fill="#2d9444" />
                            <text x="50" y="58" fontSize="20" fontWeight="900" fill="#ffffff" textAnchor="middle" letterSpacing="0.5" fontFamily="sans-serif">FREE</text>
                        </svg>
                    </div>

                    <div className="flex-1">
                        <h4 className="text-[12px] font-black text-[#15803d] uppercase tracking-wide">
                            Your Complimentary Entitlement
                        </h4>

                        {/* Passes list row */}
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mt-1.5 pb-1.5 border-b border-dashed border-[#d8e6da]">
                            <span className="flex items-center gap-1 text-[9px] font-black text-slate-700">
                                <Users size={11} className="text-[#1a3a7c] shrink-0" /> {passes.find(p => p.id === 'visitor')?.complimentary} Visitor
                            </span>
                            <span className="flex items-center gap-1 text-[9px] font-black text-slate-700">
                                <UserCheck size={11} className="text-[#ea580c] shrink-0" /> {passes.find(p => p.id === 'exhibitor')?.complimentary} Exhibitor
                            </span>
                            <span className="flex items-center gap-1 text-[9px] font-black text-slate-700">
                                <Car size={11} className="text-[#15803d] shrink-0" /> {passes.find(p => p.id === 'vehicle')?.complimentaryTwoWheeler} 2-Wheeler
                            </span>
                            <span className="flex items-center gap-1 text-[9px] font-black text-slate-700">
                                <Car size={11} className="text-[#0f766e] shrink-0" /> {passes.find(p => p.id === 'vehicle')?.complimentaryFourWheeler} Car
                            </span>
                            <span className="flex items-center gap-1 text-[9px] font-black text-slate-700">
                                <Wrench size={11} className="text-[#6b21a8] shrink-0" /> {passes.find(p => p.id === 'service')?.complimentary} Service
                            </span>
                            <span className="flex items-center gap-1 text-[9px] font-black text-slate-700">
                                <Sparkles size={11} className="text-[#be185d] shrink-0" /> {passes.find(p => p.id === 'delegate')?.complimentary} Delegate
                            </span>
                        </div>

                        {/* Lunch and Water Bottles row */}
                        <div className="mt-1.5 flex items-center gap-4 text-[9px] font-black text-slate-700">
                            <span className="flex items-center gap-1">
                                + <img loading="lazy" decoding="async" src={thaliImg} alt="Lunch" className="w-[16px] h-[16px] object-contain shrink-0" /> {data?.entitlements?.lunchCount || 2} Packed Thali Lunch ({data?.entitlements?.lunchCount || 2} Persons Per Day)
                            </span>
                            <span className="text-slate-300 font-normal">|</span>
                            <span className="flex items-center gap-1">
                                + <img loading="lazy" decoding="async" src={bottleImg} alt="Water" className="w-[16px] h-[16px] object-contain shrink-0" /> {data?.entitlements?.waterBottleCount || 2} Water Bottles ({data?.entitlements?.waterBottleCount || 2} Per Day)
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Banner: Need Extra Purchase CTA */}
                <div className="xl:col-span-5 bg-[#fafafb] border border-slate-100 text-slate-800 rounded-xl shadow-sm p-1 flex items-center justify-between gap-3">
                    <div className="flex-1">
                        <h4 className="text-[12px] font-black tracking-tight text-[#11381e] leading-tight">
                            Need Extra Passes, Lunch or Water?
                        </h4>
                        <p className="text-slate-500 text-[9px] font-black mt-0.5 uppercase tracking-wide">
                            Purchase instantly online as per your need.
                        </p>
                        <button
                            onClick={() => navigate("/exhibitor-dashboard/accessories")}
                            className="mt-2 h-6 px-3 bg-[#15803d] hover:bg-[#0f6b30] text-white text-[10px] font-black tracking-wide rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-all hover:scale-102"
                        >
                            Purchase Extra Now
                            <ArrowRight size={11} />
                        </button>
                    </div>

                    {/* Shopping Cart image */}
                    <div className="w-[130px] shrink-0 flex items-center justify-center">
                        <img loading="lazy" decoding="async" src={shoppingImg} alt="Shopping Cart" className="max-w-full h-auto object-contain max-h-[78px]" />
                    </div>
                </div>
            </div>

            {/* Footer details */}
            <div className="w-full bg-[#f5f7fc] border border-[#e3e7f2] py-1 px-2.5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-1 text-[9px] text-slate-500 font-extrabold mt-1">
                <p className="flex items-center gap-1">ⓘ All rates are inclusive of taxes. Terms & conditions apply.</p>
                <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline">
                    View Terms & Conditions <ArrowRight size={11} className="shrink-0" />
                </a>
            </div>

            {/* Modal for Requesting/Purchasing Extra Passes */}
            <AnimatePresence>
                {isModalOpen && selectedPass && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                            className="relative w-full max-w-[640px] bg-[#f8fafc] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-slate-900/5"
                        >
                            {/* Modal Header */}
                            <div className={`px-4 py-3 flex items-center justify-between bg-gradient-to-r ${selectedPass.themeClasses.iconBg} z-10 shadow-sm`}>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                        <selectedPass.icon size={18} className="text-white" />
                                    </div>
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h2 className="text-[15px] font-black text-white tracking-tight leading-tight">
                                                {selectedPass.title}
                                            </h2>
                                            <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[9px] font-black uppercase tracking-wide backdrop-blur-sm">
                                                {selectedStatusBadge.text}
                                            </span>
                                        </div>
                                        <p className="text-[10.5px] text-white/80 font-bold mt-0.5">
                                            {isVehicleSelected
                                                ? `2-Wheeler: ${selectedPass.remainingTwoWheeler} free, then ₹${selectedPass.priceTwoWheeler} · Car: ${selectedPass.remainingFourWheeler} free, then ₹${selectedPass.priceFourWheeler}`
                                                : selectedIsFullyComplimentary
                                                ? `${selectedComplimentaryRemaining} complimentary available`
                                                : `₹${selectedPass.price} / extra pass`} • {selectedPass.subtitle}
                                            {!!selectedPass.validityDays && ` • Valid ${selectedPass.validityDays} day${selectedPass.validityDays > 1 ? 's' : ''} only`}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all shrink-0 backdrop-blur-sm"
                                >
                                    <X size={15} strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* Modal Body / Form */}
                            <div className="p-4 overflow-y-auto custom-scrollbar flex-1 relative">
                                {!isReviewing ? (
                                <form className="space-y-3" onSubmit={handleProceedToReview}>

                                    {/* Complimentary / Paid status - updates live as selection crosses the free quota, no blocking popups */}
                                    {selectedHasSelection && !selectedIsFullyComplimentary && (
                                        <p className="text-[11.5px] font-bold text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5">
                                            Free quota used up — {selectedPaidQuantity} of your {quantity} {selectedPass?.title} will be charged (₹{selectedEstimatedPayable}).
                                        </p>
                                    )}

                                    {selectedPass?.simpleFlow ? (
                                        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
                                            <div className="flex items-center justify-between gap-2 mb-2">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                    Quantity
                                                </label>
                                                <span className={`px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-wide ${selectedStatusBadge.cls}`}>
                                                    {selectedStatusBadge.text}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="text-[12px] font-extrabold text-slate-700">How many do you need?</span>
                                                <div className={`flex items-center gap-2 px-1 py-1 rounded-full border ${selectedPass.themeClasses.border} ${selectedPass.themeClasses.bg}`}>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSimpleQuantityChange(quantity - 1)}
                                                        disabled={quantity <= 1}
                                                        className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
                                                    >
                                                        <span className="text-base font-black text-slate-400 leading-none">-</span>
                                                    </button>
                                                    <span className="text-[14px] font-black text-slate-800 w-5 text-center">{quantity}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSimpleQuantityChange(quantity + 1)}
                                                        className={`w-7 h-7 rounded-full flex items-center justify-center shadow-sm text-white ${selectedPass.themeClasses.btnBg}`}
                                                    >
                                                        <span className="text-base font-black leading-none">+</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between gap-2 mt-2.5 pt-2 border-t border-slate-100 text-[10.5px] font-bold text-slate-500">
                                                <span>Free <b className="text-emerald-700">{selectedComplimentaryRemaining}</b></span>
                                                <span>Used <b className="text-slate-700">{selectedFreeQuantity}</b></span>
                                                <span>{selectedIsFullyComplimentary ? 'Payable' : 'To Pay'} <b className={selectedIsFullyComplimentary ? 'text-emerald-700' : 'text-amber-700'}>{selectedIsFullyComplimentary ? 'Free' : `₹${selectedEstimatedPayable}`}</b></span>
                                                <span className="text-slate-400">{quantity}/{selectedPass?.maxPerRequest || 10}</span>
                                            </div>
                                        </div>
                                    ) : (() => {
                                        const { available: modalAvailable, allocated: modalAllocated } = getTeamAllocation(selectedPass);
                                        const list = isVehiclePassId(selectedPass?.id) ? vehicles : personnel;
                                        const checkedIds = new Set(list.filter((e: any) => e.isTeamMember).map((e: any) => String(e.teamMemberId)));
                                        const manualCount = list.filter((e: any) => !e.isTeamMember).length;
                                        const teamMembersExhausted = modalAvailable.length === 0 || checkedIds.size >= modalAvailable.length;
                                        return (
                                            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
                                                <div className="flex items-center justify-between gap-2 mb-2">
                                                    <div className="flex items-center gap-1.5">
                                                        <Users size={12.5} className={selectedPass.themeClasses.text} strokeWidth={2.5} />
                                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                            Team Members
                                                        </label>
                                                    </div>
                                                    <span className={`px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-wide ${selectedStatusBadge.cls}`}>
                                                        {selectedStatusBadge.text}
                                                    </span>
                                                </div>

                                                {modalAvailable.length > 0 ? (
                                                    <div className="flex flex-wrap gap-1.5 mb-1.5">
                                                        {modalAvailable.map((member: any) => {
                                                            const checked = checkedIds.has(String(member._id));
                                                            return (
                                                                <button
                                                                    key={member._id}
                                                                    type="button"
                                                                    onClick={() => toggleTeamMember(member)}
                                                                    className={`relative flex items-center gap-1.5 pl-1 pr-2.5 py-1 rounded-full border transition-all ${checked ? `${selectedPass.themeClasses.iconBg} border-transparent text-white shadow-sm` : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'}`}
                                                                >
                                                                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black shrink-0 ${checked ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                                                        {(member.name || '?').trim().charAt(0).toUpperCase()}
                                                                    </span>
                                                                    <span className="text-[11px] font-bold whitespace-nowrap">{member.name || 'Unnamed'}</span>
                                                                    {checked && (
                                                                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center shadow">
                                                                            <Check size={9} strokeWidth={4} className={selectedPass.themeClasses.text} />
                                                                        </span>
                                                                    )}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <p className="text-[10.5px] font-bold text-slate-500 mb-1.5 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5">No registered team members available.</p>
                                                )}

                                                {modalAllocated.length > 0 && (
                                                    <p className="text-[9.5px] text-slate-400 font-semibold mb-1.5">{modalAllocated.length} already allocated this pass.</p>
                                                )}

                                                {teamMembersExhausted && (
                                                    <button
                                                        type="button"
                                                        onClick={addManualEntry}
                                                        className="w-full h-7 rounded-full border border-dashed border-slate-300 text-[10.5px] font-black text-slate-500 hover:border-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-1 mb-2"
                                                    >
                                                        + Add Manual {isVehiclePassId(selectedPass?.id) ? 'Vehicle' : 'Person'}
                                                        {manualCount > 0 && <span className="px-1.5 rounded-full bg-slate-100 text-slate-500 text-[9px]">{manualCount}</span>}
                                                    </button>
                                                )}

                                                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 text-[10.5px] font-bold text-slate-500">
                                                    <span>Free <b className="text-emerald-700">{selectedComplimentaryRemaining}</b></span>
                                                    <span>Used <b className="text-slate-700">{selectedFreeQuantity}</b></span>
                                                    <span>{selectedIsFullyComplimentary ? 'Payable' : 'To Pay'} <b className={selectedIsFullyComplimentary ? 'text-emerald-700' : 'text-amber-700'}>{selectedIsFullyComplimentary ? 'Free' : `₹${selectedEstimatedPayable}`}</b></span>
                                                    <span className="text-slate-400">{quantity}/{selectedPass?.maxPerRequest || 10}</span>
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    {isVehicleSelected && (
                                        <div className="flex items-center justify-between gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 mb-2 text-[10.5px] font-bold text-slate-600">
                                            <span>🛵 2-Wheeler: <b className="text-emerald-700">{selectedPass.remainingTwoWheeler} free</b> left, then ₹{selectedPass.priceTwoWheeler}</span>
                                            <span>🚗 Car: <b className="text-emerald-700">{selectedPass.remainingFourWheeler} free</b> left, then ₹{selectedPass.priceFourWheeler}</span>
                                        </div>
                                    )}

                                    {/* Dynamic Fields — team members only fill in what's NOT already known (vehicle no. / Aadhaar); manual entries get the full form */}
                                    {isVehiclePassId(selectedPass?.id) ? (
                                        vehicles.map((veh, index) => (
                                            veh.isTeamMember ? (
                                                <div key={index} className="bg-white border border-slate-200 rounded-xl p-2 mb-2 shadow-sm flex items-center gap-2">
                                                    <div className="flex-1 min-w-0">
                                                        <span className="block text-[11px] font-black text-slate-800 truncate">{veh.name}</span>
                                                        <span className="block text-[10px] font-bold text-emerald-700 uppercase tracking-wide">Team member</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => updateVehicle(index, 'vehicleType', veh.vehicleType === '2-wheeler' ? '4-wheeler' : '2-wheeler')}
                                                        className="h-7 px-2 rounded-lg border border-slate-200 bg-slate-50 text-[10px] font-black text-slate-600 shrink-0"
                                                    >
                                                        {veh.vehicleType === '2-wheeler' ? '2-Wheeler' : '4-Wheeler'}
                                                    </button>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={veh.vehicleNumber}
                                                        onChange={(e) => updateVehicle(index, 'vehicleNumber', e.target.value.toUpperCase())}
                                                        placeholder="Vehicle No."
                                                        className="w-28 h-7 bg-slate-50 border border-slate-200 rounded-lg px-2 font-bold text-slate-800 text-[10px] uppercase focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shrink-0"
                                                    />
                                                    <button type="button" onClick={() => removeEntry(index)} className="text-slate-400 hover:text-red-500 shrink-0" title="Remove">
                                                        <X size={13} strokeWidth={3} />
                                                    </button>
                                                </div>
                                            ) : (
                                            <div key={index} className="bg-white border border-slate-200 rounded-xl p-2.5 mb-2 shadow-sm relative overflow-hidden">
                                                <div className="absolute right-0 top-0 flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-bl-lg border-b border-l border-slate-100">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Manual #{index + 1}</span>
                                                    <button type="button" onClick={() => removeEntry(index)} className="text-slate-400 hover:text-red-500" title="Remove">
                                                        <X size={11} strokeWidth={3} />
                                                    </button>
                                                </div>

                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="text-[13.5px] font-black text-slate-800">Vehicle Details</h3>
                                                    <span className="rounded px-1.5 py-0.5 text-[9.5px] font-black uppercase bg-amber-50 text-amber-700">Manual details</span>
                                                </div>

                                                <div className="mb-2">
                                                    <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Vehicle Type</label>
                                                    <div className="flex gap-1.5">
                                                        <button
                                                            type="button"
                                                            onClick={() => updateVehicle(index, 'vehicleType', '2-wheeler')}
                                                            className={`flex-1 py-1.5 rounded-lg border flex items-center justify-center transition-all ${veh.vehicleType === '2-wheeler' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-300'}`}
                                                        >
                                                            {veh.vehicleType === '2-wheeler' && <CheckCircle2 size={12} className="mr-1.5" />}
                                                            <span className="font-black text-[12px]">2-Wheeler</span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => updateVehicle(index, 'vehicleType', '4-wheeler')}
                                                            className={`flex-1 py-1.5 rounded-lg border flex items-center justify-center transition-all ${veh.vehicleType === '4-wheeler' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-300'}`}
                                                        >
                                                            {veh.vehicleType === '4-wheeler' && <CheckCircle2 size={12} className="mr-1.5" />}
                                                            <span className="font-black text-[12px]">4-Wheeler</span>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Registration Number</label>
                                                    <div className="relative flex items-center">
                                                        <div className="absolute left-3 z-10 text-slate-400">
                                                            <Hash size={14} />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            required
                                                            value={veh.vehicleNumber}
                                                            onChange={(e) => updateVehicle(index, 'vehicleNumber', e.target.value.toUpperCase())}
                                                            placeholder="e.g. MH 01 AB 1234"
                                                            className="w-full h-9 bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 font-bold text-slate-800 text-[12px] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all uppercase"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                                    <div>
                                                        <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Driver/Contact Name</label>
                                                        <input
                                                            type="text"
                                                            required
                                                            value={veh.name || ''}
                                                            onChange={(e) => updateVehicle(index, 'name', e.target.value)}
                                                            placeholder="e.g. Rahul Sharma"
                                                            className="w-full h-9 bg-slate-50 border border-slate-200 rounded-lg px-2.5 font-bold text-slate-800 text-[12px] focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Contact Phone</label>
                                                        <input
                                                            type="text"
                                                            required
                                                            value={veh.phone || ''}
                                                            onChange={(e) => updateVehicle(index, 'phone', e.target.value)}
                                                            placeholder="e.g. 9876543210"
                                                            className="w-full h-9 bg-slate-50 border border-slate-200 rounded-lg px-2.5 font-bold text-slate-800 text-[12px] focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mt-2">
                                                    <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Contact Email (For QR)</label>
                                                    <input
                                                        type="email"
                                                        required
                                                        value={veh.email || ''}
                                                        onChange={(e) => updateVehicle(index, 'email', e.target.value)}
                                                        placeholder="e.g. rahul@example.com"
                                                        className="w-full h-9 bg-slate-50 border border-slate-200 rounded-lg px-2.5 font-bold text-slate-800 text-[12px] focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                                                    />
                                                </div>
                                            </div>
                                            )
                                        ))
                                    ) : selectedPass?.simpleFlow ? (
                                        <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl px-3 py-2 mb-2 flex items-center gap-2.5">
                                            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                                                <Check size={13} strokeWidth={3} />
                                            </div>
                                            <p className="text-[10px] font-bold text-emerald-800 leading-snug">
                                                No form needed — email & WhatsApp will go to your registered contact,{' '}
                                                <span className="font-black">{personnel[0]?.name || 'your registered contact'}</span>
                                                {personnel[0]?.phone ? ` (${personnel[0].phone})` : ''}.
                                            </p>
                                        </div>
                                    ) : (
                                        personnel.map((person, index) => (
                                            person.isTeamMember ? (
                                                selectedPass?.id === 'service' ? (
                                                    <div key={index} className="bg-white border border-slate-200 rounded-xl p-2 mb-2 shadow-sm flex items-center gap-2">
                                                        <div className="flex-1 min-w-0">
                                                            <span className="block text-[11px] font-black text-slate-800 truncate">{person.name}</span>
                                                            <span className="block text-[10px] font-bold text-emerald-700 uppercase tracking-wide">Team member · Aadhaar needed</span>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            inputMode="numeric"
                                                            required
                                                            maxLength={12}
                                                            pattern="[0-9]{12}"
                                                            value={person.aadhaarNumber || ''}
                                                            onChange={(e) => updatePersonnel(index, 'aadhaarNumber', e.target.value.replace(/\D/g, '').slice(0, 12))}
                                                            placeholder="12-digit Aadhaar"
                                                            className="w-36 h-7 bg-slate-50 border border-slate-200 rounded-lg px-2 font-bold text-slate-800 text-[10px] focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all shrink-0"
                                                        />
                                                    </div>
                                                ) : null
                                            ) : (
                                            <div key={index} className="bg-white border border-slate-200 rounded-xl p-2.5 mb-2 shadow-sm relative overflow-hidden">
                                                <div className={`absolute right-0 top-0 flex items-center gap-1 px-2.5 py-1 rounded-bl-lg border-b border-l border-white/50 ${selectedPass?.themeClasses?.badgeBg || 'bg-blue-50'}`}>
                                                    <span className={`text-[10px] font-black uppercase tracking-widest`}>Manual #{index + 1}</span>
                                                    <button type="button" onClick={() => removeEntry(index)} className="text-slate-500 hover:text-red-600" title="Remove">
                                                        <X size={11} strokeWidth={3} />
                                                    </button>
                                                </div>

                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="text-[13.5px] font-black text-slate-800">Attendee Details</h3>
                                                    <span className="rounded px-1.5 py-0.5 text-[9.5px] font-black uppercase bg-amber-50 text-amber-700">Manual details</span>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    <div>
                                                        <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Full Name</label>
                                                        <input 
                                                            type="text"
                                                            required
                                                            value={person.name}
                                                            onChange={(e) => updatePersonnel(index, 'name', e.target.value)}
                                                            placeholder="Enter full name"
                                                            className="w-full h-9 bg-slate-50 border border-slate-200 rounded-lg px-2.5 font-bold text-slate-800 text-[12px] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Designation</label>
                                                        <input 
                                                            type="text"
                                                            required
                                                            value={person.designation}
                                                            onChange={(e) => updatePersonnel(index, 'designation', e.target.value)}
                                                            placeholder="e.g. Manager"
                                                            className="w-full h-9 bg-slate-50 border border-slate-200 rounded-lg px-2.5 font-bold text-slate-800 text-[12px] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:col-span-2">
                                                        <div>
                                                            <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Email ID</label>
                                                            <input 
                                                                type="email"
                                                                required
                                                                value={person.email}
                                                                onChange={(e) => updatePersonnel(index, 'email', e.target.value)}
                                                                placeholder="Email address"
                                                                className="w-full h-9 bg-slate-50 border border-slate-200 rounded-lg px-2.5 font-bold text-slate-800 text-[12px] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Phone</label>
                                                            <input 
                                                                type="tel"
                                                                required
                                                                value={person.phone}
                                                                onChange={(e) => updatePersonnel(index, 'phone', e.target.value)}
                                                                placeholder="Mobile No"
                                                                className="w-full h-9 bg-slate-50 border border-slate-200 rounded-lg px-2.5 font-bold text-slate-800 text-[12px] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                                            />
                                                        </div>
                                                    </div>

                                                    {selectedPass?.id === 'service' && (
                                                        <div className="sm:col-span-2">
                                                            <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Aadhaar Card Number</label>
                                                            <input
                                                                type="text"
                                                                inputMode="numeric"
                                                                required
                                                                maxLength={12}
                                                                pattern="[0-9]{12}"
                                                                value={person.aadhaarNumber || ''}
                                                                onChange={(e) => updatePersonnel(index, 'aadhaarNumber', e.target.value.replace(/\D/g, '').slice(0, 12))}
                                                                placeholder="Enter 12-digit Aadhaar number"
                                                                className="w-full h-9 bg-slate-50 border border-slate-200 rounded-lg px-2.5 font-bold text-slate-800 text-[12px] focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                                            />
                                                            <p className="mt-1 text-[9px] text-slate-400">Required for service personnel verification.</p>
                                                        </div>
                                                    )}

                                                    <div className="sm:col-span-2">
                                                        <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Gender Selection</label>
                                                        <div className="flex gap-1.5">
                                                            <button 
                                                                type="button"
                                                                onClick={() => updatePersonnel(index, 'gender', 'male')}
                                                                className={`flex-1 py-1.5 rounded-lg border flex items-center justify-center transition-all ${person.gender === 'male' ? 'bg-blue-50 border-blue-400 text-blue-700' : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-300'}`}
                                                            >
                                                                {person.gender === 'male' && <CheckCircle2 size={12} className="mr-1.5" />}
                                                                <span className="font-black text-[12px]">Male</span>
                                                            </button>
                                                            <button 
                                                                type="button"
                                                                onClick={() => updatePersonnel(index, 'gender', 'female')}
                                                                className={`flex-1 py-1.5 rounded-lg border flex items-center justify-center transition-all ${person.gender === 'female' ? 'bg-pink-50 border-pink-400 text-pink-700' : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-300'}`}
                                                            >
                                                                {person.gender === 'female' && <CheckCircle2 size={12} className="mr-1.5" />}
                                                                <span className="font-black text-[12px]">Female</span>
                                                            </button>
                                                            <button 
                                                                type="button"
                                                                onClick={() => updatePersonnel(index, 'gender', 'other')}
                                                                className={`flex-1 py-1.5 rounded-lg border flex items-center justify-center transition-all ${person.gender === 'other' ? 'bg-purple-50 border-purple-400 text-purple-700' : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-300'}`}
                                                            >
                                                                {person.gender === 'other' && <CheckCircle2 size={12} className="mr-1.5" />}
                                                                <span className="font-black text-[12px]">Other</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            )
                                        ))
                                    )}

                                    {/* Submit Button */}
                                    <div className="sticky bottom-0 -mx-3 px-3 pt-2 pb-1 bg-[#f8fafc]/95 backdrop-blur border-t border-slate-200">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || quantity < 1}
                                            className={`mx-auto w-full max-w-[420px] py-2 rounded-lg text-[11px] font-black text-white shadow-[0_3px_10px_0_rgba(0,0,0,0.1)] hover:shadow-[0_5px_16px_rgba(0,0,0,0.14)] transition-all flex items-center justify-center gap-1.5 ${selectedPass.themeClasses.btnBg} ${(isSubmitting || quantity < 1) ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        >
                                            {isSubmitting ? 'Processing...' : quantity < 1 ? 'Select at least one' : (selectedIsFullyComplimentary ? 'Submit Complimentary Request' : 'Proceed to Payment Review')}
                                            {!isSubmitting && quantity >= 1 && <ChevronRight size={14} />}
                                        </button>
                                    </div>
                                </form>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                                            <div className="flex items-center justify-between gap-3 mb-3 border-b border-slate-100 pb-3">
                                                <h3 className="text-sm font-black text-slate-800">Payment Review</h3>
                                                <span className="px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100 text-[9px] font-black uppercase tracking-wide">Extra Passes</span>
                                            </div>
                                            <div className="space-y-2 text-xs font-bold text-slate-600">
                                                <div className="flex justify-between">
                                                    <span>Total Passes Requested:</span>
                                                    <span>{quantity}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Complimentary Applied:</span>
                                                    <span className="text-emerald-600">-{quantity - reviewData.paidQuantity}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Paid Passes:</span>
                                                    <span>{reviewData.paidQuantity}</span>
                                                </div>
                                                <div className="border-t pt-2 flex justify-between">
                                                    <span>Base Amount:</span>
                                                    <span>₹{reviewData.baseAmount}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>GST ({selectedPass.gstPercentage}%):</span>
                                                    <span>₹{reviewData.gstAmount}</span>
                                                </div>
                                                <div className="border-t pt-2 flex justify-between text-sm font-black text-slate-800">
                                                    <span>Total Amount:</span>
                                                    <span>₹{reviewData.totalAmount}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={handleProceedToPay}
                                            className={`w-full py-3.5 rounded-xl text-[13px] font-black text-white shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] transition-all flex items-center justify-center gap-2 ${selectedPass.themeClasses.btnBg}`}
                                        >
                                            Pay ₹{reviewData.totalAmount} & Submit
                                            <ArrowRight size={16} />
                                        </button>
                                        <button
                                            onClick={() => setIsReviewing(false)}
                                            className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50"
                                        >
                                            Back to Edit
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <DelegateRegistrationModal 
                isOpen={isDelegateModalOpen}
                onClose={() => setIsDelegateModalOpen(false)}
                complimentaryRemaining={Number(passes.find((pass) => pass.id === 'delegate')?.complimentaryRemaining || 0)}
                onSubmitRegistration={async (formData) => {
                    try {
                        const token = localStorage.getItem('exhibitorToken');
                        // Backend integration for exhibitor complimentary delegate registration
                        const form = new FormData();
                        Object.keys(formData).forEach(key => {
                            if (key === 'sessions' || key === 'specialPasses') {
                                form.append(key, JSON.stringify(formData[key]));
                            } else {
                                form.append(key, formData[key] as any);
                            }
                        });

                        const response = await fetch(`${API_URL}/delegate/registration/exhibitor-complimentary`, {
                            method: "POST",
                            headers: {
                                "Authorization": `Bearer ${token}`
                            },
                            body: form
                        });

                        const resData = await response.json();
                        if (response.ok && resData.requiresPayment) {
                            const isLoaded = await loadRazorpay();
                            if (!isLoaded) {
                                Swal.fire("Error", "Razorpay SDK failed to load.", "error");
                                return;
                            }

                            const options = {
                                key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_rYjE4Lms78Wn0s',
                                amount: resData.amount,
                                currency: 'INR',
                                name: '9th IHWE 2026',
                                description: 'Delegate Registration',
                                order_id: resData.orderId,
                                handler: async function (paymentResponse: any) {
                                    const verifyRes = await fetch(`${API_URL}/delegate/verify`, {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            registrationId: resData.registrationId,
                                            razorpay_payment_id: paymentResponse.razorpay_payment_id,
                                            razorpay_order_id: paymentResponse.razorpay_order_id,
                                            razorpay_signature: paymentResponse.razorpay_signature
                                        })
                                    });
                                    const verifyData = await verifyRes.json();
                                    if (verifyRes.ok && verifyData.success) {
                                        Swal.fire("Success", "Paid delegate registered successfully!", "success");
                                        setIsDelegateModalOpen(false);
                                        window.location.reload();
                                    } else {
                                        Swal.fire("Error", verifyData.message || "Payment verification failed", "error");
                                    }
                                },
                                prefill: {
                                    name: data?.companyName || 'Exhibitor',
                                    email: data?.email || '',
                                    contact: data?.mobile || ''
                                },
                                theme: { color: '#be185d' }
                            };

                            const rzp = new (window as any).Razorpay(options);
                            rzp.on('payment.failed', function (paymentResponse: any) {
                                Swal.fire("Payment Failed", paymentResponse.error?.description || "Payment was not completed.", "error");
                            });
                            rzp.open();
                        } else if (response.ok) {
                            Swal.fire("Success", "Delegate registered successfully!", "success");
                            setIsDelegateModalOpen(false);
                            // Optionally trigger a re-fetch of exhibitor data to update quota
                            window.location.reload();
                        } else {
                            Swal.fire("Error", resData.message || "Failed to register delegate", "error");
                        }
                    } catch (error) {
                        console.error("Delegate registration error:", error);
                        Swal.fire("Error", "An unexpected error occurred.", "error");
                    }
                }}
            />
        </motion.div>
    );
}
