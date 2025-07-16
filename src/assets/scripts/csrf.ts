export const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
};


// RequestInit is the set of options that cna be used to configure a fetch request
export const fetchWithCSRF = async (url: string, options: RequestInit = {}) => {
  const csrfToken = getCookie("csrf_access_token");

  const headers = {
    ...(options.headers || {}),
    "X-CSRF-TOKEN": csrfToken || "",
  };

  return fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });
};