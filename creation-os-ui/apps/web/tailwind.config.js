const shared = require('../../tailwind.config.js')

module.exports = {
  ...shared,
  content: [
    // local app files
    './app/**/*.{ts,tsx}',
    // local shared sources
    './src/**/*.{ts,tsx}',
  ],
}