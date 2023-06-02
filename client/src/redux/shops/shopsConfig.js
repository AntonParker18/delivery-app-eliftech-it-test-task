import storage from 'reduxjs-toolkit-persist/lib/storage';

const shopsConfig = {
  key: 'shops',
  storage,
  whitelist: ['products', 'restaurants'],
};

export default shopsConfig;
