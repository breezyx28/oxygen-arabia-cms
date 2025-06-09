import localStorageHelper from '../helper/localStorageHelper';

// prepare header for authentication
const local = () => localStorageHelper({ key: 'user_data', flag: 'get' }) ?? null;

export const token = () => local()?.token ?? null;

export const prepareHeaders = (headers) => {
  headers.set('accept', 'application/json');

  if (token()) {
    headers.set('authorization', `Bearer ${token()}`);
  }

  return headers;
};

// get authed user id from localStorage
export const userID = local()?.data?.id ?? null;

export const User = local()?.data ?? null; // get user

export const Photo = local()?.data?.photo
  ? `${process.env.NEXT_PUBLIC_API_IMAGES}${local()?.data?.photo}`
  : null; // get user

export const PhotoPath = (path) => process.env.NEXT_PUBLIC_API_IMAGES + path;

export const isAuthenticated = token() ? true : false; // check if user authenticated
