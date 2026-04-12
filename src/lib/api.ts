import { useAuthStore } from "@/stores/authStore";
export interface SidebarItemType {
    _id: string;
    label: string;
    type: "heading" | "item" | "dropdown";
    path?: string;
    icon?: string;
    roles?: string[];
    children?: any[];
}


export const sidebarApi = {
    getTree: async (roleId?: string, isSuperAdmin: boolean = false): Promise<SidebarItemType[]> => {
        return [
            {
                _id: "dashboard",
                label: "Main",
                type: "heading",
            },
            {
                _id: "dashboard-link",
                label: "Dashboard",
                type: "item",
                path: "/dashboard",
                icon: "LayoutDashboard",
            },
            {
                _id: "website-management",
                label: "Website Management",
                type: "heading",
            },
            {
                _id: "home-slider",
                label: "Home Slider",
                type: "item",
                path: "/admin/home-slider",
                icon: "Image",
            },
            {
                _id: "about-us",
                label: "About Us",
                type: "item",
                path: "/admin/about",
                icon: "Info",
            },
            {
                _id: "testimonials",
                label: "Testimonials",
                type: "item",
                path: "/admin/testimonials",
                icon: "MessageSquare",
            },
            {
                _id: "services",
                label: "Services",
                type: "item",
                path: "/admin/services",
                icon: "Briefcase",
            },
        ];
    },
};

export const roleApi = {
    getRoles: async () => {
        return [{ _id: "1", roleName: "Super Admin" }];
    },
};

const BASE_API_URL = (import.meta.env.VITE_API_URL || (window.location.hostname === "localhost" ? "http://localhost:5000/api" : "/api")).replace(/\/$/, "");
export const API_URL = BASE_API_URL.endsWith("/api") ? BASE_API_URL : `${BASE_API_URL}/api`;
export const SERVER_URL = API_URL.replace(/\/api$/, "") || window.location.origin;

export const heroApi = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/hero/all`);
        const data = await response.json();
        return data.success ? data.data : [];
    }
};

export const eventHighlightsApi = {
    get: async () => {
        const response = await fetch(`${API_URL}/event-highlights`);
        const data = await response.json();
        return data.success ? data.data : null;
    }
};

export const aboutApi = {
    get: async () => {
        const response = await fetch(`${API_URL}/about`);
        const data = await response.json();
        return data.success ? data.data : null;
    }
};

export const settingsApi = {
    get: async () => {
        const response = await fetch(`${API_URL}/settings`);
        const data = await response.json();
        return data.success ? data.data : null;
    }
};

export const downloadPdfApi = {
    get: async () => {
        const response = await fetch(`${API_URL}/download-pdf`);
        const data = await response.json();
        return data.success ? data.data : null;
    }
};

export const marqueeApi = {
    get: async () => {
        const response = await fetch(`${API_URL}/marquee`);
        const data = await response.json();
        return data.success ? data.data : null;
    }
};

export const whoWeAreApi = {
    get: async () => {
        const response = await fetch(`${API_URL}/who-we-are`);
        const data = await response.json();
        return data.success ? data.data : null;
    }
};

export const featuredServicesApi = {
    get: async () => {
        const response = await fetch(`${API_URL}/featured-services`);
        const data = await response.json();
        return data.success ? data.data : null;
    }
};

export const faqApi = {
    get: async () => {
        const response = await fetch(`${API_URL}/faq`);
        const data = await response.json();
        return data.success ? data.data : null;
    }
};

export const glimpseApi = {
    get: async () => {
        const response = await fetch(`${API_URL}/glimpse`);
        const data = await response.json();
        return data.success ? data.data : null;
    }
};

export const clientApi = {
    get: async () => {
        const response = await fetch(`${API_URL}/client`);
        const data = await response.json();
        return data.success ? data.data : null;
    }
};
export const parallaxApi = {
    get: async () => {
        const response = await fetch(`${API_URL}/parallax`);
        const data = await response.json();
        return data.success ? data.data : null;
    }
};

export const testimonialsApi = {
    get: async () => {
        const response = await fetch(`${API_URL}/testimonials`);
        const data = await response.json();
        return data.success ? data.data : null;
    }
};
export const countersApi = {
    get: async () => {
        const response = await fetch(`${API_URL}/counters`);
        const data = await response.json();
        return data.success ? data.data : [];
    }
};

export const blogApi = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/blogs`);
        return await response.json();
    },
    getLatest: async (limit: number = 3) => {
        const response = await fetch(`${API_URL}/blogs`);
        const data = await response.json();
        // Return in same format but sliced
        if (data.success) {
            data.data = data.data.slice(0, limit);
        }
        return data;
    },
    getBySlug: async (slug: string) => {
        const response = await fetch(`${API_URL}/blogs/${slug}`);
        return await response.json();
    }
};

