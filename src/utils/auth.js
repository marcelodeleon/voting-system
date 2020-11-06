import { getSessionToken } from './session';

// eslint-disable-next-line import/prefer-default-export
export const isAuthenticated = () => !!getSessionToken();
