let baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://portfoliobackend-ubao.onrender.com';
if (baseUrl && !baseUrl.startsWith('http')) {
  baseUrl = `https://${baseUrl}`;
}
// Remove trailing slash if present
baseUrl = baseUrl.replace(/\/$/, '');

export const BASE_URL = baseUrl.endsWith('/api') ? baseUrl.slice(0, -4) : baseUrl;
export const API_BASE_URL = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;

export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin_token');
  }
  return null;
};

export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_token', token);
  }
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
  }
};

export const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    logout();
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'API Request Failed');
  }

  return response.json();
};
