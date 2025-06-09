import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { store } from './store';

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};
