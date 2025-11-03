import { ApiResponse } from "@/lib/types";

// API base URL - should be configured via environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Base fetch wrapper with error handling and auth
 */
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Add auth token if available
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    // Handle non-JSON responses
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return { data: null as T };
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

/**
 * GET request
 */
export async function get<T>(endpoint: string): Promise<ApiResponse<T>> {
  return fetchAPI<T>(endpoint, { method: "GET" });
}

/**
 * POST request
 */
export async function post<T>(
  endpoint: string,
  data?: unknown
): Promise<ApiResponse<T>> {
  return fetchAPI<T>(endpoint, {
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT request
 */
export async function put<T>(
  endpoint: string,
  data?: unknown
): Promise<ApiResponse<T>> {
  return fetchAPI<T>(endpoint, {
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PATCH request
 */
export async function patch<T>(
  endpoint: string,
  data?: unknown
): Promise<ApiResponse<T>> {
  return fetchAPI<T>(endpoint, {
    method: "PATCH",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE request
 */
export async function del<T>(endpoint: string): Promise<ApiResponse<T>> {
  return fetchAPI<T>(endpoint, { method: "DELETE" });
}

/**
 * Upload file(s)
 */
export async function uploadFile<T>(
  endpoint: string,
  file: File,
  additionalData?: Record<string, string>
): Promise<ApiResponse<T>> {
  const formData = new FormData();
  formData.append("file", file);

  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }

  const url = `${API_BASE_URL}${endpoint}`;
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const headers: HeadersInit = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("Upload Error:", error);
    throw error;
  }
}

/**
 * Download file
 */
export async function downloadFile(endpoint: string, filename: string): Promise<void> {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const headers: HeadersInit = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("Download Error:", error);
    throw error;
  }
}
