import localStorageHelper from './localStorageHelper';

export const ClearUser = () => {
  try {
    localStorageHelper({ key: 'user_data', flag: 'remove' });
  } catch (error) {
    console.log('could not perforem deleting user data');
  }
};