export const seoApi = {
    getByPath: async (path: string) => {
        const response = await fetch(`${API_URL}/seo/page?path=${encodeURIComponent(path)}`);
        const data = await response.json();
        return data.success ? data.data : null;
    }
};

export const heroBackgroundApi = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/hero-background?t=${Date.now()}`);
        const data = await response.json();
        return data.success ? data.data : [];
    },
    getByPage: async (pageName: string) => {
        const response = await fetch(`${API_URL}/hero-background?t=${Date.now()}`);
        const data = await response.json();
        if (data.success) {
            return data.data.find((item: any) => item.pageName === pageName);
        }
        return null;
    }
};

export const globalPlatformApi = {
    get: async () => {
        const response = await fetch(`${API_URL}/global-platform`);
        const data = await response.json();
        return data.success ? data.data : null;
    }
};
export const visionMissionApi = {
    get: async () => {
        const response = await fetch(`${API_URL}/vision-mission`);
        const data = await response.json();
        return data.success ? data.data : null;
    }
};
export const whyAttendApi = {
    get: async () => {
        const response = await fetch(`${API_URL}/why-attend`);
        const data = await response.json();
        return data.success ? data.data : null;
    }
};

export const whoShouldAttendApi = {
    get: async () => {
        const response = await fetch(`${API_URL}/who-should-attend`);
        const data = await response.json();
        return data.success ? data.data : null;
    }
};

export const organizedByApi = {
    get: async () => {
        const response = await fetch(`${API_URL}/organized-by`);
        const data = await response.json();
        return data.success ? data.data : null;
    }
};

export const whyExhibitApi = {
    get: async () => {
        const response = await fetch(`${API_URL}/why-exhibit-manage`);
        const data = await response.json();
        return data.success ? data.data : null;
    }
};

export const whyVisitApi = {
    get: async () => {
        const response = await fetch(`${API_URL}/why-visit`);
        const data = await response.json();
        return data.success ? data.data : null;
    }
};

export const exhibitorProfileApi = {
    get: async () => {
        const response = await fetch(`${API_URL}/exhibitor-profile`);
        const data = await response.json();
        // Since the backend returns the object directly or with data property
        // We'll normalize it here if needed, but usually it's just the data
        return data;
    }
};

export const ePromotionApi = {
    getContent: async () => {
        const response = await fetch(`${API_URL}/e-promotion/content`);
        const data = await response.json();
        return data.success ? data.data : null;
    },
    submitEnquiry: async (payload: any) => {
        const response = await fetch(`${API_URL}/e-promotion/enquiry`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return await response.json();
    }
};

export const stallVendorApi = {
    get: async () => {
        const response = await fetch(`${API_URL}/stall-vendor`);
        const data = await response.json();
        return data.success ? data.data : null;
    }
};

export const exhibitorApi = {
    get: async () => {
        const response = await fetch(`${API_URL}/exhibitor`);
        const data = await response.json();
        return data.success ? data.data : [];
    }
};
export const partnersApi = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/partners`);
        const data = await response.json();
        return data.success ? data.data : [];
    }
};

export const advisoryApi = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/advisory-members`);
        const data = await response.json();
        return data.success ? data.data : [];
    }
};

export const galleryApi = {
    getAll: async (category?: string) => {
        const url = category ? `${API_URL}/gallery?category=${category}` : `${API_URL}/gallery`;
        const response = await fetch(url);
        const data = await response.json();
        return data.success ? data.data : [];
    },
    getCategories: async (type?: string) => {
        const url = type ? `${API_URL}/gallery-category?type=${type}` : `${API_URL}/gallery-category`;
        const response = await fetch(url);
        const data = await response.json();
        return data.success ? data.data : [];
    }
};

export const contactEnquiryApi = {
    submitEnquiry: async (payload: any) => {
        const response = await fetch(`${API_URL}/contact-enquiry`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return await response.json();
    },
    getAll: async () => {
        const response = await fetch(`${API_URL}/contact-enquiry`);
        const data = await response.json();
        return data.success ? data.data : [];
    },
    delete: async (id: string) => {
        const response = await fetch(`${API_URL}/contact-enquiry/${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    }
};

