import storage from 'reduxjs-toolkit-persist/lib/storage';

const shoppingCartConfig = {
  key: 'shoppingCart',
  storage,
  whitelist: ['basket'],
};

export default shoppingCartConfig;
