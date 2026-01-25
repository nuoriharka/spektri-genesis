const rootConfig = require('../../next.config.js')

/** @type {import('next').NextConfig} */
module.exports = {
  ...rootConfig,
  experimental: {
    ...(rootConfig.experimental || {}),
    externalDir: true,
  },
}
