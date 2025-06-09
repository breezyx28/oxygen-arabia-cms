import { isAuthenticated } from '../redux/ApiConfig';

export const IsAuthenticated = () => {
  if (isAuthenticated) {
    return isAuthenticated;
  }
  window.location.href = '/login';
  return null; // or any other value you want to return
};
