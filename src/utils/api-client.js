const { NODE_ENV } = process.env;

async function request(resource, config) {
  const apiOrigin =
    NODE_ENV === 'development'
      ? 'http://localhost:8888/.netlify/functions/'
      : 'https://voting-system-tas.netlify.app/.netlify/functions/';

  const response = await fetch(`${apiOrigin}${resource}`, {
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
    if (response.status === 500)
      return Promise.reject(new Error('Internal Server Error'));
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
