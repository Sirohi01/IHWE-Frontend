import { useAuthStore } from "@/stores/authStore";

export const logout = () => {
    useAuthStore.getState().logout();
};

export const isAuthenticated = () => {
    const { isAuthenticated, isOtpVerified } = useAuthStore.getState();
    return isAuthenticated && isOtpVerified;
};
