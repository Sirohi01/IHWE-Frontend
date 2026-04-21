import { API_URL } from '@/lib/api';

const getHeaders = () => {
    const token = localStorage.getItem('exhibitorToken');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const psmClaimApi = {
    getAllReports: async () => {
        const res = await fetch(`${API_URL}/psm-claim/reports`, { headers: getHeaders() });
        return res.json();
    },
    getReportById: async (type: string, id: string) => {
        const res = await fetch(`${API_URL}/psm-claim/reports/${type}/${id}`, { headers: getHeaders() });
        return res.json();
    },
    saveReport: async (type: string, data: any) => {
        const res = await fetch(`${API_URL}/psm-claim/reports/${type}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    },
    deleteReport: async (type: string, id: string) => {
        const res = await fetch(`${API_URL}/psm-claim/reports/${type}/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        return res.json();
    }
};
