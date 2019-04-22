export const resolveBaseUrl = () => {
  const localUrl = 'http://127.0.0.1:4000/api';
  const env = process.env.NODE_ENV;
  const baseUrl = ['test', 'development'].includes(env)
    ? localUrl
    : process.env.REACT_APP_API_URL;

  return baseUrl;
};
