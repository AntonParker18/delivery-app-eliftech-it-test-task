import storage from 'reduxjs-toolkit-persist/lib/storage';

const shopsConfig = {
  key: 'shops',
  storage,
  whitelist: ['products'],
};

export default shopsConfig;
