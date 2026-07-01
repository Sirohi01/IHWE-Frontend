import { api } from '../lib/api';

export const logActivity = async (
  module: string,
  action: string,
  details: string = '',
  status: 'Success' | 'Pending' | 'Failed' | 'Info' = 'Info'
) => {
  try {
    const token = localStorage.getItem('exhibitorToken');
    if (!token) return;

    let exhibitorInfo: any = {};
    try {
      let payloadBase64 = token.split('.')[1];
      payloadBase64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
      // Add padding if necessary
      while (payloadBase64.length % 4) {
        payloadBase64 += '=';
      }
      const decodedJson = decodeURIComponent(
        atob(payloadBase64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      exhibitorInfo = JSON.parse(decodedJson);
    } catch (e) {
      console.error('Failed to parse token:', e);
      return;
    }

    if (!exhibitorInfo.id) {
      return; // Cannot log if not logged in properly
    }

    await api.post('/api/exhibitor-activity-logs', {
      companyName: exhibitorInfo.exhibitorName || exhibitorInfo.companyName || exhibitorInfo.name || 'Unknown Exhibitor',
      exhibitorId: exhibitorInfo.id,
      module,
      action,
      details,
      status
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};
