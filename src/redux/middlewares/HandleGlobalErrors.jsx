import { isRejectedWithValue } from '@reduxjs/toolkit';
import { ClearUser } from '../../helper/ClearUser';
import localStorageHelper from '../../helper/localStorageHelper';
import Toast from 'src/components/alerts/Toasts';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    console.log(action);

    const error = action.payload; // Assuming the error object is stored in the payload

    // @ts-ignore
    if (error?.status === 401) {
      localStorageHelper({ flag: 'remove', key: 'user_data' }); // delete user localstorage data
      // Perform additional unauthorized error handling here, such as redirecting to the login page
      setTimeout(() => {
        ClearUser();
        // window.location.href = '/login';
      }, 3000);
    }

    // @ts-ignore
    if (error?.status === 'FETCH_ERROR') {
      // alert("Internet Issue ... couldn't fetch results due to internet weakness");
      Toast({ openModal: true, message: error?.errors, type: 'error' });
    }

    console.log('global-error: ', error);
  }

  return next(action);
};
