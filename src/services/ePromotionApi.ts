import { API_URL } from '@/lib/api';

export const ePromotionApi = {
    getPackages: async () => {
        const res = await fetch(`${API_URL}/e-promotion-packages/packages`);
        return res.json();
    }
};
