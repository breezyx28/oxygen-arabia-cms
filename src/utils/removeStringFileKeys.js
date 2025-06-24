export function removeStringFileKeys(keys, obj) {
  const isArrayOfStrings = (value) =>
    Array.isArray(value) && value.every((v) => typeof v === 'string');

  const isArrayOfFiles = (value) => Array.isArray(value) && value.every((v) => v instanceof File);

  const newObj = { ...obj };

  keys.forEach((key) => {
    if (key.includes('*')) {
      // Handle wildcard patterns like 'section_6_slider.*.icon'
      const [parentKey, childKey] = key.split('.*.');
      if (newObj[parentKey] && Array.isArray(newObj[parentKey])) {
        newObj[parentKey].forEach((item, index) => {
          if (item && typeof item === 'object' && typeof item[childKey] === 'string') {
            delete newObj[parentKey][index][childKey];
          }
        });
      }
    } else {
      // Handle regular keys
      if (typeof newObj[key] === 'string' || isArrayOfStrings(newObj[key])) {
        delete newObj[key];
      }
    }
  });

  return newObj;
}
