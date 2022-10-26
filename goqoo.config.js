// @ts-check

/**
 * @type {import('./goqoo.config.types').Config}
 */
const config = {
  bundlerType: 'default',
  dtsGen: {
    env: 'development',
    // skip: ['customer'],
  },
  environments: [
    {
      env: 'development',
      host: 'tailsgarden.cybozu.com',
      appId: {
        app: 4771,
      },
    },
  ],
}
module.exports = config
