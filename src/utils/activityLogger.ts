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
      const payloadBase64 = token.split('.')[1];
      const decodedJson = atob(payloadBase64);
      exhibitorInfo = JSON.parse(decodedJson);
    } catch (e) {
      console.error('Failed to parse token:', e);
      return;
    }

    if (!exhibitorInfo.id) {
      return; // Cannot log if not logged in properly
    }

    await api.post('/api/exhibitor-activity-logs', {
      companyName: exhibitorInfo.exhibitorName,
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
