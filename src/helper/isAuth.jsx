import React from 'react';
import { User, isAuthenticated } from '../redux/ApiConfig';
import localStorageHelper from './localStorageHelper';

export default function isAuth(Component) {
  return function IsAuth(props) {
    const auth = isAuthenticated;
    const role = User?.role === 3 ? true : false;

    React.useEffect(() => {
      if (!auth || !role) {
        localStorageHelper({ flag: 'remove', key: 'user_data' }); // remove localstorage current user data
        alert('Unauthenticated');
        window.Location.href = '/login';
      }
      return null;
    }, [auth, role]);

    if (!auth || !role) {
      return null;
    }

    return <Component {...props} />;
  };
}