export const buyerRegistrationApi = {
    submit: async (payload: any) => {
        const response = await fetch(`${API_URL}/buyer-registration`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return await response.json();
    },
    getAll: async () => {
        const response = await fetch(`${API_URL}/buyer-registration`);
        const data = await response.json();
        return data.success ? data.data : [];
    },
    delete: async (id: string) => {
        const response = await fetch(`${API_URL}/buyer-registration/${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    }
};

export const socialMediaApi = {
    get: async () => {
        const response = await fetch(`${API_URL}/social-media`);
        const data = await response.json();
        return data.success ? data.data : null;
    }
};

export const verifyApi = {
    sendEmailOtp: async (email: string, profile: string = 'SPEAKER') => {
        const response = await fetch(`${API_URL}/verify/send-email-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, profile })
        });
        return await response.json();
    },
    verifyEmailOtp: async (email: string, otp: string) => {
        const response = await fetch(`${API_URL}/verify/verify-email-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
        });
        return await response.json();
    },
    sendPhoneOtp: async (phone: string, profile: string = 'CONTACT') => {
        const response = await fetch(`${API_URL}/verify/send-phone-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, profile })
        });
        return await response.json();
    },
    verifyPhoneOtp: async (phone: string, otp: string) => {
        const response = await fetch(`${API_URL}/verify/verify-phone-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, otp })
        });
        return await response.json();
    }
};

export const analyticsApi = {
    logClick: async (iconName: string) => {
        try {
            const response = await fetch(`${API_URL}/analytics/log`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ iconName })
            });
            return await response.json();
        } catch (error) {
            console.error("Error logging click:", error);
            return { success: false };
        }
    }
};

export const stallApi = {
    getAvailable: async () => {
        const response = await fetch(`${API_URL}/stalls/available`);
        const data = await response.json();
        return data.success ? data.data : [];
    },
    getByEvent: async (eventId: string) => {
        const response = await fetch(`${API_URL}/stalls/available?eventId=${eventId}`);
        const data = await response.json();
        return data.success ? data.data : [];
    }
};

export const eventApi = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/events`);
        const data = await response.json();
        return data.success ? data.data : [];
    },
    getActive: async () => {
        const response = await fetch(`${API_URL}/events/active`);
        const data = await response.json();
        return data.success ? data.data : [];
    }
};

export const stallRateApi = {
    getRate: async (eventId: string, currency: string, stallType: string) => {
        const response = await fetch(`${API_URL}/stall-rates/find?eventId=${eventId}&currency=${currency}&stallType=${stallType}`);
        const data = await response.json();
        return data.success ? data.data : null;
    },
    getAllByEvent: async (eventId: string) => {
        const response = await fetch(`${API_URL}/stall-rates/event/${eventId}`);
        const data = await response.json();
        return data.success ? data.data : [];
    }
};

export const termsApi = {
    getByPage: async (pageName: string, eventId?: string) => {
        let url = `${API_URL}/terms-and-conditions/${pageName}`;
        if (eventId) {
            url += `?eventId=${eventId}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        return data.success ? data.data : null;
    }
};

export const exhibitorRegistrationApi = {
    submit: async (payload: any) => {
        const response = await fetch(`${API_URL}/exhibitor-registration`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return await response.json();
    }
};

export const publicApi = {
    getEmployees: async (): Promise<any[]> => {
        const response = await fetch(`${API_URL}/public/employees`);
        const data = await response.json();
        return data.success ? data.data : [];
    },
    getStaff: async (): Promise<any[]> => {
        const response = await fetch(`${API_URL}/public/staff`);
        const data = await response.json();
        return data.success ? data.data : [];
    }
};

export const travelAccommodationApi = {
    get: async () => {
        const response = await fetch(`${API_URL}/travel-accommodation`);
        const data = await response.json();
        return data.success ? data.data : null;
    }
};


export const visitorAuthApi = {
    sendOtp: async (credentials: string) => {
        const response = await fetch(`${API_URL}/visitor-auth/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credentials })
        });
        return await response.json();
    },
    verifyOtp: async (credentials: string, otp: string) => {
        const response = await fetch(`${API_URL}/visitor-auth/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credentials, otp })
        });
        return await response.json();
    }
};

export const visitorApi = {
    submitCorporate: async (payload: any) => {
        const response = await fetch(`${API_URL}/corporate-visitors`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return await response.json();
    },
    submitGeneral: async (payload: any) => {
        const response = await fetch(`${API_URL}/general-visitors`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return await response.json();
    }
};

export const policyApi = {
    getByPage: async (page: string) => {
        const response = await fetch(`${API_URL}/policies/${page}`);
        const data = await response.json();
        return data.success ? data.data : null;
    }
};

export const crmApi = {
    getCountries: async () => {
        const response = await fetch(`${API_URL}/crm-countries`);
        const data = await response.json();
        return Array.isArray(data) ? data : (data.data || []);
    },
    getStates: async (countryCode?: number) => {
        const url = countryCode ? `${API_URL}/crm-states?countryCode=${countryCode}` : `${API_URL}/crm-states`;
        const response = await fetch(url);
        const data = await response.json();
        return Array.isArray(data) ? data : (data.data || []);
    },
    getCities: async (stateCode?: number) => {
        const url = stateCode ? `${API_URL}/crm-cities?stateCode=${stateCode}` : `${API_URL}/crm-cities`;
        const response = await fetch(url);
        const data = await response.json();
        return Array.isArray(data) ? data : (data.data || []);
    }
};

export const adminApi = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/admin/all`);
        const data = await response.json();
        return data.success ? data.data : [];
    }
};
