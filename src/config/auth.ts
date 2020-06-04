export default {
  jwt: {
    secret: process.env.APP_SECRET || 'none',
    expiresIn: process.env.EXPIRATION_TIME || '1d',
  },
};
