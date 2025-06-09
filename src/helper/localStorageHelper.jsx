export default function localStorageHelper({ key, data, flag }) {
  const local = typeof window !== 'undefined' ? window.localStorage : null;

  if (flag === '' || flag === null || flag === 'set') {
    local?.setItem(key, JSON.stringify(data));
    return true;
  }

  if (flag === 'get') {
    try {
      const result = JSON.parse(`${local.getItem(key)}`);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  if (flag === 'remove') {
    try {
      local?.removeItem(key);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return null;
}
