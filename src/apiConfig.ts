/**
 * Centralized API Base URL Configuration for Office Sohayok
 */
const env = (import.meta as any).env;
export const API_BASE_URL = env?.VITE_API_BASE_URL || "";

export function getApiBaseUrl(): string {
  if (API_BASE_URL && API_BASE_URL.trim() !== "") {
    return API_BASE_URL.endsWith("/") ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  }
  return "";
}
