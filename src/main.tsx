import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { getApiBaseUrl } from './apiConfig.ts';

// Global API Fetch proxy for Netlify & other custom hosting environments
const originalFetch = window.fetch;
window.fetch = async function (input, init) {
  let finalInput = input;
  let isApiCall = false;

  if (typeof input === 'string' && input.startsWith('/api/')) {
    isApiCall = true;
    const backendBaseUrl = getApiBaseUrl();
    if (backendBaseUrl) {
      const base = backendBaseUrl.endsWith('/') ? backendBaseUrl.slice(0, -1) : backendBaseUrl;
      finalInput = base + input;
    }
  }

  try {
    const response = await originalFetch(finalInput, init);

    if (isApiCall) {
      const contentType = response.headers.get("content-type") || "";
      const isHtml = contentType.includes("text/html");

      if (isHtml) {
        // Return a proxy to intercept response.json() calls safely
        return new Proxy(response, {
          get(target, prop, receiver) {
            if (prop === 'json') {
              return async function() {
                throw new Error("Backend API is unreachable. Please check API URL configuration.");
              };
            }
            const value = Reflect.get(target, prop, receiver);
            return typeof value === 'function' ? value.bind(target) : value;
          }
        });
      }
    }
    return response;
  } catch (error: any) {
    if (isApiCall) {
      // Catch network connection errors (Failed to fetch, CORS errors, DNS resolution, connection timeout)
      throw new Error("Backend API is unreachable. Please check API URL configuration.");
    }
    throw error;
  }
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
