const { REACT_APP_API_ORIGIN } = process.env;

async function request(resource, config) {
  const response = await fetch(`${REACT_APP_API_ORIGIN}${resource}`, {
    ...config,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config.body),
  });

  try {
    const body = await response.clone().json();
    if (response.ok || (response.status >= 200 && response.status < 400))
      return body;
    return Promise.reject(body.error);
  } catch (error) {
    return Promise.reject(error);
  }
}

const apiClient = {
  get: (url, config) => request(url, { ...config, method: 'GET' }),
  post: (url, config) => request(url, { ...config, method: 'POST' }),
  put: (url, config) => request(url, { ...config, method: 'PUT' }),
  patch: (url, config) => request(url, { ...config, method: 'PATCH' }),
  delete: (url, config) => request(url, { ...config, method: 'DELETE' }),
};

export default apiClient;
